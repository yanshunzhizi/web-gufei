<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import Form from "@/components/Form/index.vue";
// import BackButton from "@/components/Form/BackButton.vue";
import { FormItemName, FormItemType } from "@/config/enum";
import type { FormItem } from "@/types";
import { useGlobleStore } from "@/stores/globle";
export interface Props {
  eTag: string;
}

const props = defineProps<Props>();

const formItemNames = [
  FormItemName.Sid,
  FormItemName.Etag,
  FormItemName.Uscc,
  FormItemName.InventoryCode,
  FormItemName.InventoryOperateTime,
  FormItemName.InQuantity,
  FormItemName.Unit,
  FormItemName.CategoryVersion,
  FormItemName.WasteCode,
  FormItemName.WasteCategoryCode,
  FormItemName.WasteName,
  FormItemName.WasteProperty,
  FormItemName.ContainerType,
  FormItemName.ContainerMaterial,
  FormItemName.ContainerStandard,
  FormItemName.ContainerCount,
  FormItemName.DataType2,
  FormItemName.StoragePrincipal,
];
const globleStore = useGlobleStore();

let formItems = computed(() => {
  return formItemNames.map((formItemName) => {
    const formItem = globleStore.form.items[formItemName];
    let data: any = formItem.default;
    if (formItemName === FormItemName.Sid) {
      data = undefined;
    } else {
      const waste = globleStore.wastes.find(
        (waste) => waste.eTag === props.eTag
      );
      if (formItemName in waste) {
        if (formItem.type === FormItemType.Checkbox) {
          if (waste[formItemName]) {
            data = (waste[formItemName] as string).split(",");
          } else {
            data = [];
          }
        } else {
          data = waste[formItemName];
        }
      }
    }
    return {
      ...formItem,
      default: data,
    };
  });
});
</script>
<template>
  <Form :formItems="formItems" :showBackBtn="true"></Form>
</template>
