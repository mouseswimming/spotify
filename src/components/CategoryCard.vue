<script setup>
import { ref, toRefs } from "vue";
import { RouterLink } from "vue-router";
import uniqolor from "uniqolor";

const props = defineProps({
  image: String,
  name: String,
});
const { image, name } = toRefs(props);
const randomColor = ref(uniqolor.random());
</script>

<template>
  <RouterLink to="/">
    <div
      v-if="randomColor.color"
      :style="`background-color: ${randomColor.color};`"
      class="contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden"
    >
      <div class="text-white pt-3 pl-4 font-semibold text-[23px]">
        {{ name }}
      </div>
      <img
        class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]"
        :src="image || ''"
      />
    </div>
  </RouterLink>
</template>
