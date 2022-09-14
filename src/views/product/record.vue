<script lang="ts" setup>
import { ref, computed } from "vue";
import Form from "@/components/Form/index.vue";
import { FormItemName } from "@/config/enum";
import type { FormItem } from "@/types";
import { useGlobleStore } from "@/stores/globle";
import { Button } from "vant";
const formItemNames = [
  FormItemName.Sid,
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
  FormItemName.DataType1,
  FormItemName.Principal,
];
const globleStore = useGlobleStore();

const formItems = computed(() => {
  return formItemNames.map((formItemName) => ({
    ...(globleStore.form.items[formItemName] as FormItem),
  }));
});

const loading = ref<boolean>(false);
const printLabel = async (formData: Record<string, unknown>) => {
  loading.value = true;
  await globleStore.printLabel(formData[FormItemName.Etag] as string);
  loading.value = false;
};

const onSubmit = (formData: any) => {
  globleStore.setProducts(formData);
};
</script>
<template>
  <Form
    :formItems="formItems"
    @submit="onSubmit"
    :showBackBtn="true"
    :backTo="{ name: 'productIndex' }"
  >
    <template #buttons="{ formData }">
      <Button
        type="primary"
        native-type="button"
        style="width: 15vw; margin-left: 10px"
        v-show="formData.sid"
        @click="() => printLabel(formData)"
        :loading="loading"
      >
        打印
      </Button>
    </template>
  </Form>
</template>
