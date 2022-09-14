<script lang="ts" setup>
import { ref, reactive, computed, onBeforeMount } from "vue";
import WasteItem from "@/components/List/wasteItem.vue";
import { useRouter, useRoute } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { useGlobleStore } from "@/stores/globle";
import { List, Icon } from "vant";
import { WasteType } from "@/config/enum";

export interface Props {
  type: WasteType;
}

const globalStore = useGlobleStore();

const props = withDefaults(defineProps<Props>(), {
  type: WasteType.InStore,
});

const loading = ref<boolean>(false);
const finished = ref<boolean>(true);

onBeforeMount(async () => {
  await globalStore.getWastes(props.type as WasteType);
});

const items = computed(() => {
  switch (props.type) {
    default: {
      return globalStore.wastes.map((waste) => ({
        data: waste as any,
        quantity: waste.quantity as number,
        wasteName: waste.wasteName as string,
        wasteCode: waste.wasteCode as string,
        eTag: waste.eTag as string,
        batchCode: waste.generationCode as string,
      }));
    }
    case WasteType.OutStore: {
      return globalStore.wastes.map((waste) => ({
        data: waste as any,
        quantity: waste.inQuantity as number,
        wasteName: waste.wasteName as string,
        wasteCode: waste.wasteCode as string,
        eTag: waste.eTag as string,
        batchCode: waste.inventoryCode as string,
      }));
    }
  }
});

const router = useRouter();

const back = () => {
  router.push({ name: "productIndex" });
};
</script>
<template>
  <div style="background-color: #f7f8fa; width: 100vw; height: 100vh">
    <div style="width: 96vw; margin: 0 auto">
      <div style="height: 40px; display: flex; align-items: center">
        <Icon name="arrow-left" size="30" @click="back" />
      </div>
      <List :loading="loading" :finished="finished">
        <WasteItem
          v-for="item in items"
          :key="item.eTag"
          :item="item"
          :toRoute="{
          name:
            props.type === WasteType.InStore
              ? 'productInStore'
              : 'productOutStore',
          params: {
            eTag: item.eTag,
          },
        } as RouteLocationRaw"
        ></WasteItem>
      </List>
    </div>
  </div>
</template>
