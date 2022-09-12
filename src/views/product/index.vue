<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { Row, Col, Button, Tabs, Tab } from "vant";
import outStore from "@/assets/outStore.png";
import inStore from "@/assets/inStore.png";
import product from "@/assets/product.png";
import recordProduct from "@/assets/recordProduct.png";
import selfUsage from "@/assets/selfUsage.png";
import delegateOut from "@/assets/delegateOut.png";
import scanCode from "@/assets/scanCode.png";

import * as echarts from "echarts/core";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const option: ECOption = {
  // ...
};

const tabs = reactive<{ id: string; name: string }[]>([
  { id: "day", name: "日" },
  { id: "month", name: "月" },
  { id: "year", name: "年" },
]);

const selectedTabName = ref<string>(tabs[0].name);
// console.log("formItems", formItems);
// window.debugger;

const menus = reactive<
  { label: string; icon: string; id: string; style: unknown; color: string }[]
>([
  {
    id: "recordProduct",
    label: "产废登记",
    icon: recordProduct,
    color: "#20d67b",
    style: {
      backgroundColor: "#20d67b",
    },
  },
  {
    id: "inStore",
    label: "产废入库",
    icon: inStore,
    color: "#5456e8",
    style: {
      backgroundColor: "#5456e8",
    },
  },
  {
    id: "outStore",
    label: "产废出库",
    icon: outStore,
    color: "#e6a14c",
    style: {
      backgroundColor: "#e6a14c",
    },
  },
  {
    id: "selfUsage",
    label: "自利用",
    icon: selfUsage,
    color: "#ed49a6",
    style: {
      backgroundColor: "#ed49a6",
    },
  },
  {
    id: "delegateOut",
    label: "委外",
    icon: delegateOut,
    color: "#a746db",
    style: {
      backgroundColor: "#a746db",
    },
  },
  {
    id: "scanCode",
    label: "扫码",
    icon: scanCode,
    color: "#e3664d",
    style: {
      backgroundColor: "#e3664d",
    },
  },
]);

const selectedMenu = (id: string) => {};
const statisticsInfo = reactive<{
  summarys: {
    name: string;
    id: string | number;
    unit: string;
    icon: string;
    color: string;
    value: number;
  }[];
  chartDatas: any[];
}>({
  summarys: [
    {
      name: "产废",
      id: "product",
      unit: "吨",
      icon: product,
      color: "#f00",
      value: 30000,
    },
    {
      name: "入库",
      id: "inStore",
      unit: "吨",
      icon: inStore,
      color: "#f00",
      value: 30000,
    },
    {
      name: "出库",
      id: "outStore",
      unit: "吨",
      icon: outStore,
      color: "#f00",
      value: 30000,
    },
    {
      name: "委外",
      id: "delegateOut",
      unit: "吨",
      icon: delegateOut,
      color: "#f00",
      value: 30000,
    },
    {
      name: "自利用",
      id: "selfUsage",
      unit: "吨",
      icon: selfUsage,
      color: "#f00",
      value: 30000,
    },
  ],
  chartDatas: [],
});

const storeInfos = reactive<
  { id: string | number; name: string; quantity: number; capacity: number }[]
