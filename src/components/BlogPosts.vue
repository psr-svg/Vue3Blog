<template>
    <div>
        <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search blogs..." />
        </div>
        <ul v-if="blogs.length > 0">
            <li v-for="blog in blogs" :key="blog.id" class="blog-list">
                <!--add link to blog page on the title-->
                <router-link :to="`/blog/${blog.id}`" class="blog-title">
                    {{ blog.title }}
                </router-link>
                <!--img-->
                <img
                src="https://cataas.com/cat?type=medium&position=center&width=400" alt="Blog Cataas*
                Image"
                class="blog-image">
                <p class="author-name">Author:{{ getAuthorName(blog.userId) }}</p>
                <div class="content">
                  {{ blog.body.substring(0, 100) }}...
                </div>
            </li>
        </ul>
        <p v-else>Error: No blogs Found </p>
        <!-- Pagination (if applicable) -->
        <div v-if="totalPages > 1" class="pagination">
            <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }"
                @click="setPage(page)">
                {{ page }}
            </button>
        </div>
    </div>
    <!-- Blogs to be displayed with pagination-->
</template>

<script>

import { computed, onMounted } from 'vue';
import {useBlogsStore} from '../stores/posts';
import { AuthorStore } from '@/stores/authors';


export default {
  setup() {
    const blogStore = useBlogsStore();
    const authorStore = AuthorStore();

    const blogs = computed(() => blogStore.paginatedBlogs)
    const totalPages = computed(() => blogStore.totalPages);
    const currentPage = computed(() => blogStore.currentPage);

    const searchQuery = computed({
      get: () => blogStore.searchQuery,
      set: (value) => { blogStore.setSearchQuery(value) },
    });

    const setPage = (page) => {
      blogStore.setCurrentPage(page);
    };

    const getAuthorName = (id) => {
      return authorStore.getAuthorNameById(id);
    };

    onMounted(() => {
      authorStore.getAuthors(); // Fetch authors when component mounts
    });


    return {
      blogs,
      searchQuery,
      totalPages,
      currentPage,
      setPage,
      getAuthorName,
    }
  },
};
</script>

<style>
.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.search-bar input {
  flex: 1;
  padding: 8px;
}

.search-bar button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.pagination {
  display: flex;
  gap: 4px;
  margin-top: 16px;
}

.pagination button {
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
}

.pagination button.active {
  font-weight: bold;
  background-color: #007bff;
  color: white;
}

.pagination button:hover:not(.active) {
  background-color: #e0e0e0;
}
.blog-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.blog-title {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}
.blog-title:hover {
  text-decoration: underline;
}

.blog-list{
  list-style: none; /* Removes bullet points */
  padding: 0;
  margin: 0;
}
.author-name {
  font-style: italic;
  font-weight: bold;
}
</style>