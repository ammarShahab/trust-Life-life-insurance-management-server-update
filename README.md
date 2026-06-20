# Trust Life Insurance — Server

> RESTful API backend for the **Trust Life Insurance Platform**, powering policy management, applications, claims, payments, and user administration. Built with Node.js, Express, MongoDB (Mongoose), Firebase Admin, and Stripe.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Policies](#policies)
  - [Applications & Claims](#applications--claims)
  - [Customers & Agents](#customers--agents)
  - [Payments](#payments)
  - [Blogs](#blogs)
  - [Reviews](#reviews)
  - [Newsletter](#newsletter)
- [Deployment](#deployment)
- [License](#license)
- [Author](#author)

---

## Overview

This server provides a secure, modular REST API for a full-featured life insurance platform. It supports three user roles—**Customer**, **Agent**, and **Admin**—with Firebase Authentication guarding protected routes. The system handles the complete insurance lifecycle: browsing policies, submitting applications, assigning agents, processing claims, and collecting payments via Stripe.

---

## Features

| Feature               | Description                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **Policy Management** | Browse, search, and filter insurance policies; admins can create, update, and delete policies.      |
| **Applications**      | Customers apply for policies with full nominee and health details.                                  |
| **Agent Workflow**    | Admins assign approved agents to applications; agents review and approve/reject.                    |
| **Claims**            | Customers submit claims with documents; agents and admins manage claim status.                      |
| **Role-Based Access** | Firebase-verified tokens protect routes; role-specific endpoints for customers, agents, and admins. |
| **Payments**          | Stripe PaymentIntents for secure, PCI-compliant payment processing.                                 |
| **CMS (Blogs)**       | Public blog feed with view tracking; admin CRUD for content.                                        |
| **Reviews**           | Customer reviews displayed publicly.                                                                |
| **Newsletter**        | Public subscription endpoint with admin subscriber list.                                            |
| **MongoDB Indexes**   | Optimized queries on policies, applications, and customers for fast lookups.                        |

---

## Tech Stack

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| Runtime        | Node.js                                    |
| Framework      | Express.js                                 |
| Database       | MongoDB (Mongoose ODM)                     |
| Authentication | Firebase Admin SDK (ID token verification) |
| Payments       | Stripe                                     |
| Configuration  | dotenv                                     |
| Dev Server     | nodemon                                    |

---

## Project Structure

```
trust-Life-life-insurance-management-server/
├── index.js                     # Entry point — server & middleware initialization
├── vercel.json                  # Vercel serverless deployment config
├── .env                         # Environment variables (not committed)
├── .gitignore
├── package.json
├── README.md
├── config/
│   └── db.js                    # MongoDB connection via Mongoose
├── middleware/
│   └── verifyFBToken.js         # Firebase ID token verification
├── models/
│   ├── application.js           # Policy application schema
│   ├── blog.js                  # Blog post schema
│   ├── customer.js              # User/customer schema
│   ├── newsletter.js            # Newsletter subscriber schema
│   ├── payment.js               # Payment/transaction schema
│   ├── policy.js                # Insurance policy schema
│   └── review.js                # Review schema
├── routes/
│   ├── applicationRoutes.js     # Applications & claims endpoints
│   ├── blogRoutes.js            # Blog endpoints
│   ├── customerRoutes.js        # User, agent, and admin endpoints
│   ├── newsletterRoutes.js      # Newsletter endpoints
│   ├── paymentRoutes.js         # Stripe payment endpoints
│   ├── policyRoutes.js          # Policy endpoints
│   └── reviewRoutes.js          # Review endpoints
└── controllers/
    ├── applicationController.js
    ├── blogController.js
    ├── customerController.js
    ├── newsletterController.js
    ├── paymentController.js
    ├── policyController.js
    └── reviewController.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running [MongoDB](https://www.mongodb.com/) instance (Atlas or self-hosted)
- A [Firebase](https://firebase.google.com/) project with Authentication enabled
- A [Stripe](https://stripe.com/) account (for payment processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/trust-life-server.git
   cd trust-life-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see below)

4. **Run the server**

   ```bash
   # Production
   npm start

   # Development (with auto-reload)
   npm run dev
   ```

   The server will start on the port defined in `PORT` (default: `3000`).

---

## Environment Variables

Create a `.env` file in the project root. The following variables are required:

| Variable            | Description                                  | Example               |
| ------------------- | -------------------------------------------- | --------------------- |
| `PORT`              | Server port                                  | `3000`                |
| `DB_USER`           | MongoDB username                             | `myuser`              |
| `DB_PASS`           | MongoDB password                             | `mypassword`          |
| `FB_SERVICE_KEY`    | Base64-encoded Firebase service account JSON | `ewogICJ0eXBlIjog...` |
| `STRIPE_SECRET_KEY` | Stripe secret key (test or live)             | `sk_test_...`         |

> **Note:** `FB_SERVICE_KEY` must be the entire Firebase service account JSON string encoded in Base64. The server decodes it at runtime to initialize the Firebase Admin SDK.

---

## API Reference

Base URL: `http://localhost:{PORT}` (or your deployed domain)

### Authentication

Protected routes require a valid Firebase ID token in the `Authorization` header:

```http
Authorization: Bearer <firebase_id_token>
```

The server verifies the token using Firebase Admin SDK. Role-based logic is enforced at the controller level.

### Policies

| Method   | Endpoint            | Auth | Description                                           |
| -------- | ------------------- | ---- | ----------------------------------------------------- |
| `GET`    | `/all-policies`     | ❌   | List all policies (paginated, filterable, searchable) |
| `GET`    | `/popular-policies` | ❌   | Get top 8 most purchased policies                     |
| `GET`    | `/policies/:id`     | ❌   | Get a single policy by ID                             |
| `GET`    | `/policies`         | ✅   | Admin: get all policies                               |
| `POST`   | `/policies`         | ✅   | Admin: create a new policy                            |
| `PATCH`  | `/policies/:id`     | ✅   | Admin: update a policy                                |
| `DELETE` | `/policies/:id`     | ✅   | Admin: delete a policy                                |

### Applications & Claims

| Method  | Endpoint                                   | Auth | Description                                |
| ------- | ------------------------------------------ | ---- | ------------------------------------------ |
| `POST`  | `/policy-applications`                     | ✅   | Customer: submit a new application         |
| `GET`   | `/my-applications?email=...`               | ✅   | Customer: view my applications             |
| `GET`   | `/claim-requests/claim?email=...`          | ✅   | Customer: view claimable applications      |
| `PATCH` | `/claim-request/:applicationId`            | ✅   | Customer: submit a claim                   |
| `GET`   | `/policy-applications/:applicationId`      | ✅   | Any role: get single application details   |
| `GET`   | `/applications/paid`                       | ✅   | Admin: view all paid applications          |
| `PATCH` | `/policy-applications/:id/assign-agent`    | ✅   | Admin: assign an agent & approve           |
| `PATCH` | `/policy-applications/:id/reject`          | ✅   | Admin: reject an application               |
| `GET`   | `/assigned-applications?email=...`         | ✅   | Agent: view assigned applications          |
| `PATCH` | `/assigned-applications/:id/update-status` | ✅   | Agent: approve/reject assigned application |
| `GET`   | `/claim-requests`                          | ✅   | Agent: view claimed applications           |

### Customers & Agents

| Method   | Endpoint                       | Auth | Description                           |
| -------- | ------------------------------ | ---- | ------------------------------------- |
| `POST`   | `/customers`                   | ❌   | Register or find a customer           |
| `GET`    | `/limited-agents`              | ❌   | Get 3 featured agents for homepage    |
| `PUT`    | `/customers/update-last-login` | ✅   | Update last sign-in timestamp         |
| `GET`    | `/customers/:email`            | ✅   | Get customer profile                  |
| `PUT`    | `/customers/:email`            | ✅   | Update customer profile               |
| `GET`    | `/customers/role/:email`       | ✅   | Get role for dashboard routing        |
| `GET`    | `/customers`                   | ✅   | Admin: list all users                 |
| `GET`    | `/agents`                      | ✅   | Admin: list all agents (for dropdown) |
| `PATCH`  | `/customers/:id/promote`       | ✅   | Admin: promote user to agent          |
| `PATCH`  | `/customers/:id/demote`        | ✅   | Admin: demote agent to customer       |
| `DELETE` | `/customers/:id`               | ✅   | Admin: delete a customer              |

### Payments

| Method | Endpoint                 | Auth | Description                                 |
| ------ | ------------------------ | ---- | ------------------------------------------- |
| `POST` | `/create-payment-intent` | ❌   | Create a Stripe PaymentIntent (client-side) |
| `POST` | `/payments`              | ✅   | Save payment record after confirmation      |
| `GET`  | `/transactions`          | ✅   | Admin: list all payment transactions        |

### Blogs

| Method   | Endpoint           | Auth | Description                       |
| -------- | ------------------ | ---- | --------------------------------- |
| `GET`    | `/all-blogs`       | ❌   | List all published blogs          |
| `GET`    | `/blog-latest`     | ❌   | Get latest 8 blogs                |
| `GET`    | `/blogs/:id`       | ❌   | Get a single blog                 |
| `PATCH`  | `/blogs/visit/:id` | ❌   | Increment blog view count         |
| `GET`    | `/blogs?email=...` | ✅   | Admin: all blogs; User: own blogs |
| `POST`   | `/blogs`           | ✅   | Create a blog post                |
| `PUT`    | `/blogs/:id`       | ✅   | Update a blog post                |
| `DELETE` | `/blogs/:id`       | ✅   | Delete a blog post                |

### Reviews

| Method | Endpoint   | Auth | Description      |
| ------ | ---------- | ---- | ---------------- |
| `GET`  | `/reviews` | ❌   | List all reviews |
| `POST` | `/reviews` | ✅   | Submit a review  |

### Newsletter

| Method | Endpoint                   | Auth | Description                 |
| ------ | -------------------------- | ---- | --------------------------- |
| `POST` | `/newsletter-subscription` | ❌   | Subscribe to newsletter     |
| `GET`  | `/newsletters`             | ✅   | Admin: list all subscribers |

---

## Deployment

This project is configured for [Vercel](https://vercel.com/) serverless deployment via `vercel.json`.

1. Install the Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Add the environment variables in your Vercel dashboard under **Project Settings → Environment Variables**.

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Ammar Shahab**

- Email: [ashahab007@gmail.com](mailto:ashahab007@gmail.com)

Feel free to reach out for questions, feedback, or contributions.
