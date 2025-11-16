# 🚀 goit-node-rest-api (HW-05: REST API + Sequelize/PostgreSQL)

Цей проєкт реалізує **REST API** для управління контактами, використовуючи **Node.js**, **Express.js** та **PostgreSQL** як базу даних з ORM **Sequelize**.

Проєкт підтримує повний функціонал CRUD-операцій та додатковий маршрут для оновлення статусу обраного контакту (`favorite`).

## 📋 Вимоги

- Node.js (LTS-версія)
- PostgreSQL
- DBeaver або pgAdmin (для адміністрування БД)

## 🛠️ Встановлення та запуск

### 1. Налаштування бази даних

1.  Створіть базу даних PostgreSQL.
2.  Створіть файл `.env` у корені проєкту та вкажіть параметри підключення до БД (приклади див. нижче).
3.  Переконайтеся, що таблиця `contacts` створена (Sequelize виконає міграцію, якщо використовується `Contact.sync({alter: true})` або подібна логіка).

**Приклад `.env`:**

```env
PORT=3000
DATABASE_DIALECT=postgres
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_HOST=your_host
DATABASE_NAME=your_database_name
DATABASE_PORT=5432
```

### 2\. Встановлення залежностей

```bash
npm install
```

### 3\. Запуск сервера

Запустіть застосунок:

```bash
npm start
```

При успішному підключенні до БД ви побачите: `"Database connection successful"`. API доступний на `http://localhost:3000/api/contacts`.

## 🔗 Ендпоінти API

| Метод      | Шлях                         | Опис                            | Body                                 |
| :--------- | :--------------------------- | :------------------------------ | :----------------------------------- |
| **GET**    | `/api/contacts`              | Отримати всі контакти.          | N/A                                  |
| **GET**    | `/api/contacts/:id`          | Отримати контакт за ID.         | N/A                                  |
| **POST**   | `/api/contacts`              | Створити новий контакт.         | `{name, email, phone}`               |
| **PUT**    | `/api/contacts/:id`          | Повне оновлення контакту за ID. | `{name, email, phone}` (хоча б одне) |
| **DELETE** | `/api/contacts/:id`          | Видалити контакт за ID.         | N/A                                  |
| **PATCH**  | `/api/contacts/:id/favorite` | Оновити статус `favorite`.      | `{favorite: boolean}`                |
