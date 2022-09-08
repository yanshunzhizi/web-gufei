<script lang="ts" setup>
import { ref, reactive } from "vue";
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

const formItems = reactive<FormItem[]>(
  formItemNames.map(
    (formItemName) => globleStore.form.items[formItemName] as FormItem
  )
);
</script>
<template>
  <Form :formItems="formItems"></Form>
</template>
