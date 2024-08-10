import { FileData, wrapInReactComponent } from "@/app/lib/appUtils";
import { Prop } from "@/app/lib/propUtils";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

export async function handleFile(
  setFiles: (files: FileData[]) => void,
  props: Prop[]
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

  setFiles(newFiles);
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
