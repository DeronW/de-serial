import { prefixClass } from "./classname";

import type { DeSerialActionParam } from "./actions";

export default ExtractParams;

interface ExtractParamsProps {
  value?: Array<string>;
  params?: Array<DeSerialActionParam>;
  onChange: (v: Array<string>) => void;
}

function ExtractParams({ value = [], params, onChange }: ExtractParamsProps) {
  if (!params) return null;
  const handler = (idx: number, v: string) => {
    const new_value = [...value];
    new_value[idx] = v;
    onChange(new_value);
  };
  return (
    <div className={prefixClass("extract-param-list")}>
      {params.map((i, index) => {
        return (
          <div key={index} className={prefixClass("extract-param")}>
            <div className={prefixClass("extract-param-required")}>
              {i.required && "*"}
            </div>
            <input
              value={value[index] || ""}
              onChange={(e) => handler(index, e.target.value)}
            />
            {i.note && <i title={i.note}>?</i>}
          </div>
        );
      })}
    </div>
  );
}
