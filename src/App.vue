<script>
import { onMounted } from 'vue';
import { useBlogsStore } from './stores/posts';
import BlogPosts from './components/BlogPosts.vue';
import NavBar from './components/NavBar.vue';
import { AuthorStore } from './stores/authors';

export default {
  components: {
    BlogPosts,
    NavBar,
    AuthorStore
  },
  setup() {
    const blogStore = useBlogsStore();

    onMounted(() => {
      blogStore.loadBlogs();
    });

    return {};
  },
};

</script>

<template>
  <div class="app">
    <NavBar />
    <RouterView />
  </div>
</template>


<style>

.app {
  align-content: center;
}
</style>