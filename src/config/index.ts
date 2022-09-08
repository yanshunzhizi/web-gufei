import { FormItemType, FormItemName } from "./enum";
export default {
  presets: {
    form: {
      items: {
        [FormItemName.Uscc]: {
          name: "uscc",
          type: FormItemType.Echo,
          label: "社会信用代码",
          default: "",
          rules: [],
        },
        [FormItemName.Etag]: {
          name: "etag",
          type: FormItemType.Echo,
          label: "电子标签编码",
          default: "",
          rules: [],
        },
        [FormItemName.GenerationCode]: {
          name: "generationCode",
          type: FormItemType.Echo,
          label: "产生批次编码",
          default: "",
          rules: [],
        },
        [FormItemName.ProductionCode]: {
          name: "productionCode",
          type: FormItemType.Picker,
          label: "产生设施",
          default: undefined,
          rules: [],
          items: [
            { label: "2021", value: "2021" },
            { label: "2016", value: "2016" },
          ],
        },
        [FormItemName.GenerationTime]: {
          name: "generationTime",
          type: FormItemType.Time,
          label: "产生时间",
          default: () => {
            return new Date();
          },
          rules: [],
        },
        [FormItemName.Quantity]: {
          name: "quantity",
          type: FormItemType.Float,
          label: "产生量",
          default: 0,
          rules: [],
        },
        [FormItemName.Unit]: {
          name: "unit",
          type: FormItemType.Picker,
          label: "计量单位",
          default: undefined,
          rules: [],
          items: [
            { label: "2021", value: "2021" },
            { label: "2016", value: "2016" },
          ],
        },
        [FormItemName.CategoryVersion]: {
          name: "categoryVersion",
          type: FormItemType.Picker,
          label: "废物名录年份",
          default: "2021",
          rules: [],
          items: [
            { label: "2021", value: "2021" },
            { label: "2016", value: "2016" },
          ],
        },
        [FormItemName.WasteProperty]: {
          name: "wasteProperty",
          type: FormItemType.Checkbox,
          label: "物理性状",
          default: [],
          rules: [],
          items: [
            { label: "S", value: "固态" },
            { label: "SS", value: "半固态" },
            { label: "L", value: "液态" },
            { label: "G", value: "气态" },
          ],
        },
        [FormItemName.WasteCode]: {
          name: "wasteCode",
          type: FormItemType.Picker,
          label: "废物代码",
          default: undefined,
          rules: [],
          items: [
            { label: "S", value: "固态" },
            { label: "SS", value: "半固态" },
            { label: "L", value: "液态" },
            { label: "G", value: "气态" },
          ],
        },
        [FormItemName.WasteName]: {
          type: FormItemType.Picker,
          label: "废物名称",
          default: undefined,
          rules: [],
          items: [
            { label: "S", value: "固态" },
            { label: "SS", value: "半固态" },
            { label: "L", value: "液态" },
            { label: "G", value: "气态" },
          ],
        },
        [FormItemName.WasteCategoryCode]: {
          type: FormItemType.Picker,
          label: "废物类别",
          default: undefined,
          items: [
            { label: "S", value: "固态" },
            { label: "SS", value: "半固态" },
            { label: "L", value: "液态" },
            { label: "G", value: "气态" },
          ],
          rules: [],
        },
        [FormItemName.ContainerType]: {
          type: FormItemType.Picker,
          label: "废物类别",
          default: undefined,
          items: [
            { label: "S", value: "固态" },
            { label: "SS", value: "半固态" },
            { label: "L", value: "液态" },
            { label: "G", value: "气态" },
          ],
          rules: [],
        },
        [FormItemName.ContainerMaterial]: {
          type: FormItemType.Picker,
          label: "包装材质",
          default: undefined,
          items: [
            { label: "金属", value: "0" },
            { label: "塑料", value: "1" },
            { label: "复合材料", value: "2" },
            { label: "其他材质", value: "3" },
          ],
          rules: [],
        },
        [FormItemName.ContainerStandard]: {
          type: FormItemType.Picker,
          label: "包装规格",
          default: undefined,
          items: [
            { label: "<25", value: "1" },
            { label: "<50L", value: "2" },
            { label: "<200L", value: "3" },
            { label: "<1000L", value: "4" },
            { label: "其他", value: "9" },
          ],
          rules: [],
        },
        [FormItemName.ContainerCount]: {
          type: FormItemType.Int,
          label: "包装数量",
          default: 0,
          rules: [],
        },
      },
    },
  },
};
