<!-- 
 g-a223
 G-A223@yandex.ru
 ABCD1234
-->

<template>
    <div class="row">
        <div class="column">
            <div v-if="authStore.isAuthenticated">
                <p class="user-info">{{ authStore.user?.username }} Score: {{ score }}</p>
            </div>
            <img class="girl" id="img" src="../assets/img/main girl.png">
            <img class="bubble" id="bubble" src="../assets/img/bye bye speech.png">
        </div>
        <div class="menu column">
            <div v-if="authStore.isAuthenticated" class="header" style="margin-top: 1em;">
                <!-- <img src="../assets/img/logo.png" class="logo"> -->
                <h1>Cosmic Chaos</h1>
            </div>
            <div v-else="authStore.isAuthenticated" class="header">
                <h1>Cosmic Chaos</h1>
                <!-- <img src="../assets/img/logo.png" class="logo"> -->
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
                <div v-if="!authStore.isAuthenticated">
                    <router-link to="/login">
                        <game-button class="btns">
                            SIGN IN
                        </game-button>
                    </router-link>
                </div>
                <div v-if="!authStore.isAuthenticated">
                    <router-link to="/register">
                        <game-button class="btns">
                            SIGN UP
                        </game-button>
                    </router-link>
                </div>
                <div v-if="authStore.isAuthenticated">
                    <router-link to="/">
                        <game-button @click="logout" class="btns">
                            SIGN OUT
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
    </div>
    
    <router-view>
    </router-view>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue"
import GameButton from "../components/GameButton.vue"
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import { getCSRFToken } from '../store/auth';

export default {
    components: {
        GameButton
    },
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        return {
            authStore, router
        }
    },
    data() {
        return {
            score: 0,
        };
    },
    methods: {
        async handleExit() {
            const img = document.getElementById("img");
            img.src = "/src/assets/img/bye bye girl.png";
            document.getElementById('bubble').classList.add("visible");
            setTimeout(() => {
                window.close();
            }, 1500);
        },
        async logout() {
            try {
                await this.authStore.logout(this.$router)
            } catch (error) {
                console.error(error)
            }
        },
        async getScore() {
            try {
                const response = await fetch('http://localhost:8000/api/get-score/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken(),
                    },
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    console.log('Score successfully received');
                    this.score = data.score
                } else {
                    this.error = data.message || 'Some error occured'
                }
            } catch (err) {
                this.error = 'An error occurred during score update: ' + err
            }
            // try {
            //     await this.$http
            //         .get(`http://127.0.0.1:8000/api/get-score/`, { withCredentials: true })
            //         .then((response) => {
            //         this.score = response.data.score;
            //         });
            // } catch (error) {
            //     console.log(error);
            // }
        }
    },
    async mounted() {
        await this.authStore.fetchUser();
        this.getScore();
    },
    beforeCreate: function() {
        document.body.className = 'home';
    }
}
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
    background: linear-gradient(0deg, rgb(124, 1, 154) 0%, rgb(83, 2, 130) 100%);
    border-color: transparent;
    color:rgb(249, 142, 236);
    padding: 0px -10px;
}

.exit .btns:hover {
    background: linear-gradient(0deg, rgb(124, 27, 148) 0%, rgb(91, 25, 129) 100%);
    border-color: transparent;
    color:rgb(255, 167, 250);
    padding: 0px -10px;
}

.exit {
    right: 10px;
    bottom: 0;
}

.user-info {
    color:rgb(250, 188, 226);
    font-size: 5cqmin;
    position: absolute;
    left: 1em;
    top: 0em;
    padding-bottom: 0.5dvh;
}

/* .column {
    float: left;
    width: 50%;
}

.row {
    height: 100%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
} */
.row {
  display: flex;
}

.column {
  flex: 50%;
}

.girl {
    height: 90%;
    left:5%;
    bottom:0%;
    position:fixed;
    pointer-events: none;
    z-index: -1;
}

.bubble {
    height: 28%;
    align-items: center;
    top:15%;
    left: 0%;
    position:fixed;
    pointer-events: none;
    z-index: -1;
    transition: opacity 200ms ease;
    opacity: 0;
}

.bubble.visible {
    opacity: 1;
}

h1 {
    pointer-events: none;
    color:rgb(255, 89, 197); 
    font-size: 10cqmin;
    text-shadow:
        0 0 3px rgb(252, 186, 238),
        0 0 5px rgb(252, 186, 238),
        0 0 10px rgb(252, 186, 238),
        0 0 15px rgb(251, 145, 228),
        0 0 20px rgb(251, 145, 228),
        0 0 30px rgb(251, 145, 228),
        0 0 45px rgb(251, 145, 228),
        0 0 55px rgb(251, 145, 228);
}
</style>