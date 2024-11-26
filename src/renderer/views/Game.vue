<template>
    <div class="game-container">
        <h1>Нажмите клавишу!</h1>
        <div v-if="currentDirection" class="key-prompt" :style="{ opacity: keyOpacity }">{{ currentDirection }}</div>
        <div class="lives">Жизни: <span>{{ lives }}</span></div>

        <!-- Модальное окно -->
        <div v-if="isGameOver" class="modal">
            <div class="modal-content">
                <h2>Игра окончена!</h2>
                <p>Вы потеряли все жизни.</p>
                <game-button>
                    <router-link to="/" class="link">
                        Назад
                    </router-link>
                </game-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'KeyboardGame',
    setup() {
        const lives = ref(3);
        const currentDirection = ref<string | null>(null);
        const gameSpeed = ref(1000);
        const keyOpacity = ref(1);
        const isGameOver = ref(false);
        let keyTimeout: ReturnType<typeof setTimeout> | null = null;

        const directions = [
            { name: 'Вверх', keys: ['ArrowUp', 'KeyW', 'KeyЦ'] },
            { name: 'Вниз', keys: ['ArrowDown', 'KeyS', 'KeyЫ'] },
            { name: 'Влево', keys: ['ArrowLeft', 'KeyA', 'KeyФ'] },
            { name: 'Вправо', keys: ['ArrowRight', 'KeyD', 'KeyВ'] },
        ];

        const getRandomDirection = () => {
            const randomIndex = Math.floor(Math.random() * directions.length);
            return directions[randomIndex];
        };

        const showNextDirection = () => {
            const direction = getRandomDirection();
            currentDirection.value = direction.name;
            keyOpacity.value = 1;

            if (keyTimeout) clearTimeout(keyTimeout);
            keyTimeout = setTimeout(() => {
                keyOpacity.value = 0;
            }, gameSpeed.value);
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            const pressedKey = event.code;
            const currentKeys = directions.find(dir => dir.name === currentDirection.value)?.keys || [];
            console.log(`Нажата клавиша: ${pressedKey}`);

            if (currentKeys.includes(pressedKey)) {
                gameSpeed.value = Math.max(200, gameSpeed.value - 50);
                showNextDirection();
            } else {
                lives.value--;
                if (lives.value <= 0) {
                    isGameOver.value = true; // Устанавливаем состояние завершения игры
                } else {
                    showNextDirection();
                }
            }
        };

        const resetGame = () => {
            lives.value = 3;
            gameSpeed.value = 1000;
            isGameOver.value = false;
            showNextDirection();
        };

        onMounted(() => {
            document.addEventListener('keydown', handleKeyPress);
            resetGame();
        });

        onBeforeUnmount(() => {
            document.removeEventListener('keydown', handleKeyPress);
            if (keyTimeout) clearTimeout(keyTimeout);
        });

        return {
            lives,
            currentDirection,
            keyOpacity,
            isGameOver,
            showNextDirection,
        };
    },
};
</script>

<style scoped>
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #282c34;
    color: white;
    font-family: Arial, sans-serif;
}

.key-prompt {
    font-size: 48px;
    margin: 20px;
    transition: opacity 0.5s;
}

.lives {
    font-size: 24px;
}

/* Стили для модального окна */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* Полупрозрачный фон */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Убедитесь, что модальное окно поверх остальных элементов */
}

.modal-content {
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
    margin: 0 0 10px;
}

.modal-content p {
    margin: 0 0 20px;
}
</style>
