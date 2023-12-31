<script setup>
import { ref, watch, onMounted } from "vue";
import Heart from "icons/Heart.vue";
import Play from "icons/Play.vue";
import Pause from "icons/Pause.vue";
import SkipBackward from "icons/SkipBackward.vue";
import SkipForward from "icons/SkipForward.vue";
import VolumeMute from "icons/VolumeMute.vue";
import VolumeHigh from "icons/VolumeHigh.vue";

import ProgressBar from "./ProgressBar.vue";

import { useSongStore } from "../stores/songStore";
import { storeToRefs } from "pinia";

const useSong = useSongStore();
const { isPlaying, audio, currentArtist, currentTrack } = storeToRefs(useSong);

const isTrackTimeCurrent = ref(null);
const isTrackTimeTotal = ref(null);
const range = ref(0);

const vol = ref(80);
const volume = ref(null);

const timeupdate = () => {
  audio.value.addEventListener("timeupdate", () => {
    const minutes = Math.floor(audio.value.currentTime / 60);
    const seconds = Math.floor(audio.value.currentTime - minutes * 60);
    isTrackTimeCurrent.value =
      minutes + ":" + seconds.toString().padStart(2, "0");
    // on the range slide, the per
    const value = (100 / audio.value.duration) * audio.value.currentTime;
    range.value = value;
  });
};

const loadmetadata = () => {
  audio.value.addEventListener("loadedmetadata", () => {
    const duration = audio.value.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTimeTotal.value =
      minutes + ":" + seconds.toString().padStart(2, "0");
  });
};

// when audio change, we need to update the information
watch(
  audio,
  () => {
    if (audio.value?.src) {
      timeupdate();
      loadmetadata();
    }
  },
  { immediate: true, deep: true }
);

// when one song plays to end, we should move to next song
watch(isTrackTimeCurrent, (time) => {
  if (time && time == isTrackTimeTotal.value) {
    useSong.nextSong(currentTrack.value);
  }
});

watch(vol, () => {
  audio.value.volume = vol.value / 100;
});

const jumpToSeekPosition = (position) => {
  const time = audio.value.duration * position;
  audio.value.currentTime = time;
  range.value = (100 / audio.value.duration) * audio.value.currentTime;
};

const seekStart = () => {
  audio.value.pause();
  isPlaying.value = false;
};

const seekEnd = () => {
  audio.value.play();
  isPlaying.value = true;
};
</script>

<template>
  <div
    id="MusicPlayer"
    v-if="audio"
    class="h-[90px] flex items-center justify-between p-2"
  >
    <!-- alumnb information -->
    <div class="flex items-center gap-x-4 w-1/4">
      <img
        class="rounded-md shadow-2xl border-gray-400 border"
        width="55"
        :src="currentArtist.albumCover"
      />
      <div>
        <div class="text-[14px] text-white hover:underline cursor-pointer">
          {{ currentTrack.name }}
        </div>
        <div
          class="text-[11px] text-gray-500 hover:underline hover:text-white cursor-pointer"
        >
          {{ currentArtist.name }}
        </div>
      </div>
      <Heart fillColor="#1BD760" :size="20" />
    </div>
    <!-- player controller -->
    <div class="w-1/2 w-max-[35%] mx-auto">
      <!-- buttons -->
      <div class="flex justify-center">
        <button class="mx-2">
          <SkipBackward
            fillColor="#FFFFFF"
            :size="25"
            @click="useSong.prevSong(currentTrack)"
          />
        </button>
        <button
          class="p-1 rounded-full mx-3 bg-white"
          @click="useSong.playOrPauseSelectSong(currentArtist, currentTrack)"
        >
          <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
          <Pause v-else fillColor="#181818" :size="25" />
        </button>
        <button class="mx-2">
          <SkipForward
            fillColor="#FFFFFF"
            :size="25"
            @click="useSong.nextSong(currentTrack)"
          />
        </button>
      </div>
      <!-- seeker -->
      <div class="flex items-center gap-x-2 h-[30px]">
        <div v-if="isTrackTimeCurrent" class="text-white text-[12px] pr-2">
          {{ isTrackTimeCurrent }}
        </div>
        <ProgressBar
          :progressValue="range"
          @update:progressValue="(newValue) => (range = newValue)"
          @seek="jumpToSeekPosition"
          @dragStart="seekStart"
          @dragEnd="seekEnd"
          class="w-full relative mb-4"
        />
        <div v-if="isTrackTimeTotal" class="text-white text-[12px] pl-2">
          {{ isTrackTimeTotal }}
        </div>
      </div>
    </div>
    <!-- volumn controller -->
    <div class="w-1/4 flex items-center justify-end pr-2 gap-x-2">
      <VolumeMute v-if="vol == 0" fillColor="#FFFFFF" :size="20" />
      <VolumeHigh v-else fillColor="#FFFFFF" :size="20" />
      <ProgressBar
        :progressValue="vol"
        @update:progressValue="(newValue) => (vol = newValue)"
        class="w-[150px] relative mb-4"
      />
    </div>
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
