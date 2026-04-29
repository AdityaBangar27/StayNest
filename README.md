# StayNest - Modern Property Rental Platform

StayNest is a full-stack responsive web application for finding flats, PGs, and rental properties.

## Features Built
- **User Authentication**: JWT-based login/signup with bcrypt password hashing.
- **Property Listings**: Users can browse flats, PGs, and rooms.
- **Property Management**: Authenticated users can add, view, and manage their listings.
- **Modern UI/UX**: Developed using React, raw CSS with Glassmorphism, gradients, and a responsive grid layout.
- **Real-Time Features**: Integrated with Socket.io (backend configured) and ready for live chat.
- **Floating Chatbot**: Simulated ChatGPT-like interface ready to be plugged into the OpenAI API.
- **Responsive Design**: Works perfectly across mobile, tablet, and desktop.

## Technologies Used
**Frontend**: React, Vite, CSS, React Router, Lucide-React, Axios.
**Backend**: Node.js, Express, MongoDB (Mongoose), JSONWebToken, Bcrypt, Socket.io.

## Installation Steps

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd c:/Developer/StayNest/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your own MongoDB URI and API keys if you want to connect to a cloud database or Razorpay/OpenAI.
4. Run the backend server:
   ```bash
   npm run dev
   ```
   *(The server will run on http://localhost:5000)*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd c:/Developer/StayNest/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *(The frontend will run on http://localhost:5173)*

## API Endpoints Included
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `GET /api/auth/profile` - Get logged-in user details
- `GET /api/properties` - Fetch all property listings
- `GET /api/properties/:id` - Fetch single property details
- `POST /api/properties` - Add a new property (Auth required)

## UI Design
- The application implements custom glassmorphism, responsive cards with hover animations, gradients, and custom modern typography using the "Inter" font.

Enjoy using StayNest!
