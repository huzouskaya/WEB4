<template>
    <div class="menu">
        <div class="header">
            <img src="../assets/logo.png" class="logo">
        </div>
        <div class="buttons">
            <router-link to="/game">
                <game-button class="btns">
                    PLAY
                </game-button>
            </router-link>
            <router-link to="/leaderboard">
                <game-button class="btns">
                    LEADERBOARD
                </game-button>
            </router-link>
            <div v-if="!isAuth">
                <router-link to="/login">
                    <game-button class="btns">
                        SIGN IN
                    </game-button>
                </router-link>
            </div>
            <div v-if="!isAuth">
                <router-link to="/register">
                    <game-button class="btns">
                        SIGN UP
                    </game-button>
                </router-link>
            </div>
            <div class="exit">
                <game-button class="btns" @click="handleExit">
                    QUIT
                </game-button>
            </div>
        </div>
    </div>
    <router-view>
    </router-view>
  </template>
  
<script lang="ts">
import { defineComponent, PropType } from "vue"
import GameButton from "../components/GameButton.vue"
export default defineComponent({
    components: {
        GameButton
    },
    data() {
        let isAuth = false 
        return {       
            isAuth
        };
    },
    async mounted() {
        this.checkAuth()
    },

    methods: {
        async handleExit() {
            window.close();
        },
        async checkAuth() {
        if (localStorage.getItem('token'))
        this.isAuth = true
        }
    }
})
</script>
  
<style lang="css" scoped>
.menu {
    display: flex;
    flex-direction: column;
}
.leftSide {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.about {
    height: 45vh;
}

.game-route {
    height: 55vh;
    align-self: flex-start;
}

.buttons {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.exit {
    position: absolute;
    bottom: 2em;
}

.btns {
    width: 8.5em;
    font-size: 5cqmin;
    margin-bottom: 0.5em;
}

.header {
    font-size: 30px;
    text-align: center;
    padding: 20px 20px 5px 20px;
    color: #7f9e9f;
    font-weight: 700;
}

.logo {
    width: 30vw;
    height: auto;
}

.exit .btns {
    width:100%;
    background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(95, 0, 102) 100%);
    border-color: transparent;
    color:rgb(250, 67, 229);
    padding: 0px -10px;
}

.exit .btns:hover {
    background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(138, 1, 148) 100%);
    border-color: transparent;
    color:rgb(247, 105, 240);
    padding: 0px -10px;
}

.exit {
    right: 10px;
    bottom: 0;
}
</style>