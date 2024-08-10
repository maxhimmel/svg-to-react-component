import { Prop } from "@/app/lib/propUtils";

export class FileData {
  constructor(
    public filename: string,
    public prettyFilename: string,
    public content: string
  ) {}
}

export function wrapInReactComponent({
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
