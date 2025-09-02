# 📰 Postifly
![React](https://img.shields.io/badge/Frontend-React-blue)
![Express](https://img.shields.io/badge/Backend-Express-green)
![Postgres](https://img.shields.io/badge/Database-Postgres-blueviolet)

### A modern tech stack forum app built with authentication, likes system, and theming

Postifly is a full-stack blog application I built as a personal learning project to practice and showcase modern web development. It features user authentication, post creation and editing, comments, likes, profile pictures, and a dark/light theme toggle. The project gave me hands-on experience with React + Vite, TypeScript, Tailwind CSS, React Query, Express, PostgreSQL, and Prisma, while also teaching me about RESTful API design, database relationships, and deployment workflows with Vercel and Railway.

## 🚀 Features

* User authentication ([JWT](https://www.jwt.io/) + [Passport](https://www.passportjs.org/))
* Create, edit, and delete posts
* Create, edit, and delete comments
* Likes system
* Profile Pictures with uploads
* Light/Dark theme toggle
* categories for posts
* Responsive design

## 🛠️ Tech Stack
* **Frontend** : [React](https://react.dev/) + [Typescript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/) + [React Query](https://tanstack.com/query/latest)
* **Backend**: [Node.js](https://nodejs.org/en) + [Express](https://expressjs.com/) + [Prisma ORM](https://www.prisma.io/)
* **Database**: [PostgreSQL](https://www.postgresql.org/)
* **Deployment**: [Vercel](https://vercel.com/) (Frontend) + [Railway](https://railway.com/) (Backend)

## ⚙️ Installation & Setup
Step-by-step instructions to run your app locally:
1. Clone the repo
   ```
   git clone https://github.com/username/blog-post-app.git
   cd blog-post-app
   ```
2. Install dependencies (Both frontend and backend)
   ```
   # Install backend dependencies
   cd backend && npm install
   # Install frontend dependencies
   cd frontend && npm install
   ```
3. Set up environment variables
   ```
   DATABASE_URL="your_postgres_connection"
   JWT_SECRET="your_secret_key"
   ```
5. Run database migrations with prisma
6. Start dev server

## 🧪 Testing
```
#Frontend testing
cd frontend ** npx vites
#backend testing
cd backend && npm test
```

## 🌐 Live Demo
[Postifly](https://www.postifly.blog/)

### Homepage

<img width="1900" height="923" alt="postifly_home" src="https://github.com/user-attachments/assets/75893569-fff7-4489-a9b0-641b92fb2c31" />

### Profile View

<img width="2557" height="1296" alt="Screenshot 2025-09-01 202054" src="https://github.com/user-attachments/assets/77c4fb8e-276e-469d-ac4b-ec05b0d7d956" />

### Account View

<img width="2557" height="1303" alt="Screenshot 2025-09-01 202245" src="https://github.com/user-attachments/assets/eeff65ff-04a8-444c-9eda-e044fd722c21" />

### Theme Toggle

![postifly_theme_toggle](https://github.com/user-attachments/assets/a24e7a10-d8b2-4f12-bb73-ed8730db8662)

## ✨ Future Improments
* Infinite scroll for posts
* Comments onto user comments
* Post filtering by like count, views etc.
* Rich-text/Markdown editor
* Profile Customization
