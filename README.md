# DreamyStays - Vacation Apartment

## Project Overview  
DreamyStays is a full stack web application for listing and managing vacation apartments.  
It allows advertisers to register, log in, and manage their properties, while visitors can browse and filter apartments easily.  
The system is split into a React client and a Node.js/Express backend, connected to a MongoDB database.

## Key Components  
- **Backend API:** Built with Express.js, handles authentication, apartment management, and CRUD operations for cities and categories.
- **Frontend Client:** Built with React, includes registration/login dialogs, apartment forms, personal dashboard, and filtering UI.
- **State Management:** Redux (used to store user token).
- **Authentication:** JWT-based token authentication.

## Project Structure  

``` bash
DreamyStays/
├── client/ # Frontend React application
│ ├── pages/ # Page-level components (Home, AddApartment, MyApartments)
│ ├── component/ # Reusable components (Register, Login, ApartmentCard, etc.)
│ ├── redux/ # Redux store, reducer, and API calls
│ ├── routing/ # Routing and navigation
│ └── style.css # App styles
├── api/ # Backend Node.js + Express + Mongoose
│ ├── models/ # Mongoose schemas for Apartment, City, Category, Advertiser
│ ├── routes/ # REST API endpoints
│ ├── controllers/ # Logic for handling requests
│ ├── middleware/ # Auth middleware (JWT verification)
│ └── index.js # Server entry point
└── README.md # Project documentation
```

## Technologies Used  
- **Frontend:** React, React Router, Material-UI, Redux, Axios, SweetAlert2  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Auth:** JWT-based token stored in localStorage  
- **Styling:** MUI components and custom CSS  

## Setup and Running

### 1. Clone the repository
```bash
git clone https://github.com/your-username/DreamyStays.git
cd DreamyStays
```
2. Setup Backend
 ```bash

cd api
npm install
```
# Add .env file as described below

```bash
npm run dev
```
3. Setup Frontend

```bash
cd ../client
npm install
npm start
```
Environment Variables
Create a .env file inside the api/ directory:
env
```bash
PORT=3001
MONGO_URL=mongodb://localhost:27017/dreamystays
JWT_SECRET=your_jwt_secret
```

## Usage
Register as an advertiser

Log in to get access to your private dashboard

Add new apartments with details and images

Edit or delete your apartments

Filter apartments by city, category, beds, or price range

Smart form handling – add a city/category if it's not listed

## Notes
Apartments are fetched and filtered in real time.

Cities and categories are dynamically managed.

All forms use Material UI and basic validations.

Protected routes are only accessible when authenticated.

## License
This project is for educational and non-commercial use only.
