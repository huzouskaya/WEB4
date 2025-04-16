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
    color: #ffa3dd;
    margin-top: 10px;
    box-shadow: 0 8px 16px 0 rgba(242, 66, 255, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    border: none;
    border-radius: 10px;
    background: linear-gradient(0deg, rgb(254, 104, 216) 0%, rgb(248, 44, 143) 80%);
    padding: 10px 25px;
    font-family: 'Tiny5', sans-serif;
    font-size: 26px;
    font-weight: 700;
}
.btn:hover {
    background: linear-gradient(0deg, rgb(248, 146, 222) 0%, rgb(248, 98, 170) 80%);
    color: #facdea;
    
}

.btn:focus {
    outline: none;
}
</style>