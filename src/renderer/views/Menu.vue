<template>
    <div class="menu">
        <div class="header">
            <img src="../assets/logo.png" class="logo">
        </div>
        <div class="buttons">
            <router-link to="/game">
                <game-button class="btns">
                    Играть
                </game-button>
            </router-link>
            <router-link to="/leaderboard">
                <game-button class="btns">
                    Лидерборд
                </game-button>
            </router-link>
            <div v-if="!isAuth">
                <router-link to="/login">
                    <game-button class="btns">
                        Войти
                    </game-button>
                </router-link>
            </div>
                <div v-if="!isAuth">
                <router-link to="/register">
                    <game-button class="btns">
                        Регистрация
                    </game-button>
                </router-link>
            </div>
            <div class="exit">
                <router-link to="/login">
                    <game-button class="btns" @click="handleExit">
                        выйти
                    </game-button>
                </router-link>
            </div>
        </div>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent, PropType } from "vue"
import GameButton from "../components/GameButton.vue"
export default defineComponent({
    components: {
        GameButton
    },
    data() {
        let isAuth: Boolean = false 
        return {       
            isAuth
        };
    },
    async mounted() {
        this.checkAuth()
    },

    methods: {
        async handleExit() {
            localStorage.removeItem('token');
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
    width: 9em;
    font-size: 4cqmin;
    margin-bottom: 0.5em;
}

.header {
    font-size: 30px;
    text-align: center;
    padding: 20px;
    color: #7f9e9f;
    font-weight: 700;
}

.logo {
    width: 50%;
    height: auto;
}

.exit .btns {
    width:100%;
    background-color: rgb(51, 3, 69);
    border-color: transparent;
    color:rgb(201, 67, 250);
    padding: 0px -10px;
}

.exit .btns:hover {
    background-color: rgb(69, 3, 65);
    border-color: transparent;
    color:rgb(250, 67, 241);
    padding: 0px -10px;
}

.exit {
    right: 10px;
    bottom: 0;
}
</style>