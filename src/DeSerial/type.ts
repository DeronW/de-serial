export type {
  DeSerialExtract,
  DeSerialExtractTarget,
  DeSerialExtractFields,
  DeSerialField,
  DeSerialFieldTarget,
  DeSerialFieldExtract,
};
export { DeSerialType };

enum DeSerialType {
  // Null = 0,
  String = 1,
  Number,
  Bool,
  Json,
}

/**
 * This is DeSerial value, a structed type, mark all action around
 * with source string.
 */
type DeSerialExtract = DeSerialExtractTarget | DeSerialExtractFields;

type DeSerialExtractTarget = {
  kind: "extract_target";
  action: string;
  params?: Array<string>;
  return: DeSerialType;
  multiple?: boolean
  target: string;
};

type DeSerialExtractFields = {
  kind: "extract_fields";
  action: string;
  params?: Array<string>;
  return: DeSerialType;
  multiple?: boolean
  fields: Array<DeSerialField>;
};

type DeSerialField = DeSerialFieldTarget | DeSerialFieldExtract;

type DeSerialFieldTarget = {
  kind: "field_target";
  key: string;
  type: DeSerialType;
  target: string;
};

type DeSerialFieldExtract = {
  kind: "field_extract";
  key: string;
  type: DeSerialType;
  extract: DeSerialExtract;
};
