# zigvy-interview-homework

This project includes both frontend and backend components that should be run simultaneously on your local machine.

```
├── frontend   # React application (UI)
└── backend    # NestJS server with MongoDB
```

# 🖥️ Frontend Setup

Navigate to the frontend folder and run the development server:

```
cd frontend
npm install
npm start
```

This starts the React application on http://localhost:3000

# 🔧 Backend Setup

Run MongoDB (required for backend).
If you haven't installed MongoDB locally:

```
brew tap mongodb/brew
brew update
brew install mongodb-community@8.0
brew services start mongodb-community
```

Navigate to the backend folder and run the NestJS server:

```
cd backend
npm install
npm run start:dev
```

This starts the backend on http://localhost:4000 (or whichever port is configured)
✅ You can view the API documentation via Swagger at:
http://localhost:4000/api/docs
