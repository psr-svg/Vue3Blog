import { defineStore } from 'pinia';

export const useBlogsStore = defineStore('blogsStore', {
    state: () => ({
        blogs: [],
        blog: null,
        currentPage: 1,
        blogsPerPage: 10,
        searchQuery: '',
      }),

    getters: {
        filteredBlogs: (state) => {
          return state.blogs.filter((blog) =>
            blog.title.toLowerCase().includes(state.searchQuery.toLowerCase())
          );
        },
        paginatedBlogs: (state) => {
          const start = (state.currentPage - 1) * state.blogsPerPage;
          const end = start + state.blogsPerPage;
          return state.filteredBlogs.slice(start, end);
        },
        totalPages: (state) => Math.ceil(state.filteredBlogs.length / state.blogsPerPage),
      },
    actions: {
        async loadBlogs() {
            try {
                // Load blogs from local JSON file
                const jsonResponse = await fetch('/src/assets/posts.json'); // Adjust the path if necessary
                this.blogs = await jsonResponse.json();
            } catch (error) {
                console.error('Error loading blogs:', error);
            }
        },

        getBlog(blogId) {
            const blog = this.blogs.find((blog) => blog.id == blogId);
            if (blog) {
                this.blog = blog;
            }
        },

        setCurrentPage(page) {
            this.currentPage = page;
        },

        setSearchQuery(query) {
            this.searchQuery = query;
            this.currentPage = 1; // Reset to the first page on search
          },

        async addBlogToPosts(newBlog){
            try {
                this.blogs.push(newBlog);
              } catch (error) {
                console.error(error.message);
              }
        }
    }
})