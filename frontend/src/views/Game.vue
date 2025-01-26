<template>
    <div class="bg">
        <div class="game" v-if="counter !== 0">
            <div class="timer">
                Осталось: {{ counter }}
            </div>
            <div class="score-info">
                Ваш счет: {{ currScore }}
            </div>
            <div class="objects">
                <img src="../assets/log.png" class="bounty-rune" v-if="isLeftLog">
                <div style="width: 170.66px; height: 200px;" v-else>
                </div>
                <div style="display: flex; justify-content: center;">
                    <img src="../assets/beaverLeft.png" v-if="isLeftBeaver" class="beaver-img">
                    <img src="../assets/beaverRight.png" v-else class="beaver-img">
                </div>
                <img src="../assets/log.png" class="bounty-rune" v-if="isRightLog">
                <div style="width: 170.66px; height: 200px;" v-else>
                </div>
            </div>
            <div class="btn">
                <game-button @click="toLeftBeaver" style="width: 200px">
                    Влево
                </game-button>
                <game-button @click="toRightBeaver" style="width: 200px">
                    Вправо
                </game-button>
            </div>
        </div>
        <div style="height: 100vh; display: flex; align-items: center;" v-else>
            <div class="game-over">
                <div> 
                    Ваш результат: {{currScore}}
                </div>
                <router-link to="/" style="width: 300px; display: flex; justify-content: center; align-items: center;">
                    <game-button>
                        Назад
                    </game-button>
                </router-link>
            </div>
        </div>
        <img src="../assets/bg1.png" class="logs-img" v-if="currScore >= 2 && currScore < 4 && counter">
        <img src="../assets/bg2.png" class="logs-img" v-if="currScore >= 4 && currScore < 6 && counter">
        <img src="../assets/bg3.png" class="logs-img" v-if="currScore >= 6 && currScore < 8 && counter">
        <img src="../assets/bg4.png" class="logs-img" v-if="currScore >= 8 && currScore < 10 && counter">
        <img src="../assets/bg5.png" class="logs-img" v-if="currScore >= 10 && currScore < 12 && counter">
        <img src="../assets/bg6.png" class="logs-img" v-if="currScore >= 12 && currScore < 14 && counter">
        <img src="../assets/bg7.png" class="logs-img" v-if="currScore >= 14 && currScore < 16 && counter">
        <img src="../assets/bg8.png" class="logs-img" v-if="currScore >= 16 && currScore < 18 && counter">
        <img src="../assets/bg9.png" class="logs-img" v-if="currScore >= 18 && currScore < 20 && counter">
        <img src="../assets/bg10.png" class="logs-img" v-if="currScore >= 20 && currScore < 22 && counter">
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import GameButton from "../components/GameButton.vue";

export default defineComponent({
    components: {
        GameButton
    },

    
})
</script>

<style lang="css" scoped>
.objects {
    display: flex;
    justify-content: space-evenly;
    width: 70%;
}

.game-over {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2f1e1e;
    background-color: #b8cece;
    border-radius: 5px;
    font-size: 26px;
    padding: 40px;
    font-weight: 700;
}

.bounty-rune {
    width: 20%;
}

.btn {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    margin-top: 30px;
}

.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    z-index: 2;
    position: relative;
}

a {
    text-decoration: none;
}

.beaver-img {
    width: 50%;
}

.bg {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.logs-img {
    width: 96%;
    z-index: 1;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scale(1.08, 1);
}

.header {
    background-color: #060223;
    font-size: 30px;
    text-align: center;
    padding: 20px;
    color: #7f9e9f;
    font-weight: 700;
    z-index: 2;
}

.timer {
    font-size: 26px;
    padding: 30px;
    font-weight: 700;
}

.score-info {
    font-size: 22px;
    font-size: 26px;
    margin-bottom: 60px;
    font-weight: 700;
}
</style>
