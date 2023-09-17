<script setup>
import { toRefs } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  image: String,
  title: String,
  description: String,
});
const { image, title, description } = toRefs(props);
</script>

<template>
  <RouterLink to="/">
    <div class="bg-[#111111] p-4 rounded-md hover:bg-[#252525] cursor-pointer">
      <img class="rounded-md" :src="image" alt="" />
      <div class="text-white mt-4 line-clamp-1 font-semibold text-[17px]">
        {{ title }}
      </div>
      <div class="text-gray-400 text-[14px] line-clamp-2 mt-2">
        {{ description }}
      </div>
    </div>
  </RouterLink>
</template>
