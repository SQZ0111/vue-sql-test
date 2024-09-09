<script setup lang="ts">
import { ref, reactive, onMounted, } from 'vue';
import type { Component, Ref } from 'vue';
import Home from './components/icons/pages/pages/Home.vue';
import BlogForm from './components/icons/pages/pages/BlogForm.vue';
import type { Post } from './custom-ts/basicInterfaces';
import axios, { type AxiosRequestConfig } from "axios";
const components: Record<string, Component> = {
  Home,
  BlogForm,
};

const currentComponent = ref("Home");
function changeComponent (newComponent: string): void {
  currentComponent.value = newComponent;
}
let id: Ref<number> = ref(0);
const posts = ref<Post[]>([]);
async function loadBlogs () {
  const config: AxiosRequestConfig<string> = {
    url: ("http://localhost:3003/blogs"),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
  }
  try {
    const response = await axios(config);
    console.log("fetched blogs");
    posts.value = response.data;

  } catch (e: any) {
    console.log(e);
  }
}
onMounted(() => {
  loadBlogs();
})

</script>

<template>
  <component :is="components[currentComponent]" :currentComponent="currentComponent" :posts="posts"
             @changeComponent="changeComponent">
  </component>
</template>
