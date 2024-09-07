<script setup lang="ts">
import type { Post } from '../../../../custom-ts/basicInterfaces';

defineProps<({
    posts: Array<Post>
})>()

</script>

<template>
    <form class="form-container">
        <label for="title" />
        <input type="text" placeholder="Enter Title" name="title" required>
        <label for="text" />
        <input type="text" placeholder="Enter Text" name="text" required>
        <div class="button-row">
            <label for="submit" />
            <input type="submit" value="submit" name="submit">
            <label for="cancel" />
            <button name="cancel">Cancel</button>
        </div>
    </form>

</template>

<style scoped>
.form-container {

    height: 80vh;
    width: 40vw;
    position: relative;
    left: 30vw;
    top: 10vh;
    background-image: linear-gradient(to bottom right, #0100EC, #FB36F4);
    border-radius: 5%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    display: flex;
    flex-direction: column;
    row-gap: 5vh;
    justify-content: center;
    align-content: center;
}

.form-container input[type="text"] {
    width: 40%;
    height: 10%;
    background-color: transparent;
    justify-self: center;
    align-self: center;
    color: #ffffff;
}

.form-container input[type="text"]::placeholder {
    color: #ffffff;
    font-family: "cursive";
}

.form-container input[type="text"]:hover {
    cursor: pointer;
}


.button-row {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 2vw;
}

.button-row>input[type="submit"],
.button-row>button[name="cancel"] {
    border-radius: 20%;
    width: 20%;
    height: 20%;
    background-color: transparent;
}

.button-row>button[name="cancel"]:hover {
    background-color: #f44336;
}

.button-row>input[type="submit"]:hover {
    background-color: #31ff57;
}
</style>