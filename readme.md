# Express Server - Vehicle Rental Management System

A robust and scalable backend API for managing vehicle rentals, built with Node.js, TypeScript, and PostgreSQL. This system provides comprehensive functionality for vehicle inventory management, customer accounts, booking operations, and secure role-based authentication.

## 🚀 Live Demo

**API Base URL:** `https://express-server-blue.vercel.app/`


## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login
- JWT-based authentication
- Role-based access control (Admin & Customer roles)
- Password hashing with bcrypt
- Protected routes and middleware

### 🚗 Vehicle Management
- Complete CRUD operations for vehicles
- Real-time availability tracking
- Vehicle categorization and filtering
- Detailed vehicle specifications
- Admin-only vehicle management

### 👥 Customer Management
- Customer registration and profile management
- Account information updates
- Booking history tracking
- Secure customer data handling

### 📅 Booking System
- Create and manage vehicle reservations
- Automatic cost calculation
- Booking status tracking (active, returned, cancelled)
- Vehicle availability validation
- Return processing with cost updates
- Date conflict prevention

## 🛠️ Technologies Used

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Static typing for enhanced code quality

### Database
- **PostgreSQL** - Powerful relational database
- **pg** - PostgreSQL client for Node.js

### Security
- **bcrypt** - Password hashing and salting
- **jsonwebtoken** - JWT token generation and verification
- **CORS** - Cross-Origin Resource Sharing enabled

### Development Tools
- **ts-node** - TypeScript execution for Node.js
- **nodemon** - Auto-restart during development
- **dotenv** - Environment variable management

## 📁 Project Structure

```
express-server/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controllers.ts
│   │   │   ├── auth.services.ts
│   │   │   ├── auth.routes.ts
│   │   ├── users/
│   │   │   ├── users.controllers.ts
│   │   │   ├── users.services.ts
│   │   │   └── users.routes.ts
│   │   ├── vehicles/
│   │   │   ├── vehicles.controllers.ts
│   │   │   ├── vehicles.services.ts
│   │   │   └── vehicles.routes.ts
│   │   └── bookings/
│   │       ├── bookings.controllers.ts
│   │       ├── bookings.services.ts
│   │       └── bookings.routes.ts
│   ├── config/
│   │   └── config.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   |── isOwnerOrAdmin.ts
|   |   └── roleAuth.ts
|   | 
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahbub-alam-dave/next-level-a-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Set up the database**
   
   Create a PostgreSQL database and run the schema:
   ```bash
   psql -U postgres
   CREATE DATABASE vehicle_rental;
   ```

   Then run your database migrations or schema file.

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "customer"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Vehicle Endpoints

#### Get All Vehicles
```http
GET /api/v1/vehicles
```

#### Get Vehicle by ID
```http
GET /api/v1/vehicles/:id
```

#### Create Vehicle (Admin only)
```http
POST /api/v1/vehicles
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Toyota Camry",
  "type": "Sedan",
  "pricePerDay": 50,
  "available": true
}
```

#### Update Vehicle (Admin only)
```http
PUT /api/v1/vehicles/:id
Authorization: Bearer <token>
```

#### Delete Vehicle (Admin only)
```http
DELETE /api/v1/vehicles/:id
Authorization: Bearer <token>
```

### Vehicles Endpoints

#### Add vehicles (admin only)
```http
POST /api/v1/vehicles
Authorization: Bearer <token>
Content-Type: application/json
{
  "vehicle_name": 1,
  "type": "car",
  "registration-number": "2525255324",
  "daily-rent-price": 699,
  "availability-status": "available"
}
```

#### get vehicles 
```http
GET /api/v1/vehicles
Content-Type: application/json

```

#### Get vehicle details
```http
GET /api/v1/vehicles/:id
Content-Type: application/json

```

#### Update vehicle (admin only)
```http
PUT /api/v1/vehicles/:id
Authorization: Bearer <token>
Content-Type: application/json
{
  "vehicle_name": 1,
  "type": "car",
  "registration-number": "2525255324",
  "daily-rent-price": 699,
  "availability-status": "available"
}
```

### Booking Endpoints

#### Create Booking
```http
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicleId": 1,
  "startDate": "2024-01-15",
  "endDate": "2024-01-20"
}
```

#### Get User Bookings (Users)
```http
GET /api/v1/bookings
Authorization: Bearer <token>
```

#### Get All Bookings (Admin only)
```http
GET /api/v1/bookings
Authorization: Bearer <token>
```

#### Process Cancel (users)
```http
PUT /api/v1/bookings/cancel/:id
Authorization: Bearer <token>
```

#### Process Return (Admin)
```http
PUT /api/v1/bookings/return/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens for stateless authentication
- Role-based access control middleware
- Protected routes requiring authentication
- Input validation and sanitization
- CORS enabled for secure cross-origin requests

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@mahbubalamdave](https://github.com/mahbub-alam-dave/)
- LinkedIn: [Mahbub Alam](https://www.linkedin.com/in/md-mahabub-alam-web-dave/)
- Email: mahbubalamdave2.00@gmail.com

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- PostgreSQL for robust database management
- All contributors who help improve this project

---

Made with ❤️ by [Mahbub Alam]