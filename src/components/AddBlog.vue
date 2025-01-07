<template>
  <div>
    <h1>Add a New Blog</h1>
    <form @submit.prevent="submitBlog">
      <div>
        <label for="title">Blog Title</label>
        <input id="title" v-model="title" type="text" required />
      </div>
      <div>
        <label for="content">Blog Body</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <div>
        <label for="user">User ID</label>
        <input id="title" v-model="user" type="text" required />
      </div>
      <!-- <div>
        <label for="imageId">Image ID</label>
        <input id="imageId" v-model="imageId" type="text" required />
      </div> -->
      <button type="submit">Add Blog</button>
    </form>
    <router-link to="/">← Back to Blog List</router-link>
  </div>
</template>

<script>
import { useBlogsStore } from '@/stores/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const blogStore = useBlogsStore();
    const router = useRouter();

    // Form state
    const title = ref('');
    const content = ref('');
    const user = ref('')

    const submitBlog = async () => {
      const newBlog = {
        id: blogStore.blogs.length+1, // Generate a unique ID
        title: title.value,
        body: content.value,
        user: user.value,
      };

      // Add the new blog to the store and update the JSON file
      await blogStore.addBlogToPosts(newBlog);

      // Redirect to the home page
      router.push('/');
    };

    return {
      title,
      content,
      user,
      submitBlog,
    };
  },
};
</script>


<style scoped>
/* Add any styling for your form */
form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
<!-- <style>
form {
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 1rem;
}
</style> -->

<!--
<script>
import { useBlogsStore } from '@/stores/posts';


export default {
  setup() {
    const blogStore = useBlogsStore();

    // Form state
    const title = ref('');
    const content = ref('');
    const imageId = ref('');

    const submitBlog = async () => {
      const newBlog = {
        id: Date.now(), // Generate a unique ID
        title: title.value,
        content: content.value,
        imageId: imageId.value,
      };

      // Add the new blog to the store and update the JSON file
      await blogStore.addBlog(newBlog);

      // Redirect to the home page
      router.push('/');
    };

    return {
      title,
      content,
      imageId,
      submitBlog,
    };
  },
};
</script>

<style>
form {
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 1rem;
}
</style> -->