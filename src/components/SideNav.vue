<script setup>
import { RouterLink } from "vue-router";

import Home from "icons/Home.vue";
import Magnify from "icons/Magnify.vue";
import Bookshelf from "icons/Bookshelf.vue";
import MenuItem from "./MenuItem.vue";
</script>

<template>
  <div id="SideNav" class="p-2 pb-0 w-[240px] bg-black h-full gap-y-2">
    <div class="rounded-md p-4 bg-[#121212] min-h-min">
      <RouterLink to="/">
        <MenuItem class="ml-[1px]" name="Home" pageUrl="/">
          <Home :size="24" />
        </MenuItem>
      </RouterLink>
      <RouterLink to="/search">
        <MenuItem class="ml-[1px]" name="Search" pageUrl="/search">
          <Magnify :size="24" />
        </MenuItem>
      </RouterLink>
    </div>
    <div class="rounded-md p-4 bg-[#121212]">
      <RouterLink to="/library">
        <MenuItem class="ml-[1px]" name="Your Library" pageUrl="/library">
          <Bookshelf :size="24" />
        </MenuItem>
      </RouterLink>
      <ul class="border-t border-t-gray-700 mt-2 pt-1">
        <li
          class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My Playlist #1
        </li>
        <li
          class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My Playlist #2
        </li>
        <li
          class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My Playlist #3
        </li>
        <li
          class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My Playlist #4
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
#SideNav {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
