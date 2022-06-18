<template>
  <nav class="flex flex-row justify-between my-10 items-center">
    <router-link to="/" class="hover:underline no-a">
      <img src="./assets/logo.svg" class="h-5 border-none rounded-none" />
    </router-link>
    <div class="flex flex-row gap-4">
      <l href="https://frappebooks.com/" class="no-a">Home</l>
      <l href="https://t.me/frappebooks" class="no-a">Community</l>
    </div>
  </nav>

  <main style="margin-bottom: 25%">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  computed: {},
};
</script>
