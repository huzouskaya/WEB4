<template>
  <canvas id="entityCanvas" ref="entityCanvas"></canvas> 
  <canvas id="star1Canvas" ref="star1Canvas"></canvas>
  <canvas id="star2Canvas" ref="star2Canvas"></canvas>
  <canvas id="star3Canvas" ref="star3Canvas"></canvas> 
  <div id="scoreDisplay" ref="scoreDisplay"></div>   
  <div class="screen" id="loadingScreen">
      <p>Game is loading...</p>
  </div>
  <div class="screen" id="startScreen">
      <h1 class="gameName">Cosmic Chaos</h1>
      <p>Use the arrow keys / WASD to navigate the spaceship.</p>
      <p>Use the Space key to shoot lazers.</p>
      <p>Press Enter to start / pause the game.</p>
  </div>
  <div class="screen" id="pauseScreen">
      <p>Paused</p>
  </div>
  <div class="screen" id="gameoverScreen">
    <h2 class="gameover">Gameover</h2>
    <h3 id="scoreEndDisplay"></h3>
    <p class="continue">Presse Enter to continue.</p>
    <img src="/src/assets/img/gameover girl.png" class="girl">
    <img src="/src/assets/img/gameover speech.png" class="bubble">
  </div>
</template>

<script lang="ts">
import GameButton from "../components/GameButton.vue";
import { SpaceShip } from "../assets/js/entities/SpaceShip.js";
import { Stars } from "../assets/js/entities/Stars.js";
import { Lazer } from "../assets/js/entities/Lazer.js";
import { Asteroid } from "../assets/js/entities/Asteroid.js";
import { getCSRFToken } from '../store/auth';
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';

export default {
  components: {
    GameButton
  },
  beforeCreate: function() {
    document.body.className = 'game';
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
      canvas: null,
      ctx: null,
      ship: null,
      stars: null,
      gameRunning: false,
      score: 0,
      asteroids: 0,
      interval: null,
      isGameOver: false,
      success: '',
      message: ''
    };
  },
  mounted() {
    this.initGame();
  },
  methods: {
    initGame() {
      this.gameRunning = false,
      this.score = 0;
      this.asteroids = 0;
      this.isGameOver = false;

      this.canvas = {
        entity: this.$refs.entityCanvas,
        star1: this.$refs.star1Canvas,
        star2: this.$refs.star2Canvas,
        star3: this.$refs.star3Canvas,
      };

      this.ctx = {
        entity: this.canvas.entity.getContext("2d"),
        star1: this.canvas.star1.getContext("2d"),
        star2: this.canvas.star2.getContext("2d"),
        star3: this.canvas.star3.getContext("2d"),
      };

      this.makeCanvasesFullScreen();
      this.showScreen("start");

      const shipImg = new Image();
      shipImg.src = '/src/assets/img/ship1.png';
      shipImg.onload = () => {
        console.log("ship img loaded");
      };
      
      this.ship = new SpaceShip(this.canvas, this.ctx, shipImg);
      this.stars = new Stars(this.canvas, this.ctx);

      this.stars.generate();
      this.stars.draw();

      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener(
        "resize", this.debounce(() => {
            this.makeCanvasesFullScreen();
            this.stars.generate();
            this.stars.draw();
        }, 150)
      );
    },

    makeCanvasesFullScreen() {
      this.makeCanvasFullScreen(this.canvas.entity);
      this.makeCanvasFullScreen(this.canvas.star1, 2);
      this.makeCanvasFullScreen(this.canvas.star2, 2);
      this.makeCanvasFullScreen(this.canvas.star3, 2);
    },
    
    makeCanvasFullScreen(canv, factor = 1) {
      canv.width = window.innerWidth * factor;
      canv.height = window.innerHeight * factor;
    },

    showScreen(name) {
      document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("visible");
      });
      document.getElementById(`${name}Screen`).classList.add("visible");
    },
    
    hideScreen() {
      document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("visible");
      });
    },

    backToGame() {
      document.querySelectorAll(".screenEsc").forEach((screen) => {
        screen.classList.remove("visible");
      });
      this.gameRunning = true;
      this.startGeneratingAsteroids();
      (document.getElementById("scoreDisplay")).innerText = `Score: ${this.ship.score}`;
      (document.getElementById("scoreEndDisplay")).innerText = `Score: ${this.ship.score}`;
      this.gameLoop();
    },

    debounce(fn, delay) {
    let id;
    return (...args) => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            fn(...args);
        }, delay)
      }
    },

    startGeneratingAsteroids(frequency = 300) {
        this.interval = setInterval(() => new Asteroid(this.canvas, this.ctx), frequency);
    },

    stopGeneratingAsteroids() {
        clearInterval(this.interval);
    },

    async handleKeyDown(e) {
      if (e.key == "Enter") {
        if (this.ship.destroyed && this.authStore.isAuthenticated) {
          console.log(this.scoreEnd)
          try {
                const response = await fetch('http://localhost:8000/api/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken(),
                    },
                    body: JSON.stringify({
                        score: this.ship.score
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.success = 'Score updated successfully'

                    console.log(this.success);

                    this.gameRunning = false,
                    this.score = 0;
                    this.isGameOver = false;
                    Asteroid.removeAll();
                    this.score = this.ship.score;
                    this.asteroids = this.ship.asteroidsDestroyed;
                    this.ship.reset();
                    this.stopGeneratingAsteroids()
                    window.removeEventListener("keydown", this.handleKeyDown);
                    window.removeEventListener("resize", this.handleResize);

                    if ((document.getElementById("scoreDisplay")) != null) 
                      (document.getElementById("scoreDisplay")).innerText = `Score: ${this.ship.score}`;

                    if ((document.getElementById("scoreEndDisplay")) != null) 
                      (document.getElementById("scoreEndDisplay")).innerText = `Score: ${this.ship.score}`;

                    this.$router.push({
                      name: 'gameResults',
                      query: { score: this.score, asteroids: this.asteroids } // Теперь score будет в URL как ?score=100
                    });
                } else {
                    this.error = data.message || 'Some error occured'
                }
            } catch (err) {
                this.error = 'An error occurred during score update: ' + err
            }
        } else if (this.ship.destroyed && !this.authStore.isAuthenticated) {
            this.gameRunning = false,
            this.score = 0;
            this.isGameOver = false;
            Asteroid.removeAll();
            this.score = this.ship.score;
            this.asteroids = this.ship.asteroidsDestroyed;
            this.ship.reset();
            this.stopGeneratingAsteroids()
            window.removeEventListener("keydown", this.handleKeyDown);
            window.removeEventListener("resize", this.handleResize);

            if ((document.getElementById("scoreDisplay")) != null) 
              (document.getElementById("scoreDisplay")).innerText = `Score: ${this.ship.score}`;

            if ((document.getElementById("scoreEndDisplay")) != null) 
              (document.getElementById("scoreEndDisplay")).innerText = `Score: ${this.ship.score}`;
            
            this.$router.push({
              name: 'gameResults',
              query: { score: this.score, asteroids: this.asteroids } 
            });
        } 
        else if (this.gameRunning) {
          this.showScreen("pause");
          this.gameRunning = false;
          this.stopGeneratingAsteroids();
        } else {
          this.hideScreen();
          this.gameRunning = true;
          this.startGeneratingAsteroids();

          if ((document.getElementById("scoreDisplay")) != null) 
            (document.getElementById("scoreDisplay")).innerText = `Score: ${this.ship.score}`;

          if ((document.getElementById("scoreEndDisplay")) != null) 
            (document.getElementById("scoreEndDisplay")).innerText = `Score: ${this.ship.score}`;

          this.gameLoop();
        }
      }
    },
    
    clearCanvas(key) {
      this.ctx[key].clearRect(0, 0, this.canvas[key].width, this.canvas[key].height);
    },

    gameLoop() {
      if (!this.gameRunning) return;
      
      this.clearCanvas("entity");
      
      if ((document.getElementById("scoreDisplay")) != null) 
        (document.getElementById("scoreDisplay")).innerText = `Score: ${this.ship.score}`;

      if ((document.getElementById("scoreEndDisplay")) != null) 
        (document.getElementById("scoreEndDisplay")).innerText = `Score: ${this.ship.score}`;

      [...Lazer.list, ...Asteroid.list, this.ship, this.stars].forEach((obj) => obj.update(this.ship));
      [...Lazer.list, ...Asteroid.list, this.ship].forEach((l) => l.draw());

      if (this.gameRunning) requestAnimationFrame(() => this.gameLoop());
    },
    
    setupEventListeners() {
      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("resize", this.handleResize);
    },
  }
};
</script>

