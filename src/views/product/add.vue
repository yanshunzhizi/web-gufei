<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import Form from "@/components/Form/index.vue";
import { FormItemName } from "@/config/enum";
import type { FormItem } from "@/types";
import { useGlobleStore } from "@/stores/globle";
const formItemNames = [
  FormItemName.Uscc,
  FormItemName.Etag,
  FormItemName.GenerationCode,
  FormItemName.ProductionCode,
  FormItemName.GenerationTime,
  FormItemName.Quantity,
  FormItemName.Unit,
  FormItemName.CategoryVersion,
  FormItemName.WasteProperty,
  FormItemName.WasteCode,
  FormItemName.WasteName,
  FormItemName.WasteCategoryCode,
  FormItemName.ContainerType,
  FormItemName.ContainerStandard,
  FormItemName.ContainerMaterial,
  FormItemName.ContainerCount,
];
const globleStore = useGlobleStore();

const formItems = computed(() => {
  return formItemNames.map(
    (formItemName) => globleStore.form.items[formItemName] as FormItem
  );
});
// console.log("formItems", formItems);
// window.debugger;
</script>
<template>
  <Form :formItems="formItems"></Form>
</template>
