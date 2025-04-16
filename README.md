# 🚀 WEB4 - Space Shooter Game

## 📖 Описание

WEB4 - это космический шутер, разработанный с использованием Django для бэкенда и Vue.js для фронтенда. Игра позволяет пользователям регистрироваться, логиниться и соревноваться за лучший счет.

## 🛠️ Стек технологий

- 🐍 **Бэкенд**: Django, Django REST Framework
- ⚛️ **Фронтенд**: Vue.js
- 💾 **База данных**: SQLite

## ⚙️ Установка и запуск

### 1. 📥 Клонирование репозитория

bash
git clone https://github.com/huzouskaya/WEB4.git
cd WEB4
copy


### 2. 🐍 Создание и активация виртуального окружения

bash
python -m venv venv
source venv/bin/activate # для Linux/macOS
venv\Scripts\activate   # для Windows
copy



### 3. 📦 Установка зависимостей

bash
pip install -r requirements.txt
copy

### 4. 🗄️ Миграции Django

bash
python manage.py migrate
copy

### 5. ▶️ Запуск Django сервера

bash
python manage.py runserver
copy

### 6. ⚛️ Запуск Vue.js приложения
Перейдите в директорию `frontend` и запустите приложение:

bash
cd frontend
npm install
npm run serve
copy



## 🎮 Функциональность

- 👤 Регистрация и авторизация пользователей
- 🏆 Сохранение и отображение рекордов
- 🍪 Аутентификация через cookies

## 🔗 API Endpoints

### 🧑‍💻 Пользователи

- `POST /api/register` - Регистрация пользователя
- `POST /api/login` - Авторизация пользователя
- `POST /api/logout` - Выход из системы
- `GET /api/user` - Получение информации о текущем пользователе
- `POST /api/score` - Обновление рекорда пользователя
- `GET /api/get-score/` - Получение рекорда пользователя

## 📸 Скриншоты
![photo_5474549716063743365_y](https://github.com/user-attachments/assets/7f49edc5-b094-4b0c-988c-4aa7cc344d63)
![photo_5474549716063743366_y](https://github.com/user-attachments/assets/8133dd14-22be-4446-91a5-bd4d54681547)
![photo_5474549716063743367_y](https://github.com/user-attachments/assets/39a25d20-f720-4cd7-87e8-1e7ffd8971d1)
![photo_5474549716063743368_y](https://github.com/user-attachments/assets/34fa7779-bc33-4cec-bd1c-ac5fe1f1357d)
![photo_5474549716063743369_y](https://github.com/user-attachments/assets/13af581d-ee66-4348-b1fa-3bfe53701673)
![photo_5474549716063743370_y](https://github.com/user-attachments/assets/7abe2ea9-4bb6-41c0-90ea-32d2e234e344)
![photo_5474549716063743371_y](https://github.com/user-attachments/assets/2a973b95-c0aa-4bec-84fd-b6b39eb9258e)
![photo_5474549716063743372_y](https://github.com/user-attachments/assets/a6fd6941-96ca-485f-8518-a969d6982bd5)
