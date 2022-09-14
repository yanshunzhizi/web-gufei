<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  withDefaults,
  reactive,
  defineEmits,
  defineProps,
} from "vue";
import dayjs from "dayjs";
import { FormItemType, OperateType } from "@/config/enum";
import { useGlobleStore } from "@/stores/globle";
import type { FormItem } from "@/types";
import BackButton from "./backButton.vue";
import type { RouteLocationRaw } from "vue-router";
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
  Notify,
} from "vant";

export interface Props {
  formItems: FormItem[];
  backTo?: RouteLocationRaw;
  showBackBtn?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
  backTo: undefined,
  showBackBtn: false,
});

const emit = defineEmits<{
  (e: "submit", data: Record<string, any>): void;
}>();

const formData = reactive<Record<string, any>>({});
const showPickers = reactive<Record<string, boolean>>({});
const globalStore = useGlobleStore();
const loading = ref<boolean>(false);

// const dataType = ref<DataType>(DataType.Generate);
const onSubmit = async () => {
  loading.value = true;
  let message: string = undefined;
  try {
    const operateType = formData.sid ? OperateType.Edit : OperateType.Add;
    const data = { ...formData };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      } else if (data[key] instanceof Array) {
        data[key] = data[key].join(",");
      }
    }
    const result = await globalStore.opreateTZ(operateType, data);
    if (result && result.success && result.data) {
      Object.assign(formData, result.data);
    } else {
      message = "提交失败";
    }
  } catch (e) {
    console.log("error", e);
    message = "网络请求异常";
  }
  if (message) {
    Notify({ type: "danger", message: message });
  } else {
    Notify({ type: "success", message: "提交成功" });
  }
  emit("submit", formData);
  loading.value = false;
};
onBeforeMount(() => {
  props.formItems.forEach((item) => {
    formData[item.name] =
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
            :type="
              formItem.type === FormItemType.Text
                ? 'text'
                : formItem.type === FormItemType.Float
                ? 'number'
                : 'digit'
            "
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
          <Popup position="bottom" :show="showPickers[formItem.name]">
            <Picker
              :columns="formItem.items!.map((item) => item.label)"
              @confirm="(value, index) => {
                    formData[formItem.name] = formItem.items![index].value;
                    showPickers[formItem.name] = false;
                    if(formItem.change){
                      formItem.change(formItem.items![index],formData);
                    }
                  }"
              @cancel="showPickers[formItem.name] = false"
            />
          </Popup>
        </div>
        <div v-if="formItem.type === FormItemType.Time" v-show="!formItem.hide">
          <Cell
            :value="formData[formItem.name]"
            :title="formItem.label"
            @click="
              () => {
                showPickers[formItem.name] = true;
              }
            "
            is-link
          />
          <Popup position="bottom" :show="showPickers[formItem.name]">
            <DatetimePicker
              type="datetime"
              @confirm="
                  (value:Date) => {
                    formData[formItem.name] = dayjs(value).format(
                      'YYYY-MM-DD HH:mm:ss'
                    );
                    showPickers[formItem.name] = false;
                  }
                "
              @cancel="showPickers[formItem.name] = false"
            />
          </Popup>
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
    <div
      style="
        margin: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <Button
        type="primary"
        :loading="loading"
        native-type="submit"
        style="width: 15vw"
      >
        提交
      </Button>
      <BackButton v-show="props.showBackBtn" :to="props.backTo"></BackButton>
      <slot name="buttons" :formData="formData"></slot>
    </div>
  </Form>
</template>
