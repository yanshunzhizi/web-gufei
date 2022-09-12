import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apis from "@/apis";
import {
  FormItemName,
  FormItemType,
  DataType,
  OperateType,
} from "@/config/enum";
import type { FormItem } from "@/types";
import dayjs from "dayjs";

export const useGlobleStore = defineStore("global", () => {
  const company = ref<Record<string, any>>();
  const openid = ref<string>("11111111111");
  const form = reactive({
    items: {
      [FormItemName.Sid]: {
        name: "sid",
        type: FormItemType.Text,
        label: "sid",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
        hide: true,
      } as FormItem,
      [FormItemName.Uscc]: {
        name: "uscc",
        type: FormItemType.Text,
        label: "社会信用代码",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.Etag]: {
        name: "etag",
        type: FormItemType.Text,
        label: "电子标签编码",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.GenerationCode]: {
        name: "generationCode",
        type: FormItemType.Text,
        label: "产生批次编码",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.ProductionCode]: {
        name: "productionCode",
        type: FormItemType.Picker,
        label: "产生设施",
        default: undefined,
        rules: [],
        items: [],
      } as FormItem,
      [FormItemName.GenerationTime]: {
        name: "generationTime",
        type: FormItemType.Time,
        label: "产生时间",
        default: () => {
          return dayjs().format("YYYY-MM-DD HH:mm:ss");
        },
        rules: [],
      } as FormItem,
      [FormItemName.Quantity]: {
        name: "quantity",
        type: FormItemType.Float,
        label: "产生量",
        default: 0,
        rules: [],
      } as FormItem,
      [FormItemName.Unit]: {
        name: "unit",
        type: FormItemType.Picker,
        label: "计量单位",
        default: undefined,
        rules: [],
        items: [],
      } as FormItem,
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
      } as FormItem,
      [FormItemName.WasteProperty]: {
        name: "wasteProperty",
        type: FormItemType.Checkbox,
        label: "物理性状",
        default: [],
        rules: [],
        items: [
          { label: "固态", value: "S" },
          { label: "半固态", value: "SS" },
          { label: "液态", value: "L" },
          { label: "气态", value: "G" },
        ],
      } as FormItem,
      [FormItemName.WasteCode]: {
        name: "wasteCode",
        type: FormItemType.Picker,
        label: "废物代码",
        default: undefined,
        rules: [],
        items: [],
      } as FormItem,
      [FormItemName.WasteName]: {
        name: "wasteName",
        type: FormItemType.Picker,
        label: "废物名称",
        default: undefined,
        rules: [],
        items: [],
      } as FormItem,
      [FormItemName.WasteCategoryCode]: {
        name: "wasteCategoryCode",
        type: FormItemType.Picker,
        label: "废物类别",
        default: undefined,
        items: [],
        rules: [],
      } as FormItem,
      [FormItemName.ContainerType]: {
        name: "containerType",
        type: FormItemType.Picker,
        label: "废物类别",
        default: undefined,
        items: [
          { label: "槽罐", value: "0" },
          { label: "装袋", value: "1" },
          { label: "装桶", value: "2" },
          { label: "其他", value: "9" },
        ],
        rules: [],
      } as FormItem,
      [FormItemName.ContainerMaterial]: {
        name: "containerMaterial",
        type: FormItemType.Picker,
        label: "包装材质",
        default: "0",
        items: [
          { label: "金属", value: "0" },
          { label: "塑料", value: "1" },
          { label: "复合材料", value: "2" },
          { label: "其他材质", value: "3" },
        ],
        rules: [],
      } as FormItem,
      [FormItemName.ContainerStandard]: {
        name: "containerStandard",
        type: FormItemType.Picker,
        label: "包装规格",
        default: "1",
        items: [
          { label: "<25", value: "1" },
          { label: "<50L", value: "2" },
          { label: "<200L", value: "3" },
          { label: "<1000L", value: "4" },
          { label: "其他", value: "9" },
        ],
        rules: [],
      } as FormItem,
      [FormItemName.ContainerCount]: {
        name: "containerCount",
        type: FormItemType.Int,
        label: "包装数量",
        default: 0,
        rules: [],
      } as FormItem,
    } as Record<FormItemName, FormItem>,
  });
  const opreateTZ = async (
    operateType: OperateType,
    data: Record<string, any>
  ) => {
    const result = await apis.operateTZ({
      ...data,
      op: operateType + "",
    });
    return result;
  };
  const getCompanyInfo = async () => {
    const result = await apis.getCompanyBasicInfo({ openid: openid.value });
    if (result && result.success) {
      company.value = result.data;
      form.items[FormItemName.Uscc].default = result.data?.uscc;
      form.items[FormItemName.ProductionCode].items = (
        result.data?.produceFacilities as any[]
      ).map((data) => ({ label: data.title, value: data.code }));
    }
    return result;
  };

  return {
    form,
    company,
    opreateTZ,
    getCompanyInfo,
  };
});
