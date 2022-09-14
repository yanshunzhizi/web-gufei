<script setup lang="ts">
// import TheWelcome from "@/components/TheWelcome.vue";
import Map from "@/assets/map.png";
import Chejian from "@/assets/chejian.png";
import Cangku from "@/assets/Cangku.png";
import { useGlobleStore } from "@/stores/globle";
import { defineProps, onBeforeMount } from "vue";

export interface Props {
  eTag: string;
}
const globalStore = useGlobleStore();

const props = defineProps<Props>();

onBeforeMount(async () => {
  await globalStore.getEtagInfo(props.eTag);
});
</script>

<template>
  <div style="width: 100vw; height: 100vh; color: #fff">
    <div
      style="
        height: 60px;
        border: solid;
        background-color: #06aefc;
        font-size: 24px;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding-left: 4vw;
      "
    >
      危废基本信息
    </div>
    <div
      style="height: 460px; width: 100%"
      :style="{ background: 'url(' + Map + ') no-repeat' }"
    >
      <div style="height: 10px"></div>
      <div
        style="
          height: 80px;
          background-color: #0fb6fe;
          width: 90vw;
          margin: 0 auto;
          color: #000;
          font-weight: bold;
        "
      >
        <div style="height: 30px"></div>
        <div style="height: 50px; display: flex">
          <div style="width: 45%; height: 100%; background-color: #cde7fa">
            <div
              style="
                height: 20px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10px;
              "
            >
              {{ globalStore.eTagInfo.tz[0].dataType_zh }}
            </div>
            <div
              style="
                height: 20px;
                font-size: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #939ea7;
              "
            >
              时间: {{ globalStore.eTagInfo.tz[0].updateTime }}
            </div>
          </div>
          <div
            style="
              width: 55%;
              height: 100%;
              background-color: #acd5f2;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            产废单位——处置单位
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #8cc8f2; height: 210px">
      <div style="width: 90vw; margin: 0 auto; color: #000; font-weight: bold">
        <div
          style="
            height: 40px;
            font-size: 18px;
            display: flex;
            align-items: center;
          "
        >
          基本信息
        </div>
        <div style="height: 150px; font-size: 14px">
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">电子标签码</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.eTag }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">危废类别</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.wasteCategoryCodeTitle }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">危废代码</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.wasteCode }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">危废名称</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.wasteName }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">危废重量</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.quantity }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">危废特性</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.wastePropertyTitle }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">危险成分</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.mainSubstance }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">物理状态</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.physicalStateTitle }}
            </div>
          </div>
          <div style="display: flex; height: 18px">
            <div style="width: 20%; height: 100%">产废单位</div>
            <div style="width: 80%; height: 100%">
              {{ globalStore.eTagInfo.info.produceTitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px; margin-bottom: 20px">
      <div style="width: 90vw; margin-left: 4vw">
        <div style="color: #000">
          <div
            style="margin-top: 10px; display: flex"
            v-for="(tz, index) in globalStore.eTagInfo.tz"
            :key="(tz.dataType as string)"
          >
            <div style="width: 15vw">
              <div
                style="
                  width: 40px;
                  height: 40px;
                  border-radius: 25px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #fff;
                  font-size: 18px;
                  font-weight: bold;
                "
                :style="{
                  backgroundColor: index === 0 ? '#06aefc' : '#b3b4bd',
                }"
              >
                {{ (tz.dataType_zh as string).substring(0, 1) }}
              </div>
              <div
                style="
                  border-left: dashed 2px #b3b4bd;
                  height: 260px;
                  position: relative;
                  left: 20px;
                  top: 10px;
                "
              ></div>
            </div>
            <div style="width: 75vw">
              <div style="display: flex; width: 100%">
                <div
                  style="
                    height: 40px;
                    display: flex;
                    align-items: center;
                    font-size: 24px;
                    width: 25vw;
                  "
                >
                  {{ tz.dataType_zh }}
                </div>
                <div
                  style="
                    margin-left: 3vw;
                    height: 37px;
                    display: flex;
                    align-items: flex-end;
                    font-size: 14px;
                    width: 50vw;
                  "
                >
                  {{ tz.updateTime }}
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  height: 20px;
                  color: #9b9b9b;
                "
              >
                单位: {{ tz.title }}
              </div>
              <div
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  height: 20px;
                  color: #9b9b9b;
                "
              >
                设施: {{ tz.dataType === "1" ? "第一车间" : "二号仓库" }}
              </div>
              <div
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  height: 20px;
                  color: #9b9b9b;
                "
              >
                人员: {{ tz.dataType === "1" ? "生产员张三" : "库管员李四" }}
              </div>
              <div style="height: 200px; margin-top: 10px">
                <img
                  :src="tz.dataType === '1' ? Chejian : Cangku"
                  alt=""
                  style="height: 100%; width: 100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
