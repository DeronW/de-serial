import Extract from "./Extract";
import Target from "./Target";
import Dispose from "./Dispose";
import { getDeSerialTypeName } from "./actions";
import { prefixClass } from "./classname";
import { getDefaultAction } from "./actions";

import type {
  DeSerialExtract,
  DeSerialField,
  DeSerialFieldExtract,
  DeSerialFieldTarget,
} from "./type";

export default Field;

interface FieldProps {
  value: DeSerialField;
  onChange: (value: DeSerialField) => void;
}

function Field({ value, onChange }: FieldProps) {
  const targetHandler = (v: string) => {
    if (value.kind == "field_target") {
      value.target = v;
      onChange({ ...value });
    }
  };

  const keyHandler = (v: string) => onChange({ ...value, key: v });

  const extractHandler = (v: DeSerialExtract) => {
    if (value.kind == "field_extract") {
      value.extract = v;
      onChange({ ...value });
    }
  };

  const disposeHandler = (v: string) => {
    if (v == "target") {
      let target = (value as DeSerialFieldTarget).target || "";
      onChange({ ...value, kind: "field_target", target });
    }
    if (v == "extract") {
      const [action, returnType] = getDefaultAction(value.type);
      let extract = (value as DeSerialFieldExtract).extract || {
        kind: "extract_target",
        action,
        return: returnType,
        target: "",
      };
      onChange({ ...value, kind: "field_extract", extract });
    }
  };

  return (
    <div className={prefixClass("field")}>
      <div className={prefixClass("field-key")}>
        <input
          className={prefixClass("field-key-input")}
          value={value.key}
          onChange={(e) => keyHandler(e.target.value)}
        />
        <span className={prefixClass("field-type")}>
          ({getDeSerialTypeName(value.type)})
        </span>
      </div>
      <Dispose
        value={value.kind == "field_target" ? "target" : "extract"}
        onChange={disposeHandler}
      />
      {value.kind == "field_target" ? (
        <Target value={value.target} onChange={targetHandler} />
      ) : (
        <Extract
          type={value.type}
          value={value.extract}
          onChange={extractHandler}
        />
      )}
    </div>
  );
}
