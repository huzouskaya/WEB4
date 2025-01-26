<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Tiny5&display=swap');

.btn {
    background: none;
    font-size: 20px;
    color: #1d0072;
    margin-top: 10px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    border: none;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(252,0,255,1) 0%, rgba(21,0,255,1) 100%);;
    padding: 10px 25px;
    font-family: 'Tiny5', sans-serif;
    font-size: 26px;
    font-weight: 700;
}
.btn:hover {
    background: linear-gradient(0deg, rgb(251, 31, 255) 0%, rgb(71, 55, 248) 100%);
    color: #27009b;
    
}

.btn:focus {
    outline: none;
}
</style>