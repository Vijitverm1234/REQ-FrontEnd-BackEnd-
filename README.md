# REQ — FrontEnd + BackEnd

> Full-stack role-based authentication project (Vite React client + Express + MongoDB server)  
> Repo: `Vijitverm1234/REQ-FrontEnd-BackEnd-`
> Front-end-deploy: https://req-frontend-backend-1.onrender.com
> Back-end-deploy: https://req-frontend-backend.onrender.com

---

## Table of contents

- [Project structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [How to run (local)](#how-to-run-local)
  - [Backend (server)](#backend-server)
  - [Frontend (client)](#frontend-client)
- [Available scripts](#available-scripts)
- [API endpoints](#api-endpoints)
- [Files of interest (quick reference)](#files-of-interest-quick-reference)
- [Example file snippets](#example-file-snippets)
- [Deployment notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project structure

The recommended repo layout:

    repo-root/
    ├─ client/                      # Vite React app (frontend)
    │  ├─ package.json
    │  ├─ index.html
    │  ├─ src/
    │  │  ├─ main.jsx               # mounts <App />
    │  │  ├─ App.jsx                # routes + layout
    │  │  ├─ App.css
    │  │  ├─ api/
    │  │  │  └─ auth.js
    │  │  ├─ components/
    │  │  │  └─ Navbar.jsx
    │  │  ├─ pages/
    │  │  │  ├─ Login.jsx
    │  │  │  ├─ Signup.jsx
    │  │  │  └─ Dashboard.jsx
    │  │  └─ styles/
    │  │     └─ pages.css
    │  └─ .env.example
    ├─ server/                      # Express server (backend)
    │  ├─ package.json
    │  ├─ src/
    │  │  ├─ index.js               # server entry (connects to DB)
    │  │  ├─ models/
    │  │  │  └─ User.js
    │  │  ├─ routes/
    │  │  │  └─ auth.js
    │  │  └─ middleware/
    │  │     └─ authMiddleware.js
    │  └─ .env.example
    └─ README.md

---

## Features

- Role-based signup (User / Admin)
- Login with JWT & bcrypt
- Protected endpoint `/auth/me`
- Simple dashboard displaying `Welcome, [Name] (User)` or `Welcome, [Name] (Admin)`
- Ready for deployment (Vercel/Netlify + Render/Railway)

---

## Prerequisites

- Node.js v16+ (recommended)
- npm (or yarn)
- MongoDB (Atlas or local)
- Git (optional)

---

## Environment variables

Important: copy each `.env.example` to `.env` and fill the values.

Server (.env.example) - place in `server/.env.example`:

    JWT_KEY+""
    MONGODB_URL=" "
    FRONT_END_URL=http://localhost:5173

Client (.env.example) - place in `client/.env.example` (Vite requires `VITE_` prefix):

    VITE_API_URL=http://localhost:3000
  

---

## How to run (local)

### Backend (server)

1. Install & configure:

    cd server
    npm install
    cp .env.example .env   # then open .env and set MONGO_URI and JWT_SECRET

2. Start dev server:

    npm run dev

Notes:
- `dev` should run something like `nodemon src/index.js`.
- Default server port is `4000` (change in `.env` if needed).

### Frontend (client)

1. Install & configure:

    cd client
    npm install
    cp .env.example .env   # set VITE_API_URL to backend (http://localhost:4000)

2. Start Vite dev server:

    npm run dev

Notes:
- Vite default: `http://localhost:5173`.

---

## Available scripts (examples)

server/package.json (scripts):

    "scripts": {
      "dev": "nodemon src/index.js",
      "start": "node src/index.js"
    }

client/package.json (scripts):

    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }

---

## API endpoints

- POST /auth/signup  
  Body: { name, email, password, role }  
  Returns: { user: { id, name, email, role }, token }

- POST /auth/login  
  Body: { email, password }  
  Returns: { user: { id, name, email, role }, token }

- GET /auth/me (protected)  
  Header: Authorization: Bearer <token>  
  Returns: { user: { id, name, email, role } }

---

## Files of interest (quick reference)

Client:
- src/main.jsx — mounts `<App />`
- src/App.jsx — routes and layout (react-router-dom)
- src/pages/Login.jsx — login form; posts to /auth/login
- src/pages/Signup.jsx — signup form with role select; posts to /auth/signup
- src/pages/Dashboard.jsx — protected; shows welcome + role
- src/components/Navbar.jsx — top navigation + logout
- src/api/auth.js — functions: signup, login, me
- src/styles/pages.css — page styles

Server:
- src/index.js — load .env, connect to MongoDB, mount routes & middleware
- src/models/User.js — mongoose schema (name, email, password, role)
- src/routes/auth.js — signup / login / me routes
- src/middleware/authMiddleware.js — verifies JWT and attaches req.user

---

