<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { useRouter } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { Icon } from "vant";
export interface Props {
  item: {
    eTag: string;
    wasteName: string;
    wasteCode: string;
    quantity: number;
    data?: Record<string, unknown>;
  };
  toRoute?: RouteLocationRaw | (() => RouteLocationRaw);
}
const props = defineProps<Props>();
const router = useRouter();
const onClick = () => {
  if (props.toRoute) {
    router.push(
      props.toRoute instanceof Function ? props.toRoute() : props.toRoute
    );
  }
};
</script>
<template>
  <div
    style="
      height: 60px;
      padding: 6px;
      background-color: #ffffff;
      margin-bottom: 5px;
    "
    class="van-hairline--top,van-hairline--left"
    @click="onClick"
  >
    <div style="width: 100%">
      <div
        style="
          height: 16px;
          font-size: 12px;
          line-height: 20px;
          display: flex;
          align-items: center;
        "
      >
        <div style="width: 60px">标签号:</div>
        <div style="overflow-x: hidden; width: calc(100% - 80px)">
          {{ props.item.eTag }}
        </div>
        <div style="width: 20px" size="20">
          <Icon name="arrow" />
        </div>
      </div>
      <div
        style="
          height: 16px;
          font-size: 12px;
          line-height: 20px;
          display: flex;
          align-items: center;
        "
      >
        <div style="width: 60px">危废名称:</div>
        <div style="overflow-x: hidden">
          {{ props.item.wasteName }}
        </div>
      </div>
      <div
        style="
          height: 16px;
          font-size: 12px;
          line-height: 20px;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
        "
      >
        <div
          style="
            height: 16px;
            font-size: 12px;
            line-height: 20px;
            display: flex;
            align-items: center;
          "
        >
          <div style="width: 60px">危废代码:</div>
          <div style="overflow-x: hidden">
            {{ props.item.wasteCode }}
          </div>
        </div>
        <div
          style="
            height: 16px;
            font-size: 12px;
            line-height: 20px;
            display: flex;
            align-items: center;
          "
        >
          <div style="width: 60px">危废重量:</div>
          <div style="overflow-x: hidden">
            {{ props.item.quantity }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
