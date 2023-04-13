import { useEffect, useState } from "react";
import Field from "./Field";
import { DeSerialType } from "./type";
import { setPrefix, prefixClass } from "./classname";
import "./index.css";

import type { DeSerialField } from "./type";

export default DeSerial;

interface DeSerialProps {
  defaultValue?: DeSerialField | string;
  value?: DeSerialField;
  classNamePrefix?: string;
  onChange?: (value: DeSerialField) => void;
}

function DeSerial({
  defaultValue,
  value,
  classNamePrefix,
  onChange,
}: DeSerialProps) {
  // set global className prefix
  useEffect(() => {
    classNamePrefix && setPrefix(classNamePrefix);
  }, []);

  const [valid, setValid] = useState(true);

  const [v, setV] = useState<DeSerialField>(() => {
    const firstV = value || defaultValue;
    if (typeof firstV == "undefined") {
      return {
        kind: "field_target",
        key: "root",
        type: DeSerialType.String,
        target: "",
      } as DeSerialField;
    } else if (typeof firstV == "string") {
      return {
        kind: "field_target",
        key: "root",
        type: DeSerialType.String,
        target: "",
      } as DeSerialField;
    } else return firstV;
  });

  useEffect(() => {
    if (typeof value != "undefined") setV(value);
  }, [value]);

  const handler = (v: DeSerialField) => {
    setV(v);
    onChange?.(v);
  };

  console.log(v);

  return (
    <div className={prefixClass(["panel", !valid && "invalid"])}>
      <Field value={v} onChange={handler} />
    </div>
  );
}
