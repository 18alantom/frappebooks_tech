import { createApp } from 'vue';
import App from './App.vue';
import CodeBlock from './components/CodeBlock.vue';
import Dialog from './components/Dialog.vue';
import Link from './components/Link.vue';
import PostFoot from './components/PostFoot.vue';
import PostHead from './components/PostHead.vue';
import './index.css';
import { router } from './router';

const app = createApp(App);
app.component('post-head', PostHead);
app.component('post-foot', PostFoot);
app.component('di', Dialog);
app.component('l', Link);
app.component('codeblock', CodeBlock);
app.use(router).mount('#app');
