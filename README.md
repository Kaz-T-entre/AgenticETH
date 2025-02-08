# Agentic Demo Application

Welcome to the Agentic Demo Application! This repository contains a backend built with Node.js, Express, and TypeScript and a frontend built with React and Vite. The project demonstrates features such as WebAuthn-based authentication using dummy endpoints, wallet information, and basic transaction handling.

---

## Table of Contents

- Project Overview
- Project Structure
- Prerequisites
- Installation
  - Backend Setup
  - Frontend Setup
- Running the Application
  - Running the Backend
  - Running the Frontend
- Environment Variables
- Available Scripts
- Troubleshooting
- Technologies Used
- License

---

## Project Overview

The Agentic Demo Application is composed of two main parts:

- **Backend:**  
  An Express server written in TypeScript that supports authentication (both registration and login using dummy endpoints) and wallet-related endpoints. It also uses MongoDB (with connect-mongo for session storage).

- **Frontend:**  
  A React application using Vite as the build tool. It communicates with the backend API, demonstrating basic authentication flows (using WebAuthn and Privy) and wallet features.

---

## Project Structure

The project is organized as follows:

backend/
  ├── src/
  │     ├── index.ts           - Entry point used for development
  │     ├── server.ts          - Server setup with sessions and MongoDB connection
  │     ├── routes/            - API routes (auth, wallet)
  │     ├── middleware/        - Authentication middleware
  │     ├── models/            - Mongoose models (User, Wallet)
  │     ├── utils/             - Utility functions, including token generation and error definitions
  │     └── types/             - TypeScript declaration files (e.g., express-session override)
  ├── package.json             - Backend dependencies and scripts
  ├── tsconfig.json            - TypeScript configuration
  └── .gitignore               - Configuration to ignore sensitive files (.env) and build outputs

frontend/
  ├── src/
  │     ├── App.tsx            - React-router setup and route definitions (auth, intro, home)
  │     ├── Auth.tsx           - Authentication page/component using Privy
  │     ├── Home.tsx           - Home page displaying wallet information
  │     ├── Intro.tsx          - Intro page shown after account creation
  │     ├── api/               - Axios API configuration and endpoints
  │     ├── assets/            - Images and CSS files (TailwindCSS & custom fonts)
  │     └── utils/             - Utility functions (e.g., WebAuthn helper methods)
  ├── package.json             - Frontend dependencies and scripts
  ├── vite.config.js           - Vite configuration file
  └── index.html               - HTML template that bootstraps the React app

---

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or later is recommended)
- npm (comes with Node.js) or Yarn
- A MongoDB instance for the backend (either locally or via a service like MongoDB Atlas)

---

## Installation

### Backend Setup

1. **Navigate to the backend folder:**

   Type:
   cd backend

2. **Install dependencies:**

   Type:
   npm install

3. **Configure Environment Variables:**  
   Create a file named .env in the backend folder (this file is already ignored by Git as per the .gitignore). An example configuration:

   PORT=3001
   JWT_SECRET=your_jwt_secret_here
   SESSION_SECRET=your_session_secret_here
   MONGO_URI="mongodb+srv://<username>:<password>@your-cluster.mongodb.net/your_db_name"
   SECRET_KEY=your_secret_key_here
   NODE_ENV=development

4. **Build the project (if needed):**

   Type:
   npm run build

   Note: For development, you can use "npm run dev" which uses ts-node-dev for auto-reloading.

### Frontend Setup

1. **Navigate to the frontend folder:**

   Type:
   cd frontend

2. **Install dependencies:**

   Type:
   npm install

3. **Configure the API Base URL (Optional):**  
   By default, the frontend communicates with http://localhost:3001/api. If your backend is hosted elsewhere, update the VITE_API_BASE_URL variable in your frontend environment configuration (e.g., in a .env file at the project root or via Vite’s mode configuration).

---

## Running the Application

### Running the Backend

- **Development Mode:**  
  To start the server in development mode with auto-reloading, type:
  
  cd backend
  npm run dev

- **Production Mode:**  
  First, build the TypeScript files, then start the compiled JavaScript code:
  
  cd backend
  npm run build
  npm start

The backend server will start and listen on port 3001 (or the port defined in your .env file).

### Running the Frontend

1. **Start the Vite development server:**  
   Type:
   
   cd frontend
   npm run dev

The frontend by default will be available at http://localhost:3000. The React application communicates with the backend at http://localhost:3001/api.

---

## Available Scripts

### Backend

- "npm run dev": Runs the server in development mode with auto-reloading.
- "npm run build": Compiles the TypeScript files into the dist/ directory.
- "npm start": Starts the compiled backend server from the dist/ folder.

### Frontend

- "npm run dev": Starts the Vite development server for the React app.
- "npm run build": Builds the frontend for production.
- "npm run preview": Previews the production build locally.

---

## Environment Variables

The backend expects certain environment variables configured in a .env file (located in the backend directory):

- PORT: The port on which the backend server runs.
- JWT_SECRET: The secret used for signing JWT tokens.
- SESSION_SECRET: The secret used for Express sessions.
- MONGO_URI: The MongoDB connection string.
- SECRET_KEY: A secret key used by some endpoints.

The frontend accesses the backend API base URL via:

- VITE_API_BASE_URL: Set this variable to the API base URL when necessary.

---

## Troubleshooting

- **EADDRINUSE Error (Port Already in Use):**  
  If you encounter an error such as "Error: listen EADDRINUSE: address already in use :::3001", it means another process is using that port. To resolve this:
  - Check if there are any running instances of the server and stop them.
  - Alternatively, change the port number in your .env file.

- **MongoDB Connection Issues:**  
  Ensure that your MongoDB URI is correct and that your MongoDB instance is running.

- **CORS Issues:**  
  The backend is set up to allow requests from http://localhost:3000 in non-production environments. Adjust these settings in the backend’s server configuration if needed.

---

## Technologies Used

- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - MongoDB & Mongoose
  - JSON Web Token (JWT)
  - express-session & connect-mongo

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - Axios
  - React Router
  - WebAuthn (via Privy and simplewebauthn libraries)

---

## License

This project is open source and available under the MIT License.

Enjoy using the Agentic Demo Application!
