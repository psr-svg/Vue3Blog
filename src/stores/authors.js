import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePostsStore } from './posts'
import { authors } from '../assets/users.json'

export const useAuthorStore = defineStore('authorStore', {
  state: () => ({
    authors: [],
    author: null
  }),
  getters: {
    getAuthors: (state) => {
        this.authors = authors;
    }
  },
  actions: {
    getAuthors(){
        //TODO
    }
  }



})
