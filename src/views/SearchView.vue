<script setup>
import CategoryCard from "../components/CategoryCard.vue";
import SearchMock from "../data/SearchMock.json";

const categories = SearchMock.categories;
</script>

<template>
  <h3
    class="text-white text-2xl font-semibold hover:underline cursor-pointer mb-6"
  >
    Browser all
  </h3>

  <section class="grid-container">
    <div class="mt-2 grid-items">
      <CategoryCard
        v-for="(category, index) in categories"
        :key="index"
        :image="category.cover"
        :name="category.name"
      />
    </div>
  </section>
</template>
