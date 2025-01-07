import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const AuthorStore = defineStore('authorStore', {
  state: () => ({
    authors: [],
    author: null,
  }),

  actions: {
    async getAuthors() {
      try {
        const jsonResponse = await fetch('/src/assets/users.json');
        this.authors = await jsonResponse.json();
      } catch (error) {
        console.error('Error loading users:', error);
      }
    },
  },
  getters: {
    getAuthorNameById: (state) => (id) => {
      const author = state.authors.find((author) => author.id === id);
      return author ? author.name : 'Unknown Author';
    },
  },

})
