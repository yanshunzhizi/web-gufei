<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import Form from "@/components/Form/index.vue";
// import BackButton from "@/components/Form/BackButton.vue";
import { FormItemName, FormItemType } from "@/config/enum";
import { useGlobleStore } from "@/stores/globle";

export interface Props {
  eTag: string;
}

const props = defineProps<Props>();

const formItemNames = [
  FormItemName.Sid,
  FormItemName.Uscc,
  FormItemName.OutCode,
  FormItemName.OutTime,
  FormItemName.OutQuantity,
  FormItemName.Unit,
  FormItemName.CategoryVersion,
  FormItemName.WasteCategoryCode,
  FormItemName.WasteCode,
  FormItemName.WasteName,
  FormItemName.WasteProperty,
  FormItemName.ContainerType,
  FormItemName.ContainerMaterial,
  FormItemName.ContainerStandard,
  FormItemName.ContainerCount,
  FormItemName.DataType3,
  FormItemName.OutPrincipal,
];
const globleStore = useGlobleStore();

let formItems = computed(() => {
  return formItemNames.map((formItemName) => {
    const waste = globleStore.wastes.find((waste) => waste.eTag === props.eTag);
    const formItem = globleStore.form.items[formItemName];
    let data: any = formItem.default;
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
    return {
      ...formItem,
      default: data,
    };
  });
});

const onSubmit = (formData: any) => {
  globleStore.setOutStores(formData);
};
</script>
<template>
  <Form :formItems="formItems" @submit="onSubmit" :showBackBtn="true"></Form>
</template>
