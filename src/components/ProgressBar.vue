<script setup>
import { onMounted, ref, watch } from "vue";

defineProps(["progressValue"]);
const emits = defineEmits([
  "update:progressValue",
  "seek",
  "drag-start",
  "drag-end",
]);

const isHover = ref(false);
const seeker = ref(null);
const seekerContainer = ref(null);

onMounted(() => {
  seekerContainer.value.addEventListener("click", (e) => {
    const clickPosition =
      (e.pageX - seekerContainer.value.offsetLeft) /
      seekerContainer.value.offsetWidth;
    emits("seek", clickPosition);
  });
  seeker.value.addEventListener("mousedown", () => emits("drag-start"));
  seeker.value.addEventListener("mouseup", () => emits("drag-end"));
});
</script>

<template>
  <div
    ref="seekerContainer"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <input
      :value="progressValue"
      @change="$emit('update:progressValue', $event.target.value)"
      type="range"
      class="w-full absolute h-0 z-40 appearance-none focus:outline-none mt-2 accent-white"
      ref="seeker"
      :class="{ rangeDotHidden: !isHover }"
    />
    <div
      class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
      :style="`width: ${progressValue}%;`"
      :class="isHover ? 'bg-green-500' : 'bg-white'"
    ></div>
    <div
      class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
    ></div>
  </div>
</template>

<style lang="postcss" scoped>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
