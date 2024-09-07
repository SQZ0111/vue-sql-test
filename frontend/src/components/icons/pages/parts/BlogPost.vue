<script setup lang="ts">
import { ref, computed } from 'vue';

defineProps<({
    title: String,
    text: String,
})>();

const emit = defineEmits(["blog-clicked"]);
const elementClicked = ref(false);
const normalPostSize = {
    height: "30%",
    width: "50%",
    opacity: "0.8"
}
const enlargedPostSize = {
    height: "80%",
    width: "80%",
    zIndex: "1",
    opacity: "1"
}
const postSize: Object = computed(() => {
    return elementClicked.value ? enlargedPostSize : normalPostSize
});

function handleBlogEnlargeClick (): void {
    emit("blog-clicked", elementClicked);
}
</script>

<template>
    <div class="blog-container" :style="postSize" @click="handleBlogEnlargeClick"
         @touchstart.passive="handleBlogEnlargeClick" @touchend="handleBlogEnlargeClick">
        <div class="title-section">
            <h4>{{ title }}</h4>
            <button class="button-icon">
                <slot name="button-icon"></slot>
            </button>
        </div>
        <div class="text-section">
            {{ text }}
        </div>
    </div>
</template>

<style scoped>
.blog-container {
    background-color: beige;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    display: flex;
    align-self: center;
    flex-direction: column;
}

.title-section {
    display: grid;
    width: 100%;
    height: 30%;
    grid-template-columns: 90% 10%;
    text-align: center;

}

.text-section {
    height: 30vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    overflow-y: auto;
    scroll-behavior: smooth;
}

.button-icon {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 20%;

}

.button-icon:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

@media screen and (max-width: 768px) {

    .title-section {
        grid-template-columns: 70% 30%;
        text-align: center;
    }

    .button-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }


}
</style>