<script setup>
import HomeCard from "../components/HomeCard.vue";

import homeMock from "../data/homeMock.json";
const collections = homeMock.collections;
</script>

<template>
  <section
    v-for="collection in collections"
    :key="collection.title"
    class="mb-4 grid-container"
  >
    <h3
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      {{ collection.title }}
    </h3>
    <div class="mt-2 grid-items no-wrap-grid">
      <HomeCard
        v-for="(card, index) in collection.tracks"
        :key="`${card.title - index}`"
        :image="card.cover"
        :title="card.title"
        :description="card.description"
      />
    </div>
  </section>
</template>

<style scoped></style>
