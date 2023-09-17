<script setup>
import { defineAsyncComponent, ref, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  pageUrl: String,
  name: String,
});

const { pageUrl, name } = toRefs(props);
const textIsHover = ref(false);

watchEffect(() => {
  if (route.path === pageUrl) {
    textIsHover.value = true;
  } else {
    textIsHover.value = false;
  }
});
</script>

<template>
  <div
    class="flex items-center cursor-pointer gap-x-4 py-2"
    :class="[
      route.path == pageUrl ? 'text-white' : '',
      textIsHover ? 'text-white ' : 'text-gray-400',
    ]"
    @mouseenter="textIsHover = true"
    @mouseleave="textIsHover = false"
  >
    <slot></slot>
    <span class="font-semibold text-[14px] mt-0.5">{{ name }}</span>
  </div>
</template>
