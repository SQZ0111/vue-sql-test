<script setup lang="ts">
import BlogPost from '../parts/BlogPost.vue';
import type { Ref } from 'vue';
import type { Post } from '../../../../custom-ts/basicInterfaces';


defineProps<({
    posts: Array<Post>,
    currentComponent: Ref<string>
})>()
const emit = defineEmits(['changeComponent']);
function handleBlogClicked (elementClicked: Ref<boolean>): void {
    elementClicked.value = !elementClicked.value;
}

</script>

<template>
    <div class="app-container">
        <main>
            <BlogPost v-for="post in posts" :key="post.id" :title="post.title" :text="post.text"
                      @blog-clicked="handleBlogClicked">
                <template #button-icon>
                    🗣️
                </template>
            </BlogPost>
        </main>
        <aside>
            <button @click="emit('changeComponent', 'BlogForm')" class="button-icon">Add Blog</button>
        </aside>
    </div>
</template>

<style scoped>
.app-container {
    height: 100vh;
    width: 100vw;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: start;
    /* Change to justify-content for flex container */
}

main {
    height: 100%;
    width: 75%;
    /* Adjust width to make room for the aside element */
    display: flex;
    flex-direction: column;
    row-gap: 5vh;
    overflow-y: scroll;
    align-items: flex-start;
}

aside {
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Set width to occupy remaining space */
}

.button-icon {
    height: 10%;
    width: 20%;
    background-color: transparent;
    border-radius: 20%;
    font-size: clamp(8px, 1vw, 16px);

}

@media screen and (max-width: 768px) {
    main {
        width: 100%;
        height: 100%;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    aside {
        height: 50px;
        width: 50px;
        z-index: 1;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    aside {
        justify-content: center;
    }

    aside>.button-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
}



.button-icon:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
</style>
