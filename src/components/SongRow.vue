<script setup>
import { computed, onMounted, ref, toRefs } from "vue";

import Heart from "vue-material-design-icons/Heart.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";

import { useSongStore } from "../stores/songStore";
import { storeToRefs } from "pinia";

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);

const props = defineProps({
  track: Object,
  artist: Object,
  index: Number,
});

const { track, artist, index } = toRefs(props);
const isHover = ref(false);
const isTrackTime = ref("N/A");

const isCurrentTrack = computed(() => {
  return (
    currentTrack.value !== null && currentTrack.value.name === track.value.name
  );
});

onMounted(() => {
  // only get the duration meta when it does not exist
  const audio = new Audio(track.value.path);
  audio.addEventListener("loadedmetadata", () => {
    const duration = audio.duration;
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);

    isTrackTime.value = min + ":" + sec.toString().padStart(2, "0");
  });
});
</script>

<template>
  <li
    class="flex items-center justify-between px-5 py-2 rounded-md hover:bg-[#2A2929]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex items-center">
      <!-- # column -->
      <div class="mr-7 w-[25px]">
        <div v-if="isHover" class="cursor-pointer -ml-1">
          <Play
            v-if="!isPlaying"
            fillColor="#FFFFFF"
            :size="25"
            @click="useSong.playOrPauseSelectSong(artist, track)"
          />
          <Play
            v-else-if="isPlaying && currentTrack.name !== track.name"
            fillColor="#FFFFFF"
            :size="25"
            @click="useSong.loadSong(artist, track)"
          />
          <Pause
            v-else
            fillColor="#FFFFFF"
            :size="25"
            @click="useSong.playOrPauseSong()"
          />
        </div>
        <div v-else>
          <!-- not hover, how index number. text in green when the track is current track -->
          <span v-if="isPlaying && currentTrack.name === track.name">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <rect
                class="eq-bar eq-bar--1"
                x="4"
                y="4"
                width="3.7"
                height="8"
              />
              <rect
                class="eq-bar eq-bar--2"
                x="10.2"
                y="4"
                width="3.7"
                height="16"
              />
              <rect
                class="eq-bar eq-bar--3"
                x="16.3"
                y="4"
                width="3.7"
                height="11"
              />
            </svg>
          </span>
          <span
            v-else
            :class="[
              isCurrentTrack ? 'text-green-500' : 'text-gray-200',
              index < 10 ? 'pl-[4px]' : '',
            ]"
          >
            {{ index }}
          </span>
        </div>
      </div>

      <!-- title column: track and artist name -->
      <div>
        <div :class="[isCurrentTrack ? 'text-green-500' : 'text-gray-200']">
          {{ track.name }}
        </div>
        <div class="text-sm font-semibold text-gray-400">{{ artist.name }}</div>
      </div>
    </div>
    <div class="flex items-center">
      <!-- heart button -->
      <button type="button" v-if="isHover">
        <Heart fillColor="#1BD760" :size="22" />
      </button>
      <!-- track duration -->
      <div class="text-xs ml-5 text-gray-400 w-8">
        {{ isTrackTime }}
      </div>
    </div>
  </li>
</template>

<style lang="css" scoped>
.eq-bar {
  transform: scale(1, -1) translate(0, -24px);
  fill: #1bd760;
}

.eq-bar--1 {
  animation-name: short-eq;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

.eq-bar--1 {
  animation-name: short-eq;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

.eq-bar--2 {
  animation-name: tall-eq;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-delay: 0.17s;
}

.eq-bar--3 {
  animation-name: short-eq;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-delay: 0.34s;
}

@keyframes short-eq {
  0% {
    height: 8px;
  }

  50% {
    height: 4px;
  }

  100% {
    height: 8px;
  }
}

@keyframes tall-eq {
  0% {
    height: 16px;
  }

  50% {
    height: 6px;
  }

  100% {
    height: 16px;
  }
}
</style>