<style lang="css" scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

canvas {
    position: absolute;
}

#star1Canvas {
    z-index: 1;
}

#star2Canvas {
    z-index: 2;
}

#star3Canvas {
    z-index: 3;
}

#entityCanvas {
    z-index: 10;
}

/* score */
#scoreDisplay {
  font-family: 'Tiny5', sans-serif;
  position: fixed;
  top: 10px;
  left: 15px;
  font-size: 20px;
  z-index: 30;
  opacity: 0.7;
  color:rgb(255, 211, 243);
}

/* screen */
.screen {
    font-family: 'Tiny5', sans-serif;
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 30px;
    opacity: 0;
    transition: opacity 200ms ease;
    pointer-events: none;
    color: rgb(250, 202, 241);
}

.screen.visible {
    opacity: 1;
}

.screen p {
    margin: 5px 0px;
}

h1,
h2 {
    font-size: 90px;
    text-transform: uppercase;
    font-weight: 300;
}

h1 {
    margin-bottom: 30px;
    text-shadow: 0px 0px 20px #fff6;
}

h3 {
    margin-bottom: 20px;
}

.gameName {
    color: #fff;
    text-shadow:
        0 0 7px #fff,
        0 0 10px #fff,
        0 0 21px #fff,
        0 0 42px rgb(255, 0, 242),
        0 0 82px rgb(255, 0, 242),
        0 0 92px rgb(255, 0, 242),
        0 0 102px rgb(255, 0, 242),
        0 0 151px rgb(255, 0, 242);
}

.gameover {
  color: rgb(255, 0, 85);
  text-shadow:
      0 0 7px rgb(248, 127, 171),
      0 0 10px rgb(249, 85, 145),
      0 0 21px rgb(249, 85, 145),
      0 0 42px rgb(255, 0, 93),
      0 0 82px rgb(255, 0, 93),
      0 0 92px rgb(255, 0, 93),
      0 0 102px rgb(255, 0, 93),
      0 0 151px rgb(255, 0, 93);
}

.btn {
  display: inline;
  flex-direction: column;
  justify-content: top;
  align-items: top;
}

.girl {
    height: 100%;
    align-items: center;
    bottom:0%;
    position:fixed;
    pointer-events: none;
    z-index: -1;
}

.bubble {
    height: 30%;
    align-items: center;
    top:3%;
    right: 10%;
    position:fixed;
    pointer-events: none;
    z-index: -1;
}

.continue {
  text-shadow: rgba(71,67,60,0.9) 0px 0px 11px;
}
</style>
