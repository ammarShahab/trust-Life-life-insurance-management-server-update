// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const {
  saveCustomer,
  updateLastLogin,
  getCustomerByEmail,
  updateCustomer,
  getCustomerRole,
  getAllCustomers,
  getLimitedAgents,
  getAgents,
  promoteToAgent,
  demoteToCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const verifyFBToken = require("../middleware/verifyFBToken");

// ========== PUBLIC ROUTES ==========
// POST /customers — register/find customer
router.post("/customers", saveCustomer);

// GET /limited-agents — get 3 agents for homepage
router.get("/limited-agents", getLimitedAgents);

// ========== PROTECTED ROUTES ==========
// PUT /customers/update-last-login — update last sign-in time
router.put("/customers/update-last-login", verifyFBToken, updateLastLogin);

// GET /customers/:email — get single customer
router.get("/customers/:email", verifyFBToken, getCustomerByEmail);

// PUT /customers/:email — update profile
router.put("/customers/:email", verifyFBToken, updateCustomer);

// GET /customers/role/:email — get role for dashboard routing
router.get("/customers/role/:email", verifyFBToken, getCustomerRole);

// GET /customers — get all users (admin)
router.get("/customers", verifyFBToken, getAllCustomers);

// GET /agents — get all agents (for assignment dropdown)
router.get("/agents", verifyFBToken, getAgents);

// PATCH /customers/:id/promote — promote to agent
router.patch("/customers/:id/promote", verifyFBToken, promoteToAgent);

// PATCH /customers/:id/demote — demote to customer
router.patch("/customers/:id/demote", verifyFBToken, demoteToCustomer);

// DELETE /customers/:id — delete customer
router.delete("/customers/:id", verifyFBToken, deleteCustomer);

module.exports = router;
