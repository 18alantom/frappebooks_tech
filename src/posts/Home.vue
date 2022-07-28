<template>
  <h6 class="font-bold text-4xl mb-10 text-gray-600">
    A simple blog that documents the development of
    <span class="text-blue-frappe">Frappe</span>{{ ' ' }}
    <span class="text-gray-books">Books</span>.
  </h6>

  <section>
    <router-link v-for="p in posts" :to="p.path" class="mb-10 block no-a">
      <div>
        <h2 class="text-2xl font-semibold mb-2 text-gray-800">{{ p.title }}</h2>
        <p class="text-sm mb-2">
          <span class="font-semibold">{{ p.author }}</span>
          <span> · </span>
          <span class="font-light">{{ p.date }}</span>
        </p>
        <p class="font-light">{{ p.first }}</p>
      </div>
    </router-link>
  </section>
</template>
<script>
import posts from '.';
import { formatDate, trim } from '../helpers';
export default {
  computed: {
    posts() {
      return posts.map(({ path, title, author, date, first }) => ({
        path,
        title,
        author,
        date: formatDate(date),
        first: trim(first),
      }));
    },
  },
};
</script>
