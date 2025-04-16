<template>
    <div class="login-form">
        <div class="header">
            Login
        </div>
        <form @submit.prevent="login">
            <div class="form">
                <input v-model="username" type="text" placeholder="Username" required @input="resetError">
                <input v-model="password" type="password" placeholder="Password" required id="password" @input="resetError">
                <div>
                    <!--check login and password-->
                    <game-button type="submit" class="enter">
                        LOG IN
                    </game-button>
                </div>
                <div>
                    <router-link to="/register">
                        <a class="reg">Don't Have An Account? Sign Up</a>
                    </router-link>
                    <p v-if="error" style="color: rgb(204, 2, 180)">{{ error }}</p>
                </div>
            </div>
        </form>
        <img src="../assets/img/login girl.png" class="girl">
        <img src="../assets/img/login speech.png" class="bubble">
        <router-link to="/">
            <div class="exit">
                <game-button class="btn">
                    BACK
                </game-button>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '../store/auth'
import GameButton from "../components/GameButton.vue";

export default {
    components: {
        GameButton
    },
    setup() {
        const authStore = useAuthStore()
        return {
            authStore
        }
    },
    data() {
        return {
            email: "",
            password: "",
            username: "",
            error: ""
        }
    },
    methods: {
        async login() {
            await this.authStore.login(this.email, this.password, this.username, this.$router)
            if (!this.authStore.isAuthenticated) {
                this.error = 'Please check your credentials.'
            }
            else {
                setTimeout(() => {
                        this.$router.push('/')
                }, 1000);
            }
        },
        resetError() {
            this.error = ""
        }
    }
};
</script>

<style scoped lang="css">
.login-form {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    padding-right: 15%;
    padding-top: 2%;
}

.header {
    background-color: #f9a9ff7a;
    font-size: 2.5em;
    text-align: center;
    padding: 20px;
    color: rgb(254, 1, 224);
    text-shadow: rgba(70, 60, 71, 0.782) 0px 0px 11px;
    font-weight: 700;
    width: 265px;
    margin-top: 15vh;
    border-radius: 5px 5px 0px 0px;
}

.form {
    display: flex;
    flex-direction: column;
    background-color: #f9a9ff7a;
    border-radius: 0px 0px 5px 5px;
    padding: 20px;
    align-items: center;
}

.form input {
    margin-bottom: 10px;
}

.form div {
    margin-bottom: 10px;
}

input {
    padding: 5px;
    background: #e6abf0bf;
    border: 3px solid #9339a2bf;
    color: #57326e;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Comfortaa', sans-serif;
}

input::placeholder {
    color: #925b9c;
}

input:focus {
    outline: none;
}

.pwrd {
    display: flex;
}

.pwrd-img {
    width: 4cqmin;
}

.show {
    width: 15%;
    margin-left: 1em;
    background: none;
    border: 3px solid #8496ae;
    border-radius: 10px;
    background: #8496ae;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.show:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.enter {
    font-size: 24px;
    cursor: pointer;
    background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(95, 0, 102) 100%);
    border-color: transparent;
    color:rgb(250, 67, 229);
}

.enter:hover {
    background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(138, 1, 148) 100%);
    border-color: transparent;
    color:rgb(247, 105, 240);
}

.reg {
    font-style: italic;
    color: rgb(204, 2, 180);
}

.reg:hover {
    text-decoration: underline;
}

a {
    text-decoration: none;
}

.exit .btn {
    width:100%;
    background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(95, 0, 102) 100%);
    border-color: transparent;
    color:rgb(250, 67, 229);
    padding: 0px -10px;
}

.exit .btn:hover {
    background: linear-gradient(0deg, rgb(111, 2, 130) 0%, rgb(138, 1, 148) 100%);
    border-color: transparent;
    color:rgb(247, 105, 240);
    padding: 0px -10px;
}

.exit {
    position: absolute;
    bottom: 1.5em;
    right: 20px;
}

.girl {
    height: 100%;
    left:0%;
    bottom:0%;
    position:fixed;
    pointer-events: none;
    z-index: -1;
}

.bubble {
    height: 25%;
    align-items: center;
    top:2%;
    left: 0%;
    position:fixed;
    pointer-events: none;
    z-index: -1;
}
</style>