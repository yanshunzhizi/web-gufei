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
import { Notify } from "vant";
import type { WasteType } from "@/config/enum";

export const useGlobleStore = defineStore("global", () => {
  const company = reactive<Record<string, any>>({});
  const openid = ref<string>("11111111111");
  const form = reactive({
    items: {
      [FormItemName.Sid]: {
        name: FormItemName.Sid,
        type: FormItemType.Text,
        label: "sid",
        default: undefined,
        rules: [],
        config: {
          readonly: true,
        },
        hide: true,
      } as FormItem,
      [FormItemName.Uscc]: {
        name: "USCC",
        type: FormItemType.Text,
        label: "社会信用代码",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.Etag]: {
        name: FormItemName.Etag,
        type: FormItemType.Text,
        label: "电子标签编码",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.GenerationCode]: {
        name: FormItemName.GenerationCode,
        type: FormItemType.Text,
        label: "产生批次编码",
        default: "",
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.ProductionCode]: {
        name: FormItemName.ProductionCode,
        type: FormItemType.Picker,
        label: "产生设施",
        default: undefined,
        rules: [],
        items: [],
        change: (item, formData: any) => {
          const produceFacility = item.data;
          const items = (produceFacility as any).wastes.map((data: any) => ({
            label: data.wasteCode,
            value: data.wasteCode,
            data,
          }));
          form.items[FormItemName.WasteCode].items = items;
          form.items[FormItemName.WasteCode].change!(items[0], formData);
        },
      } as FormItem,
      [FormItemName.GenerationTime]: {
        name: FormItemName.GenerationTime,
        type: FormItemType.Time,
        label: "产生时间",
        default: () => {
          return dayjs().format("YYYY-MM-DD HH:mm:ss");
        },
        rules: [],
      } as FormItem,
      [FormItemName.Quantity]: {
        name: FormItemName.Quantity,
        type: FormItemType.Float,
        label: "产生量",
        default: 0,
        rules: [],
      } as FormItem,
      [FormItemName.Unit]: {
        name: FormItemName.Unit,
        type: FormItemType.Text,
        label: "计量单位",
        default: "吨",
        rules: [],
        items: [],
      } as FormItem,
      [FormItemName.CategoryVersion]: {
        name: FormItemName.CategoryVersion,
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
        name: FormItemName.WasteProperty,
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
        name: FormItemName.WasteCode,
        type: FormItemType.Picker,
        label: "废物代码",
        default: undefined,
        rules: [],
        items: [],
        change: (
          item: { label: string; value: string; data: any },
          formData: any
        ) => {
          Object.assign(formData, item.data);
        },
      } as FormItem,
      [FormItemName.WasteName]: {
        name: FormItemName.WasteName,
        type: FormItemType.Text,
        label: "废物名称",
        default: undefined,
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.WasteCategoryCode]: {
        name: FormItemName.WasteCategoryCode,
        type: FormItemType.Text,
        label: "废物类别",
        default: undefined,
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.ContainerType]: {
        name: FormItemName.ContainerType,
        type: FormItemType.Picker,
        label: "容器类别",
        default: "0",
        items: [
          { label: "槽罐", value: "0" },
          { label: "装袋", value: "1" },
          { label: "装桶", value: "2" },
          { label: "其他", value: "9" },
        ],
        rules: [],
      } as FormItem,
      [FormItemName.ContainerMaterial]: {
        name: FormItemName.ContainerMaterial,
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
        name: FormItemName.ContainerStandard,
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
        name: FormItemName.ContainerCount,
        type: FormItemType.Int,
        label: "包装数量",
        default: 0,
        rules: [],
      } as FormItem,
      [FormItemName.DataType1]: {
        name: "dataType",
        type: FormItemType.Text,
        label: "数据类型",
        default: "1",
        hide: true,
        rules: [],
      } as FormItem,
      [FormItemName.DataType2]: {
        name: "dataType",
        type: FormItemType.Text,
        label: "数据类型",
        default: "2",
        rules: [],
      } as FormItem,
      [FormItemName.DataType3]: {
        name: "dataType",
        type: FormItemType.Text,
        label: "数据类型",
        default: "3",
        hide: true,
        rules: [],
      } as FormItem,
      [FormItemName.DataType4]: {
        name: "dataType",
        type: FormItemType.Text,
        label: "数据类型",
        default: "4",
        hide: true,
        rules: [],
      } as FormItem,
      [FormItemName.Principal]: {
        name: FormItemName.Principal,
        type: FormItemType.Text,
        label: "负责人",
        default: undefined,
        rules: [],
      } as FormItem,
      [FormItemName.InventoryCode]: {
        name: FormItemName.InventoryCode,
        type: FormItemType.Text,
        label: "入库批次编码",
        default: undefined,
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.InventoryOperateTime]: {
        name: FormItemName.InventoryOperateTime,
        type: FormItemType.Text,
        label: "入库时间",
        default: () => {
          return dayjs().format("YYYY-MM-DD HH:mm:ss");
        },
        rules: [],
      } as FormItem,
      [FormItemName.InQuantity]: {
        name: FormItemName.InQuantity,
        type: FormItemType.Float,
        label: "入库量",
        default: 0,
        rules: [],
      } as FormItem,
      [FormItemName.StoragePrincipal]: {
        name: FormItemName.StoragePrincipal,
        type: FormItemType.Text,
        label: "负责人",
        default: "王五",
        rules: [],
      } as FormItem,
      [FormItemName.OutPrincipal]: {
        name: FormItemName.OutPrincipal,
        type: FormItemType.Text,
        label: "负责人",
        default: "张三",
        rules: [],
      } as FormItem,
      [FormItemName.OutCode]: {
        name: FormItemName.OutCode,
        type: FormItemType.Text,
        label: "出库批次编码",
        default: undefined,
        rules: [],
        config: {
          readonly: true,
        },
      } as FormItem,
      [FormItemName.OutTime]: {
        name: FormItemName.OutTime,
        type: FormItemType.Text,
        label: "出库时间",
        default: () => {
          return dayjs().format("YYYY-MM-DD HH:mm:ss");
        },
        rules: [],
      } as FormItem,
      [FormItemName.OutQuantity]: {
        name: FormItemName.OutQuantity,
        type: FormItemType.Float,
        label: "出库量",
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
      Object.assign(company, result.data);
      form.items[FormItemName.Uscc].default = result.data?.uscc;
      const items = (result.data?.produceFacilities as any[]).map((data) => ({
        label: data.title,
        value: data.productionCode,
        data,
      }));
      form.items[FormItemName.ProductionCode].items = items;
      form.items[FormItemName.ProductionCode].default = items[0].value;
      form.items[FormItemName.Principal].default = company.account;
      form.items[FormItemName.WasteCode].items = items[0].data.wastes.map(
        (data: any) => ({ label: data.wasteCode, value: data.wasteCode, data })
      );
      const data: Record<string, unknown> = items[0].data.wastes[0];
      for (const itemName in data) {
        if (form.items[itemName as FormItemName]) {
          form.items[itemName as FormItemName].default = data[itemName];
        }
      }
    }
    return result;
  };

  const products = reactive<any>({});
  const lastETags = reactive<{
    product: string;
    inStore: string;
    outStore: string;
  }>({ product: undefined, inStore: undefined, outStore: undefined });
  const setProducts = (data: any) => {
    products[data.eTag] = data;
    lastETags.product = data.eTag;
  };
  const inStores = reactive<any>({});
  const setInStores = (data: any) => {
    inStores[data.eTag] = data;
    lastETags.inStore = data.eTag;
  };

  const outStores = reactive<any>({});
  const setOutStores = (data: any) => {
    outStores[data.eTag] = data;
    lastETags.outStore = data.eTag;
  };

  const printLabel = async (eTag: string) => {
    const deviceId = company.devices[0];
    let message: string = undefined;
    try {
      const result = await apis.getPrinterInfo(deviceId);
      if (result.success && result.data) {
        if (result.data.online) {
          await apis.printLabel({ deviceId, template: "1", eTag });
          window.setTimeout(async () => {
            let mes: string = "打印失败";
            try {
              const result = await apis.getPrinterInfo(deviceId);
              if (!result.success || result.data?.online) {
                mes = (result.data?.prn_status as string) ?? "打印失败";
              }
            } catch (e) {
              mes = "网络请求失败";
            }
            if (mes === "正常打印" || mes === "待机") {
              Notify({ type: "success", message: "打印已完成" });
            } else {
              Notify({ type: "danger", message: mes });
            }
          }, 1000);
        } else {
          message = (result.data?.prn_status as string) ?? "打印失败";
        }
      } else {
        message = "网络请求失败";
      }
    } catch (e) {
      message = "网络请求失败";
    }
    if (message) {
      Notify({ type: "danger", message: message });
    } else {
      Notify({ type: "primary", message: "正在打印中" });
    }
  };

  const wastes = ref<Record<string, unknown>[]>([]);

  const getWastes = async (wasteType: WasteType) => {
    const result = await apis.getWastes(wasteType);
    if (result.success && result.data?.tz) {
      wastes.value = result.data.tz as Record<string, unknown>[];
    }
    return result;
  };

  const eTagInfo = ref<{
    info: Record<string, unknown>;
    tz: Record<string, unknown>[];
  }>(undefined);
  const getEtagInfo = async (eTag: string) => {
    const result = await apis.getEtagInfo(eTag);
    if (result.success) {
      eTagInfo.value = result.data as {
        info: Record<string, unknown>;
        tz: Record<string, unknown>[];
      };
    }
    return result;
  };
  return {
    form,
    company,
    products,
    opreateTZ,
    getCompanyInfo,
    printLabel,
    setProducts,
    lastETags,
    inStores,
    outStores,
    setInStores,
    setOutStores,
    wastes,
    getWastes,
    getEtagInfo,
    eTagInfo,
  };
});
