<template>
  <div
    class="w-full bg-slate-700 rounded-lg p-2 mb-5 border-2 border-slate-400"
  >
    <code
      ref="code"
      class="text-blue-100 bg-inherit whitespace-pre-wrap"
    >
      <slot></slot>
    </code>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default {
  mounted() {
    hljs.highlightElement(this.$refs.code);
  },
};
</script>

<style>
.class_ {
  @apply text-pink-400;
}

.function_ {
  @apply text-pink-400;
}

.hljs-keyword {
  @apply text-pink-500;
}

.hljs-comment {
  @apply text-gray-400;
}

.hljs-string {
  @apply text-blue-200;
}

.hljs-subst {
  @apply text-pink-300;
}
</style>
