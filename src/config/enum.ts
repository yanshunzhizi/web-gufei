export enum FormItemType {
  Echo,
  Picker,
  Checkbox,
  Text,
  Int,
  Float,
  Time,
  Duration,
}
export enum FormItemName {
  CategoryVersion = "categoryVersion",
  ContainerType = "containerType",
  ContainerMaterial = "containerMaterial",
  ContainerStandard = "containerStandard",
  ContainerCount = "containerCount",
  Etag = "etag",
  GenerationCode = "generationCode",
  GenerationTime = "generationTime",
  ProductionCode = "productionCode",
  Quantity = "quantity",
  Uscc = "uscc",
  Unit = "unit",
  WasteProperty = "wasteProperty",
  WasteCode = "wasteCode",
  WasteName = "wasteName",
  WasteCategoryCode = "wasteCategoryCode",
  Sid = "sid",
}

export enum DataType {
  Generate = 1,
  InStore = 2,
  OutSore = 3,
  Dispose = 4,
}

export enum OperateType {
  Add = 1,
  Edit = 2,
  Delete = 3,
}
