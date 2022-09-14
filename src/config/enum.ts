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
  Etag = "eTag",
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
  DataType1 = "dataType1",
  DataType2 = "dataType2",
  DataType3 = "dataType3",
  DataType4 = "dataType4",
  Principal = "principal",
  InventoryCode = "inventoryCode",
  InventoryOperateTime = "InventoryOperateTime",
  InQuantity = "inQuantity",
  StoragePrincipal = "storagePrincipal",
  OutTime = "outTime",
  OutCode = "outCode",
  OutQuantity = "outQuantity",
  OutPrincipal = "outPrincipal",
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

export enum WasteType {
  InStore = "1",
  OutStore = "2",
}
