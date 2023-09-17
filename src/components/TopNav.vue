<script setup>
import { ref } from "vue";

import ChevronUp from "icons/ChevronUp.vue";
import ChevronDown from "icons/ChevronDown.vue";
import ChevronRight from "icons/ChevronRight.vue";
import ChevronLeft from "icons/ChevronLeft.vue";

const openMenu = ref(false);
</script>

<template>
  <div id="TopNav" class="sticky top-0">
    <div class="bg-[#101010] bg-opacity-80 flex items-center justify-between">
      <div class="flex items-center ml-6 py-4">
        <button type="button" class="control-button">
          <ChevronLeft fillColor="#FFFFFF" :size="30" />
        </button>
        <button type="button" class="control-button ml-4">
          <ChevronRight fillColor="#FFFFFF" :size="30" />
        </button>
      </div>

      <button
        type="button"
        @click="openMenu = !openMenu"
        :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
        class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer flex items-center"
      >
        <img
          class="rounded-full"
          width="27"
          src="https://avatars.githubusercontent.com/u/2342125?v=4"
        />
        <span class="text-white text-[14px] ml-1.5 font-semibold">
          Vivian Liu
        </span>
        <ChevronDown
          v-if="!openMenu"
          @click="openMenu = true"
          fillColor="#FFFFFF"
          :size="25"
        />
        <ChevronUp
          v-else
          @click="openMenu = false"
          fillColor="#FFFFFF"
          :size="25"
        />
      </button>

      <!-- Profile dropdown -->
      <div
        v-if="openMenu"
        class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
      >
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="profile-menu-item">Profile</li>
          <li class="profile-menu-item">Log out</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* #TopNav {
  @apply h-[60px] ;
  width: calc(100% - 240px);
} */

.control-button {
  @apply rounded-full bg-black p-[1px] cursor-pointer;
}

.profile-menu-item {
  @apply px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600;
}

.profile-menu-item:last-of-type {
  @apply border-b-0;
}
</style>
