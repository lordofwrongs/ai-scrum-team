# Task Manager App

This is a full-stack task management application built with React for the frontend and Node.js/Express for the backend. It's designed to be deployed as a single service, particularly on platforms like Render.

## Project Structure


.
├── .gitignore
├── README.md
├── backend/
│   ├── package.json
│   └── server/
│       └── index.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.css
    │   ├── App.js
    │   └── index.js
    └── package.json


## Features

*   **Frontend:** React-based UI for displaying and adding tasks.
*   **Backend:** Node.js/Express API for task management.
*   **Single Deployment:** Serves the React build and API from a single URL.
*   **Health Check:** `/health` endpoint for monitoring.
*   **API Prefix:** All API routes are prefixed with `/api/`.
*   **Relative API Calls:** Frontend uses relative paths for API requests.

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.

### Installation and Setup

1.  **Clone the repository:**
    bash
    git clone <repository-url>
    cd <repository-directory>
    

2.  **Install backend dependencies:**
    bash
    cd backend
    npm install
    cd ..
    

3.  **Install frontend dependencies:**
    bash
    cd frontend
    npm install
    cd ..
    

### Running the Application Locally

1.  **Start the backend server:**
    bash
    cd backend
    npm start
    
    The backend will start and serve the React app. The application will be accessible at `http://localhost:3001` (or the port specified by `PORT` environment variable).

    Alternatively, you can use `npm run dev` for development with nodemon, which will automatically restart the server on file changes.

2.  **Build the frontend (if not done automatically by backend start script):**
    While the `npm start` script in the backend will typically run the build process if needed, you can manually build the frontend like this:
    bash
    cd frontend
    npm run build
    cd ..
    

## Deployment (Render)

This application is designed for easy deployment on Render.

1.  **Create a new Web Service on Render.**
2.  **Connect your GitHub repository.**
3.  **Configure Build and Start Commands:**
    *   **Build Command:** `cd frontend && npm install && npm run build`
    *   **Start Command:** `cd backend && npm install && node server/index.js`
    Render will automatically detect the Node.js environment.

**Important:** Ensure your `backend/server/index.js` listens on `process.env.PORT` for Render to manage the port dynamically.

## API Endpoints

*   `GET /api/tasks`: Retrieves all tasks.
*   `POST /api/tasks`: Creates a new task. Expects a JSON body `{ "title": "Task Title" }`.
*   `GET /health`: Health check endpoint. Returns `{"status": "UP"}`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
