import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommentsStore = defineStore('comments', () => {
    // state
    const comments = ref([]);
    const isLoading = ref(false);

  // Action to fetch comments from the JSON file or API
  const fetchComments = async () => {
    this.isLoading.value = true;
    try {
      const response = await fetch('/src/assets/comments.json'); // Replace with your API or JSON file URL
      const data = await response.json();
      comments.value = data; // Store the fetched comments in state
    } catch (error) {
      console.error('Error fetching comments:', error);
    }finally {
        this.isLoading.value = false;
    }
  };

  // Getter to filter comments by postID (to get comments for a specific blog)
  const getCommentsByPostId = (postId) => {
    return comments.value.filter((comment) => comment.postId === postId);
  };

  // Return state, getters, and actions
  return {
    comments,
    fetchComments,
    getCommentsByPostId,
    isLoading,
  };
});