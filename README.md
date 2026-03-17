#  Task Management 

A scalable and type-safe **Task Management Backend API** built with **Node.js, Express, TypeScript, and MongoDB**.
Supports authentication, project management, and task tracking with proper error handling and validation.

## 📌 Features

*  Authentication (Register / Login with JWT)
*  Project Management (CRUD)
*  Task Management (CRUD with filters)
*  Protected Routes (JWT-based auth)
*  Input Validation using Zod
*  Centralized Error Handling
*  Clean Architecture (Controller → Service → Model)


##  Tech Stack

* **Backend:** Node.js, Express
* **Language:** TypeScript
* **Database:** MongoDB + Mongoose
* **Validation:** Zod
* **Auth:** JWT (JSON Web Token)
* **Security:** bcrypt, cookie-parser


## Project Structure
src/
│
├── controllers/      # Route handlers (business logic entry)
├── services/         # Core logic (DB + processing)
├── models/           # Mongoose schemas
├── routes/           # API routes
├── middleware/       # Auth, validation, error handling
├── utils/            # Helpers (ApiError, sendResponse, token)
├── types/            # TypeScript types/interfaces
├── config/           # DB config
└── index.ts         # Entry point

## ⚙️ Installation

# Clone the repo
git clone https://github.com/praveenppawar17/assignmenttask

# Go into project
cd <project-folder>

# Install dependencies
npm install

## ▶️ Run Project

# Development
npm run dev


## 🔐 Authentication

### Register

POST /api/auth/register


### Login


POST /api/auth/login

* Returns JWT token (stored in cookies)

##  Project APIs

### Create Project
POST /api/projects

### Get Projects
GET /api/projects


### Update Project
PUT /api/projects/:id

### Delete Project
DELETE /api/projects/:id

##  Task APIs

### Create Task
POST /api/tasks

### Get Tasks (with filters)
GET /api/tasks?projectId=69b85d724635560ac80f1dc8&status=Todo&priority=High


### Update Task
PUT /api/tasks/:id


### Delete Task
DELETE /api/tasks/:id


##  Error Handling

* Uses custom `ApiError` class
* Centralized error handler middleware


## Protected Routes

* Uses JWT stored in cookies
* Middleware: `protect`


##  Best Practices Used

* Separation of concerns (Controller / Service)
* Type safety with TypeScript
* Reusable response utility
* Consistent error handling
* Clean and scalable folder structure

