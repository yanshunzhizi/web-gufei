<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { useRouter } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { Button } from "vant";
export interface Props {
  to?: RouteLocationRaw | (() => RouteLocationRaw);
}
const router = useRouter();
const props = defineProps<Props>();

const back = () => {
  console.log("props.to", props.to);
  if (props.to) {
    router.push(props.to instanceof Function ? props.to() : props.to);
  } else {
    router.back();
  }
};
</script>
<template>
  <Button
    type="primary"
    native-type="button"
    style="width: 15vw; margin-left: 10px"
    @click="back"
  >
    返回
  </Button>
</template>
