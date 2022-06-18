import { createRouter, createWebHistory } from 'vue-router';
import posts from './posts';
import Home from './posts/Home.vue';

const routes = posts.map(({ component, path }) => ({ component, path }));
routes.push({
  path: '/',
  component: Home,
});
const history = createWebHistory();

export const router = createRouter({ routes, history });
