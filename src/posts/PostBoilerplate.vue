<template>
  <post-head :date="date" :author="author">{{ title }}</post-head>
  <p>{{ first }}</p>
  <!-- Add content below -->
</template>

<script>
export default {
  data() {
    return {
      path: '',
      title: '',
      author: '',
      date: '',
      first: `
      `,
    };
  },
};
</script>
