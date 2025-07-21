### Ticketing System 

- A simple and efficient system for creating, managing, and tracking help and support tickets. Users can submit issues, and support teams can assign, prioritize, and resolve them through a streamlined workflow.

## Features:

- Create and manage support tickets  
- Assign and prioritize issues  
- Track ticket status  

## Getting Started

To start using **The Ticketing System**, follow these steps:

1. **Sign Up**: Create a new account by clicking the "Sign Up" button and entering your details.  
2. **Log In**: If you already have an account, simply log in using your credentials.  
3. **Create tickets**

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/ticketing-system.git
   cd ticketing-system
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend/` folder and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Start the backend server:

   ```bash
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Tech Stack

- **Frontend**:  
  ![Tailwind](https://skillicons.dev/icons?i=tailwind) ![React](https://skillicons.dev/icons?i=react) 

- **Backend**:  
  ![Node.js](https://skillicons.dev/icons?i=nodejs) ![Express.js](https://skillicons.dev/icons?i=express)

- **Database**:  
  ![MongoDB](https://skillicons.dev/icons?i=mongodb)