>([
  {
    id: "1",
    name: "仓库1",
    quantity: 500,
    capacity: 5000,
  },
  {
    id: "2",
    name: "仓库2",
    quantity: 500,
    capacity: 5000,
  },
]);
</script>
<template>
  <!-- <Form :formItems="formItems"></Form> -->
  <div style="background-color: #5e2ff6; color: #fff">
    <div style="width: 96vw; margin: 0 auto">
      <div
        style="
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <h2>产废单位首页</h2>
      </div>
      <Row gutter="10" :wrap="true">
        <Col
          span="8"
          v-for="menu in menus"
          :key="menu.id"
          style="margin-bottom: 10px"
        >
          <Button
            type="primary"
            :icon="menu.icon"
            style="width: 100%; border-radius: 10px; border: none"
            :color="menu.color"
            @click="() => selectedMenu(menu.id)"
            >{{ menu.label }}</Button
          >
        </Col>
      </Row>
      <div style="height: 20px"></div>
      <Tabs
        v-model:active="selectedTabName"
        type="card"
        color="#9483f2"
        background="#91e4f4"
        title-inactive-color="#fff"
        title-active-color="#fff"
      >
        <tab
          :title="tab.name"
          :name="tab.id"
          v-for="tab in tabs"
          :key="tab.id"
          style="background-color: #05cffc"
        >
          <div style="width: 92vw; margin: 0 auto">
            <div style="height: 10px"></div>
            <div style="width: 100%">
              <div
                style="
                  background-color: #05bde6;
                  border-radius: 10px;
                  padding: 2vw;
                  width: 100%;
                "
              >
                <div
                  style="
                    height: 30px;
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                  "
                >
                  危废统计信息
                </div>
                <Row :wrap="true" gutter="5" justify="space-between">
                  <Col
                    span="12"
                    style="margin-bottom: 5px; height: 60px"
                    v-for="(summary, index) in statisticsInfo.summarys"
                    :key="summary.id"
                  >
                    <div
                      style="
                        height: 100%;
                        display: flex;
                        border: 2px solid #05cffc;
                      "
                      :style="{
                        width:
                          index === statisticsInfo.summarys.length - 1 &&
                          index % 2 === 0
                            ? 'calc(100% - 2px)'
                            : '100%',
                      }"
                    >
                      <div
                        style="
                          width: 30%;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                      >
                        <img :src="summary.icon" alt="" style="height: 80%" />
                      </div>
                      <div style="width: 60%">
                        <div
                          style="
                            height: 20px;
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                          "
                        >
                          {{ summary.name }}
                        </div>
                        <div
                          style="
                            height: 40px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 28px;
                            font-weight: bold;
                          "
                          :style="{ color: summary.color }"
                        >
                          {{ summary.value }}
                        </div>
                      </div>
                      <div
                        style="
                          width: 10%;
                          display: flex;
                          justify-content: center;
                          align-items: flex-end;
                        "
                      >
                        {{ summary.unit }}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style="height: 10px"></div>
              <Row :wrap="true" gutter="5" justify="space-between">
                <Col
                  span="12"
                  style="margin-bottom: 5px; height: 60px"
                  v-for="(summary, index) in statisticsInfo.summarys"
                  :key="summary.id"
                >
                  <div
                    style="
                      height: 100%;
                      display: flex;
                      border: 2px solid #05cffc;
                    "
                    :style="{
                      width:
                        index === statisticsInfo.summarys.length - 1 &&
                        index % 2 === 0
                          ? 'calc(100% - 2px)'
                          : '100%',
                    }"
                  >
                    <div
                      style="
                        width: 30%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <img :src="summary.icon" alt="" style="height: 80%" />
                    </div>
                    <div style="width: 60%">
                      <div
                        style="
                          height: 20px;
                          display: flex;
                          align-items: center;
                          font-size: 14px;
                        "
                      >
                        {{ summary.name }}
                      </div>
                      <div
                        style="
                          height: 40px;
                          display: flex;
                          justify-content: flex-start;
                          align-items: center;
                          font-size: 28px;
                          font-weight: bold;
                        "
                        :style="{ color: summary.color }"
                      >
                        {{ summary.value }}
                      </div>
                    </div>
                    <div
                      style="
                        width: 10%;
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                      "
                    >
                      {{ summary.unit }}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </tab>
      </Tabs>
      <div style="height: 20px"></div>
      <div>
        <div style="height: 220px; width: 100%; background-color: #f00"></div>
        <div style="background-color: #91e4f4; height: 300px"></div>
      </div>
    </div>
  </div>
</template>
