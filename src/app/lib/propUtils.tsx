export class Prop {
  constructor(
    public name: string,
    public type: string,
    public optional: boolean
  ) {}

  static convertToTypeScript(props: Prop[]) {
    const propArgs = props
      .map((prop) => {
        return `${prop.name}`;
      })
      .join(", ");

    const tsProps = props
      .map((prop) => {
        return `${prop.name}${prop.optional ? "?" : ""}: ${prop.type}`;
      })
      .join("; ");

    const attribProps = props
      .map((prop) => {
        return `${prop.name}={${prop.name}}`;
      })
      .join(" ");

    return [propArgs, tsProps, attribProps];
  }
}

export const defaultProps: Prop[] = [
  {
    name: "className",
    type: "string",
    optional: true,
  },
];
