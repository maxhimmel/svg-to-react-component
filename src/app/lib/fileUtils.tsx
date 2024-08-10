import { FileData } from "@/app/lib/appUtils";
import { Prop } from "@/app/lib/propUtils";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

export async function importFiles(
  props: Prop[],
  onFilesImported: (files: FileData[]) => void
) {
  const fileHandles = await showOpenFilePicker({
    multiple: true,
    types: [
      {
        description: "SVG Files",
        accept: {
          "image/svg+xml": [".svg"],
        },
      },
    ],
  });

  const newFiles = Array<FileData>(fileHandles.length);
  for (let idx = 0; idx < fileHandles.length; idx++) {
    const fileHandle = fileHandles[idx];
    const file = await fileHandle.getFile();
    const content = await file.text();

    const serialized = processFileContent(content);
    const prettyFilename = getComponentName(file.name);

    newFiles[idx] = new FileData(
      file.name,
      prettyFilename,
      wrapInReactComponent({
        componentName: prettyFilename,
        content: serialized,
        props,
      })
    );
  }

  onFilesImported(newFiles);
}

function processFileContent(content: string) {
  const doc = domParser.parseFromString(content, "image/svg+xml");

  const svg = doc.getElementsByTagName("svg")[0];
  if (!svg) {
    throw new Error("No SVG element found");
  }

  svg.removeAttribute("xmlns:xlink");

  const width = svg.getAttribute("width");
  const height = svg.getAttribute("height");
  if (width && height) {
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  for (let i = 0; i < svg.childNodes.length; i++) {
    const node = svg.childNodes[i];
    if (node.nodeType === 1) {
      const element = node as Element;
      element.removeAttribute("fill");
      element.removeAttribute("stroke");
    }
  }

  let serialized = xmlSerializer.serializeToString(svg);

  return serialized;
}

export function getComponentName(filename: string) {
  return filename
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function wrapInReactComponent({
  componentName,
  content,
  props,
}: {
  componentName: string;
  content: string;
  props?: Prop[];
}) {
  if (!props || props.length === 0) {
    return `export function ${componentName}() {
      return (
        ${content}
      );
    }`;
  }

  const [propArgs, tsProps, attribProps] = Prop.convertToTypeScript(props);

  const propMatches = content.match(/<svg[^>]*>/);
  if (propMatches) {
    const svgTag = propMatches[0];
    const newSvgTag = svgTag.replace(">", ` ${attribProps}>`);
    content = content.replace(svgTag, newSvgTag);
  }

  return `export function ${componentName}({ ${propArgs} }: { ${tsProps} }) {
        return (
            ${content}
        );
    }`;
}
