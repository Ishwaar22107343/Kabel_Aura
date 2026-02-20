# Kabel Aura

**Aura lets students prove their skills via short, employer-designed “Skill Sprints.” Completing one equals a verified badge and a cleared first-round interview.**

![Kabel Aura Screenshot](https://via.placeholder.com/800x400.png?text=App+Screenshot+Here)

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

Kabel Aura is a platform designed to bridge the gap between students and employers. It allows students to showcase their practical skills by completing short challenges called "Skill Sprints" created by companies. Successful completion of a sprint results in a verified skill badge on the student's profile and guarantees them a first-round interview, streamlining the hiring process for both parties.

This repository contains the full-stack code for the Kabel Aura application, including the React frontend and the FastAPI backend.

### Built With

This project is built with a modern, high-performance tech stack:

*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [Vite](https://vitejs.dev/)
*   **Backend:**
    *   [FastAPI](https://fastapi.tiangolo.com/)
    *   [Python 3.11+](https://www.python.org/)
*   **Database:**
    *   [Google Firestore](https://firebase.google.com/docs/firestore)
*   **Deployment:**
    *   [Vercel](https://vercel.com/) (for frontend)
    *   [Google Cloud Run](https://cloud.google.com/run) (for backend)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your local machine:

*   Node.js & npm
    ```sh
    npm install npm@latest -g
    ```
*   Python & pip
*   Google Cloud SDK (for backend authentication)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/KABEL_AURA.git
    cd KABEL_AURA
    ```
2.  **Set up the Backend**
    *   Navigate to the backend directory: `cd backend`
    *   Create and activate a virtual environment:
        ```sh
        python -m venv venv
        source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
        ```
    *   Install Python dependencies: `pip install -r requirements.txt`
    *   Create a `.env` file from the `.env.example` and add your Google Application Credentials path.
3.  **Set up the Frontend**
    *   Navigate to the frontend directory: `cd ../frontend`
    *   Install NPM packages: `npm install`
4.  **Run the application**
    *   In one terminal, run the backend server from the `backend` directory: `uvicorn app.main:app --reload`
    *   In another terminal, run the frontend development server from the `frontend` directory: `npm run dev`

## Usage

Once the application is running, you can open your browser to `http://localhost:5173` to see the frontend. The application demonstrates the MVP flow:

1.  A student sees a "Job Offer" and accepts the "Skill Sprint" invitation.
2.  The student is taken to a briefing page with challenge details.
3.  The student submits their work (a PDF file).
4.  Upon successful submission, the student's profile is instantly updated with a "Verified Skill" badge.

## API Endpoints

The backend exposes the following API endpoints:

*   `GET /`: Welcome message.
*   `GET /api/sprints/{sprint_id}`: Get details for a specific sprint.
*   `POST /api/sprints/{sprint_id}/submit`: Submit work for a sprint.

For more details, the interactive API documentation (provided by FastAPI) is available at `http://localhost:8000/docs` when the backend is running.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

