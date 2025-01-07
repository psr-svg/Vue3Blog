<template>
    <div v-if="blog">
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else>
            <slot :blog="blog">
                <h2>{{ blog.title }}</h2>
                <img :src="`https://cataas.com/cat?type=medium&position=center&width=400`" alt="Blog Cataas
                    Image" class="blog-image">
                <p> {{ blog.body }}</p>
            </slot>
            <router-link to="/">back</router-link>
        </div>
        <!-- Comments Section -->
        <div v-if="!isLoading && comments.length > 0" class="comments">
            <h3>Comments:</h3>
            <ul>
                <li v-for="comment in comments" :key="comment.id" class="comment-item">
                    <p><strong>{{ comment.name }}</strong> ({{ comment.email }})</p>
                    <p>{{ comment.body }}</p>
                </li>
            </ul>
        </div>
        <p v-else>No comments yet.</p>
    </div>
    <p v-else>Error : Not found</p>
</template>

<script>

import { computed, onMounted, ref } from 'vue';
import { useBlogsStore } from '@/stores/posts';
import { useCommentsStore } from '@/stores/comments';

export default {
    props: ['id'],
    setup(props) {

        //const blog = ref({});
        const isLoading = ref(true);
        const blogStore = useBlogsStore();

        const commentsStore = useCommentsStore();

        const fetchBlogAndComments = async () => {
            try {
                blogStore.getBlog(props.id); // Find the blog by ID

                // Fetch comments if they haven't been fetched already
                if (commentsStore.comments.length === 0) {
                    await commentsStore.fetchComments();
                }
            } catch (error) {
                console.error("Error fetching blog or comments:", error);
            }finally {
                isLoading.value = false;
            }
        };

        const blog = computed(() => blogStore.blog);
        const comments = computed(() => {
            return commentsStore.getCommentsByPostId(props.id);
        });

        onMounted(() => {
            fetchBlogAndComments();
        });

        return {
            blog,
            comments,
            isLoading,
        };
    }
}
</script>

<style>
.blog-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>