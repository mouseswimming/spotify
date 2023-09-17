<script setup>
import SideNav from "./components/SideNav.vue";
import TopNav from "./components/TopNav.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

import { useSongStore } from "./stores/songStore";
import { storeToRefs } from "pinia";
const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);
</script>

<template>
  <div class="media-container">
    <SideNav />
    <main>
      <TopNav />
      <section
        class="overflow-auto bg-gradient-to-b from-[#1C1C1C] to-[#121212] mt-2 rounded-md"
      >
        <div class="m-8">
          <RouterView />
        </div>
      </section>
    </main>
  </div>
  <MusicPlayer v-if="currentTrack" />
</template>

<style>
#app {
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;

  @apply bg-black font-sans;
}

.media-container {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 240px 1fr;
}

main {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: auto;
}
</style>
