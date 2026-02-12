# MERN Expense Tracker

A modern, visually stunning expense tracker web application using the MERN stack.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository** (if applicable)

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in `server/` with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expensetracker
   ```

3. **Setup Client**
   ```bash
   cd client
   npm install
   ```

### Running the App

1. **Start Backend**
   ```bash
   # In terminal 1
   cd server
   npm start
   ```

2. **Start Frontend**
   ```bash
   # In terminal 2
   cd client
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Features
- Add, View, Delete expenses.
- Visual breakdown of spending.
- Responsive design with smooth animations.
