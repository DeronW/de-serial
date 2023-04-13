import { DeSerialType } from "./type";
import {
  getActionAndList,
  getDeSerialTypeName,
  getDefaultAction,
} from "./actions";
import Target from "./Target";
import Dispose from "./Dispose";
import Field from "./Field";
import ExtractParams from "./ExtractParams";
import { prefixClass } from "./classname";

import type {
  DeSerialExtract,
  DeSerialField,
  DeSerialExtractFields,
  DeSerialFieldExtract,
} from "./type";

export default Extract;

interface ExtractProps {
  type: DeSerialType;
  value: DeSerialExtract;
  onChange: (value: DeSerialExtract) => void;
}

function Extract({ type, value, onChange }: ExtractProps) {
  const [actionList, action] = getActionAndList(type, value.action);

  const actionHandler = (action: string) => {
    const [_, act] = getActionAndList(type, action);
    onChange({ ...value, action, return: act.return });
  };

  const paramsHandler = (params: Array<string>) =>
    onChange({ ...value, params });

  const targetHandler = (v: string) => {
    if (value.kind == "extract_target") {
      value.target = v;
      onChange({ ...value });
    }
  };

  const fieldsHandler = (v: Array<DeSerialField>) => {
    onChange({ ...value, fields: v } as DeSerialExtractFields);
  };

  const disposeHandler = (v: string) => {
    if (v == "target") {
      onChange({ ...value, kind: "extract_target", target: "" });
    }
    if (v == "extract") {
      const [_, act] = getActionAndList(type, value.action);
      const [action, returnType, returnMultiple] = getDefaultAction(act.return);
      // 返回值是多个，下一步解析是 多 fields 的赋值
      if (act.multiple) {
        onChange({
          ...value,
          kind: "extract_fields",
          fields: [
            {
              kind: "field_target",
              key: "new",
              type: act.return,
              target: "",
            },
          ],
        });
      }
      // 返回值是单个，下一步是 extrat
      else if (returnMultiple) {
        onChange({
          ...value,
          kind: "extract_fields",
          fields: [
            {
              kind: "field_extract",
              key: "new",
              type: act.return,
              extract: {
                kind: "extract_fields",
                action,
                return: returnType,
                multiple: returnMultiple,
                fields: [],
              },
            },
          ],
        });
      } else {
        onChange({
          ...value,
          kind: "extract_fields",
          fields: [
            {
              kind: "field_extract",
              key: "new",
              type: act.return,
              extract: {
                kind: "extract_target",
                action,
                return: returnType,
                multiple: returnMultiple,
                target: "",
              },
            },
          ],
        });
      }
    }
  };

  return (
    <>
      <div className={prefixClass("extract")}>
        <select
          value={value.action}
          onChange={(e) => actionHandler(e.target.value)}
          className={prefixClass("extract-action")}
        >
          {actionList.map((i) => (
            <option key={i.action} value={i.action}>
              {i.label}
            </option>
          ))}
        </select>
        <ExtractParams
          value={value.params}
          params={action.params}
          onChange={paramsHandler}
        />
      </div>
      <span className={prefixClass("field-type")}>
        {getDeSerialTypeName(value.return)}
      </span>
      <Dispose
        value={value.kind == "extract_target" ? "target" : "extract"}
        onChange={disposeHandler}
      />

      {value.kind == "extract_target" ? (
        <Target value={value.target} onChange={targetHandler} />
      ) : (
        <ExtractFields
          value={value.fields}
          multiple={!!action.multiple}
          onChange={fieldsHandler}
        />
      )}
    </>
  );
}

function ExtractFields({
  value,
  multiple,
  onChange,
}: {
  value: Array<DeSerialField>;
  multiple: boolean;
  onChange: (v: Array<DeSerialField>) => void;
}) {
  if (multiple) return <ExtractMultiFields value={value} onChange={onChange} />;
  if (value[0]?.kind == "field_extract") {
    const onlyField = value[0];
    const handler = (e: DeSerialExtract) => {
      (value[0] as DeSerialFieldExtract).extract = e;
      onChange([value[0]]);
    };
    return (
      <Extract
        type={onlyField.type}
        value={onlyField.extract}
        onChange={handler}
      />
    );
  }
  return <div>Wrong extract kind in &lt;ExtractFields /&gt;</div>;
}

function ExtractMultiFields({
  value,
  onChange,
}: {
  value: Array<DeSerialField>;
  onChange: (v: Array<DeSerialField>) => void;
}) {
  const handler = (v: DeSerialField, idx: number) => {
    const new_v = [...value];
    new_v[idx] = v;
    onChange(new_v);
  };

  const addHandler = () => {
    onChange([
      ...value,
      {
        kind: "field_target",
        key: "new",
        type: DeSerialType.String,
        target: "",
      },
    ]);
  };

  const removeHandler = (idx: number) => {
    onChange([...value.slice(0, idx), ...value.slice(idx + 1)]);
  };

  return (
    <div className={prefixClass("multi-fields")}>
      {value?.map((i, index) => {
        return (
          <div className={prefixClass("extract-multi-fields")}>
            <Field key={index} value={i} onChange={(v) => handler(v, index)} />
            <button onClick={() => removeHandler(index)}> &times; </button>
          </div>
        );
      })}
      <button onClick={addHandler} className={prefixClass("field-add")}>
        add
      </button>
    </div>
  );
}
