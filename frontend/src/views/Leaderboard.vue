<template>
    <h1>LEADERBOAD</h1>
    <div style="align-items:center;" class="row">
        <div class="column">
            <!-- <div class="header">
                Leaderboard
            </div> -->
            <div class="row-table fixed-row">
                <div class="name" style="font-size: 26px; font-weight: 700;">
                    USERNAME
                </div>
                <div class="score" style="font-size: 26px; font-weight: 700;">
                    SCORE
                </div>
            </div>

            <div class="leaderboard">
                <div v-for="user in users" :key="user.id">
                    <div class="row-table">
                        <div class="name">
                            {{user.username}}
                        </div>
                        <div class="score">
                            {{user.score}}
                        </div>
                    </div>
                </div>
            </div>   
        </div>

        <div class="column">
            <img src="../assets/img/leaderboard girl.png" class="girl">
            <router-link to="/">
                <div class="exit">
                    <game-button class="btn">
                        BACK
                    </game-button>
                </div>
            </router-link>
        </div>
        
    </div>
    
</template>
<script lang="ts">
    import { Component, defineComponent } from "vue";
    import GameButton from "../components/GameButton.vue";
    export default {
        name: 'Leaderboard',
        components: {
            GameButton
        },
        data() {
            return {
            users: [],
            username: "",
            password: "",
            score: "",
            created_at: "",
            id: "",
            isLogged: false,
            };
        },
        methods: {
            async getUser() {
                try {
                    await this.$http
                      .get(`http://127.0.0.1:8000/api/users/`)
                      .then((response) => {
                        this.users = response.data;
                      });
                } catch (error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getUser();
        },
        beforeCreate: function() {
            document.body.className = 'leaderboard';
        }
    };
</script>

<style scoped lang="css">
    .leaderboard {
        display: flex;
        flex-direction: column;
        max-width: 90vw;
        max-height: 55vh;
        overflow-y: auto;
        overflow-x: auto;
        background-color: #f07cd584;
        color: #2f1e2e;
        font-size: 22px;
        border: 5px solid #58074c85;
    }

    .fixed-row {
        background-color: #dc0fbd85;
        color: #ffc7f8;
    }

    .exit {
        position: absolute;
        bottom: 0.5em;
        right: 10px;
    }

    .exit .btn {
        width:100%;
        background: linear-gradient(0deg, rgb(124, 1, 154) 0%, rgb(83, 2, 130) 100%);
        border-color: transparent;
        color:rgb(249, 142, 236);
        padding: 0px -10px;
        font-size: 5cqmin;
    }

    .exit .btn:hover {
        background: linear-gradient(0deg, rgb(124, 27, 148) 0%, rgb(91, 25, 129) 100%);
        border-color: transparent;
        color:rgb(255, 167, 250);
        padding: 0px -10px;
    }

    .row-table {
        display: flex;
        border-bottom: 5px solid #58074c85;
    }

    .name {
        display: flex;
        justify-content: center;
        width: 50%;
        border-right: 5px solid #58074c85;
        padding: 5px;
    }

    .score {
        display: flex;
        justify-content: center;
        width: 50%;
        padding: 5px;
    }

    .header {
        background-color: #01043085;
        border-bottom: 5px solid #c7d4ffa3;
        font-size: 30px;
        text-align: center;
        padding: 20px;
        color: #c7d4ff;
        font-weight: 700;
        position: sticky;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f19b;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ad56c79b;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #7c3e8f9b;
    }

    .row {
        display: flex;
    }

    .column {
        flex: 50%;
    }

    .girl {
        height: 90%;
        right:0%;
        bottom:0%;
        position:fixed;
        pointer-events: none;
        z-index: -1;
    }
    h1 {
        text-align: center;
        pointer-events: none;
        color:rgb(255, 89, 197); 
        font-size: 8cqmin;
        text-shadow: rgba(255,112,224,1) 0px 0px 13px;       
    }
</style>