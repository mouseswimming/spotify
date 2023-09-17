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
        class="overflow-auto bg-gradient-to-b from-[#1C1C1C] to-[#121212] mt-2 rounded-md view-container"
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

.view-container {
  margin-right: 5px;
}

@media (hover: hover) {
  .view-container::-webkit-scrollbar {
    background-color: transparent;
    width: 8px;
  }

  .view-container:hover {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
