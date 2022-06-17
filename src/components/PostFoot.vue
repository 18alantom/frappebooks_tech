<template>
  <hr />
  <footer class="w-full flex justify-center">
    <button
      class="bg-blue-50 text-blue-frappe btn"
      @click="toTheTop"
    >
      to the top
    </button>
  </footer>
</template>
<script>
export default {
  methods: {
    toTheTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
