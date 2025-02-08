# Agentic

Agentic is a demonstration project showcasing a modern web application using React, Vite, TypeScript, and WebAuthn.

## Table of Contents

- Overview
- Features
- Project Structure
- Installation
- Usage
- Backend Integration
- License

## Overview

Agentic is a web application designed to demonstrate authentication workflows using WebAuthn, including registration and login functionality. The project is built using modern technologies:
- Frontend: React, Vite, and TypeScript.
- Backend: Node.js, Express, and WebAuthn APIs.

## Features

- Modern Frontend Framework: Built with React and Vite.
- TypeScript: Provides type-safety and improved developer experience.
- WebAuthn Integration: Enables secure user registration and authentication.
- Responsive Design: Crafted CSS for a consistent experience across devices.

## Project Structure

Agentic/
├── .gitignore
├── README.md
├── backend/
│   └── src/
│       └── routes/
│           └── auth.ts        # Backend routes for WebAuthn authentication
├── frontend/
│   ├── index.html             # Entry point for Vite
│   ├── src/
│   │   ├── App.tsx            # Application root component
│   │   ├── main.tsx           # Main entry point for the React app
│   │   ├── Auth.tsx           # WebAuthn authentication component
│   │   └── utils/
│   │       └── webAuthnUtils.ts  # Utility functions for WebAuthn tasks
│   └── assets/
│       └── css/
│           └── index.css       # Global CSS styles
└── package.json

## Installation

### Prerequisites

- Node.js (v14 or newer recommended)
- npm

### Steps

1. Clone the repository:

   git clone git@github.com:YourUsername/Agentic.git

2. Navigate to the project directory:

   cd Agentic

3. Install dependencies:

   For the frontend:
   cd frontend
   npm install

   For the backend:
   cd ../backend
   npm install

## Usage

### Running the Frontend

From the "frontend" directory, start the Vite development server:

   npm run dev

Open the provided URL (typically http://localhost:3000 or http://localhost:5173) in your browser.

### Running the Backend

From the "backend" directory, start the backend server:

   npm run dev

## Backend Integration

The backend supplies RESTful endpoints for WebAuthn registration and authentication. For example:

- Registration Challenge Endpoint: POST /api/auth/register-challenge
- Authentication Endpoint: POST /api/auth/authenticate

Ensure that the backend sends proper WebAuthn options (e.g., challenge and user identifiers encoded in Base64 URL format). The frontend then decodes these values into ArrayBuffer when invoking the WebAuthn API.

## License

This project is licensed under the MIT License.
