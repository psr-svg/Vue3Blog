import { setActivePinia, createPinia } from "pinia";
import { useBlogsStore } from "../../src/stores/posts";
import {expect, jest, test} from '@jest/globals';

describe('blogStore', () => {
    beforeEach(()=> {
        setActivePinia(createPinia());
    });

    it('the initial states are correct', ()=> {
        const store = useBlogsStore();

        expect(store.blogs).toEqual([]);
        expect(store.blog).toEqual({});
        expect(store.currentPage).toEqual(1);
        expect(store.blogsPerPage).toEqual(5);
        expect(store.searchQuery).toEqual('');
    });

    it('fetches the blogs from json to store in the state', async ()=> {
        const store = useBlogsStore();

        global.fetch = jest.fn(()=>
            Promise.resolve({
                jsonResponse: () =>
                    Promise.resolve([
                        {
                            "userId": 1,
                            "id": 1,
                            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                        },
                    ]),
            })
        );
        await store.loadBlogs();

        expect(fetch).toHaveBeenCalledWith('/src/assets/posts.json');
        expect(store.blogs).toEqual([
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
        ]);
    });

    //searchText
    store.searchText='sunt';
    const filteredBlogs = store.filteredBlogs;
    expect(filteredBlogs).toEqual([
        {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
    ]);

    it('add new Blog to Store', ()=>{
        const store = useBlogsStore();

        store.blogs = [{
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }];

        const testBlog = {"userId": 2,
            "id": 2,
            "title": "Jest Test to be added",
            "body": "This here is a test blog to be added"}
        store.addBlogToPosts(testBlog);

        expect(store.blogs).toContainEqual(testBlog);
    });
});