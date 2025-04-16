<template>
    <div class="row">
        <div class="column">
            <div class="card">
                <div>
                    <h1>RESULTS</h1>
                    <p>Score: {{ score }}</p>
                    <p>Asteroids destroyed: {{ asteroids }}</p>
                    <br>
                    <hr class="gradient">
                    <div v-if="authStore.isAuthenticated">
                        <p>Your total score now: {{ totalScore }}</p>
                    </div>
                    <router-link to="/">
                        <div class="exit">
                            <game-button class="btn">
                                MENU
                            </game-button>
                        </div>
                    </router-link>
                </div>
                
            </div>
        </div>
        <div class="column">
            <img src="../assets/img/results girl.png" class="girl">
            <img src="../assets/img/results speech.png" class="bubble">
        </div>
    </div>
    
</template>
<script lang="ts">
    import GameButton from "../components/GameButton.vue";
    import { getCSRFToken } from '../store/auth';
    import { useAuthStore } from '../store/auth.js'
    import { useRouter } from 'vue-router'

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
                asteroids: 0,
                totalScore: 0
            };
        },
        created() {
            this.score = Number(this.$route.query.score); // Преобразуем строку в число
            this.asteroids = Number(this.$route.query.asteroids);

            console.log("Score:", this.score);
            console.log("Asteroids:", this.asteroids);
        },
        beforeCreate: function() {
            document.body.className = 'home';
        },
        methods: {
            async getScore() {
                console.log("Asking server for total score...");
                try {
                    const response = await fetch('http://localhost:8000/api/get-score/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCSRFToken(),
                        },
                        credentials: 'include'
                    })
                    console.log("Sending request...")
                    const data = await response.json()
                    console.log("Checking response")
                    if (response.ok) {
                        console.log('Score successfully received');
                        this.totalScore = data.score
                    } else {
                        this.error = data.message || 'Some error occured'
                    }
                } catch (err) {
                    this.error = 'An error occurred during score update: ' + err
                }
                console.log("Done!");
            }
        },
        async mounted() {
            await this.authStore.fetchUser();
            this.getScore();
        },
    };
</script>

<style scoped lang="css">
    .leaderboard {
        display: flex;
        flex-direction: column;
        max-width: 85vw;
        max-height: 55vh;
        overflow-y: auto;
        background-color: #c27cf084;
        color: #2f1e1e;
        font-size: 22px;
        border: 5px solid #01043085;
    }

    .fixed-row {
        background-color: #01043085;
        color: #c7d4ff;
    }

    .exit {
        position: absolute;
        bottom: 2em;
        right: 30px;
    }

    .exit .btn {
        width:100%;
        background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(95, 0, 102) 100%);
        border-color: transparent;
        color:rgb(250, 67, 229);
        padding: 0px -10px;
        font-size: 5cqmin;
    }

    .exit .btn:hover {
        background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(138, 1, 148) 100%);
        border-color: transparent;
        color:rgb(247, 105, 240);
        padding: 0px -10px;
    }

    .card {
        position: absolute;
        width: 40%;
        height: 80vh;
        border-radius: 10px;
        background: #f9a9ff7a;
        top: 10%;
        left: 5%;
    }

    .card p {
        padding-left: 5%;
    }

    h1 {
        font-size:3em;
        color: rgb(248, 45, 177); 
        text-shadow: rgba(70, 60, 71, 0.782) 0px 0px 11px;
        text-align: center;
    }

    p {
        color: rgb(98, 3, 133);
        font-size: 5vh;
    }

    hr.gradient {
        height: 3px;
        border: none;
        border-radius: 6px;
        background: linear-gradient(
            90deg,
            rgb(78, 8, 96) 0%,
            rgb(108, 9, 121) 21%,
            rgb(126, 6, 170) 51%,
            rgb(230, 0, 255) 100%
        );
    }

    .girl {
        height: 90%;
        right:10%;
        bottom:0%;
        position:fixed;
        pointer-events: none;
        z-index: -1;
    }

    .bubble {
        height: 25%;
        align-items: center;
        top:3%;
        right: 0%;
        position:fixed;
        pointer-events: none;
        z-index: -1;
    }

</style>