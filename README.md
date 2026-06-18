# Trust Life Insurance - Server

This is the backend server for the **Trust Life Insurance Platform** built with **Node.js**, **Express**, **MongoDB**, **Firebase Admin**, and **Stripe** for secure authentication and payments.

## 🚀 Features

- RESTful API for managing insurance policies, applications, claims, and transactions
- Firebase Admin token verification (`verifyFBToken`) for protected routes
- MongoDB database with secure data handling
- Stripe integration for payment processing
- Modular structure for scalability and clarity

---

## 📁 Project Structure

├── index.js # Main server entry point
├── .env # Environment variables
├── package.json # NPM dependencies and scripts
└── README.md # This file

---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **MongoDB** using official `mongodb` driver
- **Firebase Admin SDK** for user authentication
- **Stripe** for payments
- **dotenv** for managing environment variables
- **CORS** enabled for frontend/backend communication

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trust-life-server.git
cd trust-life-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/trust-life

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Server
PORT=5000
NODE_ENV=development
```

### 4. Run the Server

```bash
npm start
```

---

## 🔌 Available Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/policies` | Get all insurance policies |
| POST | `/policy-applications` | Apply for an insurance policy |
| PATCH | `/policy-applications/:id` | Update application (assign agent) |
| GET | `/payments` | Get all payments (admin) |
| POST | `/create-payment-intent` | Create Stripe payment intent |
| GET | `/limited-agents` | Fetch trusted agent list |

---

## 🧑‍💻 Author

Developed by **Ammar Shahab**  
📫 Email: [ashahab007@gmail.com]

---

## 📝 License

This project is licensed under the **MIT License**.

---
