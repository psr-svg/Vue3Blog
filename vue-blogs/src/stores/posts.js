import { defineStore } from 'pinia'
import postsJson from './../assets/posts.json'

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        allPosts: [],
        post: null,
        search: ''
    }),

    getters: {
        searchedPosts(state){
            // TODO
        }
    },
    actions: {
        getAllPosts(){ //Get all posts

            this.posts = postsJson;
        },

        getPost(id){
            const postHolder = null;
            if(Object.is(this.posts, null)){
                getAllPosts();
            }
            else{
                this.posts.forEach(post => {
                    if(post.id == id){
                        postHolder = post;
                    }
                });
                if(Object.is(postHolder, null)){
                    console.log("Unable to find the BlogPost with Id");
                }
            }
        },

        addBlogToPosts(UId, BId, Title, Body){
            if(Object.is(this.posts, null)){
                getAllPosts();
            }
            else{
                this.posts.value.push({
                    uid: UId,
                    id: BId,
                    title: Title,
                    body: Body
                });
            }
        }
    }
})