# Contacts API

REST API для управління контактами з автентифікацією користувачів та завантаженням аватарів.

## Технології

- **Node.js** + **Express.js**
- **Sequelize** (PostgreSQL)
- **JWT** для автентифікації
- **Multer** для завантаження файлів
- **Bcrypt** для хешування паролів
- **Gravatar** для автоматичних аватарів

## Встановлення

1. Клонуйте репозиторій:

```bash
git clone <repository-url>
cd <project-folder>
```

2. Встановіть залежності:

```bash
npm install
```

3. Створіть файл `.env` та налаштуйте змінні оточення:

```env
# Database
DATABASE_DIALECT=postgres
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_HOST=your_host
DATABASE_NAME=your_database
DATABASE_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret_key

# Server
PORT=3000
```

4. Запустіть сервер:

```bash
npm start
```

Сервер буде доступний за адресою: `http://localhost:3000`

## API Endpoints

### Автентифікація

#### Реєстрація користувача

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Відповідь:**

```json
{
  "user": {
    "email": "user@example.com",
    "subscription": "starter",
    "avatarURL": "https://gravatar.com/avatar/..."
  }
}
```

#### Вхід

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Відповідь:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "subscription": "starter",
    "avatarURL": "https://gravatar.com/avatar/..."
  }
}
```

#### Вихід

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Отримати поточного користувача

```http
GET /api/auth/current
Authorization: Bearer {token}
```

#### Оновити підписку

```http
PATCH /api/auth/subscription
Authorization: Bearer {token}
Content-Type: application/json

{
  "subscription": "pro"
}
```

Доступні підписки: `starter`, `pro`, `business`

#### Оновити аватар

```http
PATCH /api/auth/avatars
Authorization: Bearer {token}
Content-Type: multipart/form-data

avatar: <file>
```

**Відповідь:**

```json
{
  "avatarURL": "/avatars/user_1234567890_a5_avatar.jpg"
}
```

### Контакти

Всі маршрути контактів вимагають автентифікації (токен в заголовку).

#### Отримати всі контакти

```http
GET /api/contacts
Authorization: Bearer {token}
```

**Query параметри:**

- `page` - номер сторінки (опційно)
- `limit` - кількість на сторінці (опційно)
- `favorite` - фільтр за обраними (`true`/`false`, опційно)

#### Отримати контакт за ID

```http
GET /api/contacts/:id
Authorization: Bearer {token}
```

#### Створити контакт

```http
POST /api/contacts
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+380123456789"
}
```

#### Оновити контакт

```http
PUT /api/contacts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+380987654321"
}
```

#### Оновити статус обраного

```http
PATCH /api/contacts/:id/favorite
Authorization: Bearer {token}
Content-Type: application/json

{
  "favorite": true
}
```

#### Видалити контакт

```http
DELETE /api/contacts/:id
Authorization: Bearer {token}
```

## Структура проєкту

```
├── controllers/          # Контролери для обробки запитів
├── db/
│   ├── models/          # Моделі Sequelize
│   ├── sequelize.js     # Конфігурація Sequelize
│   └── connectDatabase.js
├── helpers/             # Допоміжні функції
├── middlewares/         # Middleware (auth, upload, validation)
├── routes/              # Маршрути API
├── schemas/             # Схеми валідації Joi
├── services/            # Бізнес-логіка
├── constants/           # Константи
├── public/              # Статичні файли
│   └── avatars/        # Аватари користувачів
├── temp/                # Тимчасові файли
├── .env                 # Змінні оточення
└── app.js              # Головний файл додатку
```

## Особливості

- 🔐 JWT автентифікація з терміном дії 24 години
- 🖼️ Автоматична генерація аватарів через Gravatar
- 📤 Завантаження власних аватарів (до 5MB)
- 🔒 Захист маршрутів через middleware
- ✅ Валідація даних через Joi
- 🗄️ PostgreSQL з Sequelize ORM
- 📁 Організована структура файлів

## Обробка помилок

API повертає стандартні HTTP коди статусу:

- `200` - Успішний запит
- `201` - Ресурс створено
- `204` - Успішно, без контенту
- `400` - Невірний запит
- `401` - Не авторизовано
- `404` - Не знайдено
- `409` - Конфлікт (email вже існує)
- `500` - Помилка сервера

Формат помилок:

```json
{
  "message": "Опис помилки"
}
```
