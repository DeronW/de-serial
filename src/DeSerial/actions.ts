import { DeSerialType } from "./type";
export type { DeSerialAction, DeSerialActionParam };

export { getActionAndList, getDefaultAction, getDeSerialTypeName };

type DeSerialAction = {
  label: string;
  action: string;
  params?: Array<DeSerialActionParam>;
  return: DeSerialType;
  multiple?: boolean; // 是否返回多个值
};

type DeSerialActionParam = {
  type: "string" | "boolean" | "number";
  required?: boolean;
  note?: string;
};

const String_Action_List: Array<DeSerialAction> = [
  {
    label: "去头尾空格",
    action: "trim",
    return: DeSerialType.String,
  },
  {
    label: "左截取",
    action: "left_cut",
    return: DeSerialType.String,
    params: [
      {
        type: "number",
        note: "开始截取多少个",
        required: true,
      },
      {
        type: "string",
        note: "关键字匹配，输入正则表达式，支持使用一个括号",
      },
    ],
  },
  {
    label: "右截取",
    action: "right_cut",
    return: DeSerialType.String,
    params: [
      {
        type: "number",
        note: "开始截取多少个",
        required: true,
      },
      {
        type: "string",
        note: "关键字匹配，输入正则表达式，支持使用一个括号",
      },
    ],
  },
  {
    label: "转数字类型",
    action: "to_number",
    return: DeSerialType.Number,
  },
  {
    label: "JSON 解析",
    action: "parse_json",
    return: DeSerialType.Json,
    multiple: true,
  },
  {
    label: "正则解析",
    action: "parse_regexp",
    return: DeSerialType.String,
    multiple: true,
  },
];
const Number_Action_List: Array<DeSerialAction> = [
  {
    label: "转布尔类型",
    action: "to_bool",
    return: DeSerialType.Bool,
  },
  {
    label: "转字符串类型",
    action: "to_string",
    return: DeSerialType.String,
  },
];
const Bool_Action_List: Array<DeSerialAction> = [
  {
    label: "转数字类型",
    action: "to_number",
    return: DeSerialType.Number,
  },
  {
    label: "转字符串类型",
    action: "to_string",
    return: DeSerialType.String,
  },
];

function getActionAndList(
  type: DeSerialType,
  action: string
): [Array<DeSerialAction>, DeSerialAction] {
  if (type == DeSerialType.String) {
    for (const i of String_Action_List) {
      if (i.action == action) return [String_Action_List, i];
    }
    throw Error("string field has no such action: " + action);
  }
  if (type == DeSerialType.Number) {
    for (const i of Number_Action_List) {
      if (i.action == action) return [Number_Action_List, i];
    }
    throw Error("number field has no such action: " + action);
  }
  if (type == DeSerialType.Bool) {
    for (const i of Bool_Action_List) {
      if (i.action == action) return [Bool_Action_List, i];
    }
    throw Error("bool field has no such action: " + action);
  }
  // if (type == DeSerialType.Json) {
  //   return [[], [], DeSerialType.Json];
  // }
  throw Error("getActionInfo Wrong action type: " + type);
}

function getDefaultAction(type: DeSerialType): [string, DeSerialType, boolean] {
  let first;
  if (type == DeSerialType.String) first = String_Action_List[0];
  if (type == DeSerialType.Number) first = Number_Action_List[0];
  if (type == DeSerialType.Bool) first = Bool_Action_List[0];

  if (first) return [first.action, first.return, !!first.multiple];
  else throw Error("getDefaultAction Wrong action type: " + type);
}

function getDeSerialTypeName(type: DeSerialType) {
  if (type == DeSerialType.String) return "string";
  if (type == DeSerialType.Number) return "number";
  if (type == DeSerialType.Bool) return "bool";
  if (type == DeSerialType.Json) return "json";
  return "Wrong_Basic_Type";
}
