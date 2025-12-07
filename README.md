# Contacts API

REST API для управління контактами з автентифікацією користувачів, email-верифікацією та завантаженням аватарів.

## Технології

- **Node.js** + **Express.js**
- **Sequelize** (PostgreSQL)
- **JWT** для автентифікації
- **Multer** для завантаження файлів
- **Bcrypt** для хешування паролів
- **Gravatar** для автоматичних аватарів
- **Nodemailer** для email-верифікації

---

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

# Email
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
PUBLIC_URL=http://localhost:3000
```

4. Запустіть сервер:

```bash
npm start
```

Сервер буде доступний за адресою: `http://localhost:3000`

---

## API Endpoints

## Автентифікація

### 🔹 **Реєстрація користувача + Email-верифікація**

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Що відбувається:**

- створюється новий користувач
- на email надсилається лист із посиланням для підтвердження
- поле `verify` встановлене в `false`
- логін заборонений, поки email не підтверджено

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

---

### 🔹 **Підтвердження email**

```http
GET /api/auth/verify/:verificationToken
```

Приклад:

```
GET /api/auth/verify/98f2f29d-73e2-4bc2-91b4-e620c2a1c777
```

**Результат:**

- користувача позначено як verified (`verify = true`)
- токен очищено

**Відповідь:**

```json
{
  "message": "Verification successful"
}
```

---

### 🔹 **Повторна відправка verification email**

```http
POST /api/auth/verify
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Результат:**

- якщо користувач не підтверджений — лист надсилається повторно
- якщо вже підтверджений → 400 Bad Request

**Відповідь:**

```json
{
  "message": "Verification email sent"
}
```

---

### 🔹 Вхід

> ❗ **Логін дозволено лише для підтверджених користувачів.**

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
  "token": "JWT_TOKEN",
  "user": {
    "email": "user@example.com",
    "subscription": "starter",
    "avatarURL": "https://gravatar.com/avatar/..."
  }
}
```

---

### 🔹 Вихід

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

---

### 🔹 Отримати поточного користувача

```http
GET /api/auth/current
Authorization: Bearer {token}
```

---

### 🔹 Оновити підписку

```http
PATCH /api/auth/subscription
Authorization: Bearer {token}
Content-Type: application/json

{
  "subscription": "pro"
}
```

---

### 🔹 Оновити аватар

```http
PATCH /api/auth/avatars
Authorization: Bearer {token}
Content-Type: multipart/form-data

avatar: <file>
```

**Відповідь:**

```json
{
  "avatarURL": "/avatars/user_1234567890.jpg"
}
```

---

## Контакти

Всі маршрути контактів вимагають автентифікації (`Bearer token`).

### Отримати всі контакти

```http
GET /api/contacts
Authorization: Bearer {token}
```

Query параметри:

- `page`
- `limit`
- `favorite`

---

### Отримати контакт за ID

```http
GET /api/contacts/:id
Authorization: Bearer {token}
```

---

### Створити контакт

```http
POST /api/contacts
Authorization: Bearer {token}

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+380123456789"
}
```

---

### Оновити контакт

```http
PUT /api/contacts/:id
Authorization: Bearer {token}
```

---

### Оновити статус обраного

```http
PATCH /api/contacts/:id/favorite
Authorization: Bearer {token}
```

---

### Видалити контакт

```http
DELETE /api/contacts/:id
Authorization: Bearer {token}
```

---

## Структура проєкту

```
├── controllers/
├── db/
│   ├── models/
│   ├── sequelize.js
│   └── connectDatabase.js
├── helpers/
├── middlewares/
├── routes/
├── schemas/
├── services/
├── constants/
├── public/
│   └── avatars/
├── temp/
└── app.js
```

---

## Особливості

- 🔐 JWT автентифікація (24 години)
- 📧 Email-верифікація (verify + resend)
- 🖼️ Gravatar за замовчуванням
- 📤 Завантаження аватарів (до 5MB)
- 🛡️ Захист приватних маршрутів
- ✅ Валідація через Joi
- 🗄️ PostgreSQL + Sequelize ORM
- 📁 Чітка архітектура

---

## Обробка помилок

API повертає:

- `200`, `201`, `204`
- `400` — невірний запит
- `401` — не авторизовано
- `404` — не знайдено
- `409` — конфлікт (email існує)
- `500` — серверна помилка

Формат:

```json
{
  "message": "Опис помилки"
}
```
