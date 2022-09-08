<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  defineProps,
  withDefaults,
  defineEmits,
  reactive,
} from "vue";
import dayjs from "dayjs";
import { FormItemType, OperateType, DataType } from "@/config/enum";
import { useGlobleStore } from "@/stores/globle";
import type { FormItem } from "@/types";
import {
  Form,
  Field,
  CellGroup,
  Button,
  CheckboxGroup,
  Checkbox,
  DatetimePicker,
  Picker,
  Cell,
  Popup,
} from "vant";

export interface Props {
  formItems: FormItem[];
}
const props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
});

const emit = defineEmits<{
  (e: "submit", data: Record<string, any>): void;
}>();

const formData = reactive<Record<string, any>>({});

const showPickers = reactive<Record<string, boolean>>({});
const globalStore = useGlobleStore();
// const dataType = ref<DataType>(DataType.Generate);
const onSubmit = async (values) => {
  const operateType = formData.sid.value ? OperateType.Edit : OperateType.Add;
  const result = await globalStore.opreateTZ(
    dataType.value,
    operateType,
    formData
  );
  if (result && result.success && result.data) {
    Object.assign(formData, result.data);
  }
  emit("submit", formData);
};
onBeforeMount(() => {
  props.formItems.forEach((item, index) => {
    formData[item.name].value =
      item.default instanceof Function ? item.default() : item.default;
  });
});
</script>
<template>
  <Form @submit="onSubmit">
    <CellGroup inset>
      <div v-for="formItem in props.formItems" :key="formItem.name">
        <div
          v-if="
            formItem.type === FormItemType.Int ||
            formItem.type === FormItemType.Float ||
            formItem.type === FormItemType.Text
          "
          v-show="!formItem.hide"
        >
          <Field
            :type="formItem.type === FormItemType.Text ? 'text' : 'digit'"
            v-model="formData[formItem.name]"
            :name="formItem.name"
            :label="formItem.label"
            :placeholder="formItem.label"
            :rules="formItem.rules"
            v-bind="formItem.config"
          />
        </div>
        <div
          v-if="formItem.type === FormItemType.Picker"
          v-show="!formItem.hide"
        >
          <Cell
            :label="
              formItem.items?.find(
                (item) => item.value === formData[formItem.name]
              )?.label
            "
            :title="formItem.label"
            @click="showPickers[formItem.name] = true"
            is-link
          />
          <div v-show="showPickers[formItem.name as string]">
            <Popup position="bottom">
              <Picker
                :columns="formItem.items!.map((item) => item.label)"
                @confirm="(value, index) => {
                    formData[formItem.name as string]  = formItem.items![index].value;
                    showPickers[formItem.name as string] = false;
                  }"
                @cancel="showPickers[formItem.name as string] = false"
              />
            </Popup>
          </div>
        </div>
        <div v-if="formItem.type === FormItemType.Time" v-show="!formItem.hide">
          <Cell
            :value="formData[formItem.name]"
            :title="formItem.label"
            @click="showPickers[formItem.name] = true"
            is-link
          />
          <div v-show="showPickers[formItem.name as string]">
            <Popup position="bottom">
              <DatetimePicker
                type="datetime"
                @confirm="
                  (value) => {
                    formData[formItem.name] = dayjs(value).format(
                      'YYYY-MM-DD HH:mm:ss'
                    );
                    showPickers[formItem.name] = false;
                  }
                "
                @cancel="showPickers[formItem.name as string] = false"
              />
            </Popup>
          </div>
        </div>
        <div
          v-if="formItem.type === FormItemType.Checkbox"
          v-show="!formItem.hide"
        >
          <Field :name="formItem.name" :label="formItem.label">
            <template #input>
              <CheckboxGroup
                direction="horizontal"
                v-model="formData[formItem.name]"
                v-bind="formItem.config"
              >
                <Checkbox
                  v-for="item in formItem.items"
                  :key="item.value"
                  :name="item.value"
                  >{{ item.label }}</Checkbox
                >
              </CheckboxGroup>
            </template>
          </Field>
        </div>
      </div>
    </CellGroup>
    <div style="margin: 16px">
      <Button round block type="primary" native-type="submit"> 提交 </Button>
    </div>
  </Form>
</template>
