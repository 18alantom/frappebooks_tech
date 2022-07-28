<template>
  <nav class="flex flex-row justify-between my-10 items-center">
    <router-link to="/" class="hover:underline no-a">
      <img
        src="./assets/logo.svg"
        class="border-none rounded-none"
        style="width: 80px"
      />
    </router-link>
    <div class="flex flex-row gap-6 text-sm" style="font-weight: 500">
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
