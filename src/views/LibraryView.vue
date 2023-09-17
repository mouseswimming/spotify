<script setup>
import artist from "../data/artistMock.json";
import SongRow from "../components/SongRow.vue";
// icons needed
import Play from "icons/Play.vue";
import Pause from "icons/Pause.vue";
import DotsHorizontal from "icons/DotsHorizontal.vue";
import Heart from "icons/Heart.vue";
import ClockTimeThreeOutline from "icons/ClockTimeThreeOutline.vue";

import { useSongStore } from "../stores/songStore";
import { storeToRefs } from "pinia";

const useSong = useSongStore();
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong);

const tracks = artist.tracks;

const playTrack = () => {
  if (currentTrack.value) {
    useSong.playOrPauseSelectSong(currentArtist.value, currentTrack.value);
    return;
  }
  useSong.playFromFirst();
};
</script>

<template>
  <!-- album infor -->
  <div class="flex gap-x-6 mb-6">
    <img width="140" :src="artist.albumCover" />
    <div class="grid place-content-between">
      <h2
        class="text-white text-4xl font-semibold hover:underline cursor-pointer"
      >
        {{ artist.name }}
      </h2>
      <div class="text-gray-300 text-sm flex gap-x-4">
        <span>Album</span>
        <span>{{ artist.releaseYear }}</span>
        <span>{{ artist.tracks.length }} songs</span>
      </div>
      <div class="flex gap-x-4">
        <button class="p-1 rounded-full bg-white" @click="playTrack()">
          <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
          <Pause v-else fillColor="#181818" :size="25" />
        </button>
        <button type="button">
          <Heart fillColor="#1BD760" :size="30" />
        </button>
        <button type="button">
          <DotsHorizontal fillColor="#FFFFFF" :size="25" />
        </button>
      </div>
    </div>
  </div>
  <!-- tracks head -->
  <div
    class="flex items-center justify-between px-5 text-gray-400 py-2 border-b border-b-[#2A2A2A] mb-4"
  >
    <div class="flex items-center">
      <div class="mr-7 w-[25px]">#</div>
      <div class="text-sm">Title</div>
    </div>
    <div class="w-8"><ClockTimeThreeOutline :size="18" /></div>
  </div>
  <!-- tracker details -->
  <ul class="w-full" v-for="(track, index) in tracks" :key="track.id">
    <SongRow :artist="artist" :track="track" :index="++index" />
  </ul>
</template>
