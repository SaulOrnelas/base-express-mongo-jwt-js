# Restaurant API - Phase 1

## Description
This project is the first phase of a **Restaurant API** built using **Node.js**, **MongoDB**, **Mongoose**, and **JSON Web Token (JWT)**. It also leverages **Faker.js** to seed the database with sample data.

The API allows you to:
- Create and manage **users**, **dishes**, and **categories** for the dishes.
- Authenticate users through a dedicated module that provides **JWTs** for secure access to protected actions.

Even though **MongoDB** is a non-relational database, this project demonstrates how to establish **relationships between documents** using Mongoose.

---

## Features
### User Management
- Users can register and log in.
- A JWT is issued upon successful login, enabling authenticated actions.

### Dish and Category Management
- Create, read, update, and delete (CRUD) operations for **dishes**.
- Associate dishes with **categories**.

### Authentication
- Secure endpoints with **JWT-based authentication**.
- Only authenticated users can perform certain actions.

### Database Seeding
- Use **Faker.js** to populate the database with realistic sample data for development and testing purposes.

### Relationships in MongoDB
- Showcase how to establish and manage relationships between documents (e.g., linking dishes to categories) in a non-relational database.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Token (JWT)**: For user authentication and secure access.
- **Faker.js**: For generating sample data.
  
---

## Getting Started
### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SaulOrnelas/base-express-mongo-jwt-js.git
   cd base-express-mongo-jwt-js
   npm install
   npm start

2. Execute seeders:
	- Connect to your MongoDB database using **MONGO_URL** env variable
	- Example: **MONGODB_URL=mongodb://localhost:27017/restaurant_db**
	- Use _{{base_url}}/api/seeders/execute-seeder_ endpoint using GET method