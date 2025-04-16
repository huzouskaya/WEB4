<template>
    <div class="login-form">
        <div class="header">
            Registration
        </div>
        <form @submit.prevent="register">
            <div class="form">
                <input v-model="username" type="text" placeholder="Username" required>
                <input v-model="password" type="password" placeholder="Password" required id="password">
                <input v-model="email" type="text" placeholder="E-mail" required id="email">
                <div>
                    <!--check login and password-->
                    <game-button type="submit" class="enter">
                        SIGN UP
                    </game-button>
                    <p v-if="error">{{ error }}</p>
                    <p v-if="success">{{ success }}</p>
                </div>
                <div>
                    <router-link to="/login">
                        <a class="log">Already Have An Account? Sign in</a>
                    </router-link>
                </div>
            </div>
        </form>
        <img src="../assets/img/register girl.png" class="girl">
        <img src="../assets/img/register speech.png" class="bubble">
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
import { getCSRFToken } from '../store/auth'
import GameButton from "../components/GameButton.vue";

export default {
    components: {
        GameButton
    },
    data() {
        return {
            email: '',
            password: '',
            username: '',
            error: '',
            success: ''
        }
    },
    methods: {
        async register() {
            try {
                const response = await fetch('http://localhost:8000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                        username: this.username
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.success = 'Registration successful! Please log in.'
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1000);
                } else {
                    this.error = data.error || 'Registration failed'
                }
            } catch (err) {
                this.error = 'An error occurred during registration: ' + err
            }
        }
    }

};
</script>

<style scoped lang="css">
.login-form {
    display: flex;
    flex-direction: column;
    align-items:end;
    padding-right: 15%;
    padding-top: 2%;
    justify-content: center;
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
    margin-top: 10vh;
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

.log {
    font-style: italic;
    color: rgb(204, 2, 180);
    font-size: 1em;
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