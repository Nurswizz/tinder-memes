# Meme Match

## Краткое описание проекта

Meme match — это веб-приложение, которое позволяет пользователям генерировать и делиться мемами, связанными с популярным приложением Tinder. Приложение состоит из двух частей: backend на Express.js и frontend на React (с использованием Vite для сборки).

Проект предоставляет API для создания мемов, а также интерфейс, где пользователи могут просматривать и загружать мемы. Он поддерживает функциональность для генерации мемов по шаблонам, а также возможности взаимодействия с ними через социальные сети.

## Инструкции по установке и запуску

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/yourusername/tinder-memes.git
cd tinder-memes
```
### 2. Установка зависимостей
### Backend
Перейдите в директорию backend и установите зависимости:
```bash
cd backend
npm install
```
### Frontend
Перейдите в директорию frontend и установите зависимости:
```bash
cd frontend
npm install
```
### 3. Создайте .env файл в директории backend/ 
```sh
MONGO_URI=your-mongodb-server
JWT_SECRET=your-jwt-secret
```

### 4. Запуск локально
### Backend
Для запуска backend:

```bash
cd backend
node index.js
```
Сервер будет доступен по адресу http://localhost:5000


### Frontend
Для запуска frontend:
```bash
cd frontend
npm run dev
```

### Запуск с помощью Docker Compose 
Убедитесь, что у вас установлен Docker и Docker Compose на вашем компьютере.

Для того чтобы запустить все сервисы (backend & frontend ) с использованием Docker Compose, выполните команду:
```bash
docker-compose up --build
```

### Доступ к приложению
Backend: http://localhost:5000

Frontend: http://localhost:3000

### Остановка приложения
```bash 
docker-compose down
```


