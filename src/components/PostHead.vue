<template>
  <header class="mb-5">
    <h1 class="font-semibold text-4xl text-justify mb-5 text-gray-800">
      <slot></slot>
    </h1>

    <p class="text-sm">
      <l
        class="font-semibold no-a hover:underline"
        :href="href"
        rel="noreferrer nofollow noopener"
        target="_blank"
        >{{ author }}</l
      >
      <span> · </span>
      <span class="">{{ postingDate }}</span>
    </p>
  </header>
</template>
<script>
import { authorUrls, formatDate } from '../helpers';

export default {
  props: {
    date: String,
    author: String,
  },
  computed: {
    postingDate(){
      return formatDate(this.date)
    },
    href() {
      return authorUrls[this.author];
    },
  },
};
</script>
