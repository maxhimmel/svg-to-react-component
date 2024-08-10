export class Prop {
  constructor(
    public name: string,
    public type: string,
    public optional: boolean
  ) {}
}

export const defaultProps: Prop[] = [
  {
    name: "className",
    type: "string",
    optional: true,
  },
];
