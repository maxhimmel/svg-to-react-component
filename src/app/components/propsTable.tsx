import { useApp } from "@/app/hooks/useApp";
import { Prop } from "@/app/lib/propUtils";

export function PropsTable() {
  const { props } = useApp();

  return (
    <div className="w-full overflow-x-auto border-8 border-base-200 rounded-3xl">
      <div className="flex flex-row pb-1 pl-4 bg-base-200">
        <h2 className="text-2xl font-bold">Props</h2>
        <AddPropButton className="btn btn-sm btn-ghost text-lg ml-auto" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>Optional</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {props.map((prop, index) => (
            <PropRow key={index} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddPropButton({
  className,
  newProp,
}: {
  className?: string;
  newProp?: Prop;
}) {
  const { props, setProps } = useApp();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        setProps([...props, newProp || new Prop("", "", false)]);
      }}
    >
      +
    </button>
  );
}

function PropRow({ index }: { index: number }) {
  const { props, setProps } = useApp();
  const prop = props[index];

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <input
          type="text"
          name="propName"
          placeholder="propName"
          className="input input-bordered"
          value={prop.name}
          onChange={(e) => {
            const newProps = [...props];
            newProps[index].name = e.target.value;
            setProps(newProps);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          name="propType"
          placeholder="<type>"
          className="input input-bordered"
          value={prop.type}
          onChange={(e) => {
            const newProps = [...props];
            newProps[index].type = e.target.value;
            setProps(newProps);
          }}
        />
      </td>
      <td>
        <input
          type="checkbox"
          name="propOptional"
          className="checkbox"
          checked={prop.optional}
          onChange={(e) => {
            const newProps = [...props];
            newProps[index].optional = e.target.checked;
            setProps(newProps);
          }}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-error"
          onClick={() => {
            const newProps = [...props];
            newProps.splice(index, 1);
            setProps(newProps);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
}
