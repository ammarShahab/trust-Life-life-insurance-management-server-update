const { default: mongoose } = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    photoURL: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^$|^https?:\/\/.+/,
        "Please provide a valid photo URL or leave empty",
      ],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["customer", "agent", "admin"],
        message:
          "Role '{VALUE}' is not supported. Must be customer, agent, or admin",
      },
      default: "customer",
    },
    // Firebase UID for reference (optional but useful)
    firebaseUid: {
      type: String,
      trim: true,
      sparse: true, // Allows null/undefined, but enforces uniqueness when present
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

// Indexes for fast lookups
// customerSchema.index({ email: 1 });
customerSchema.index({ role: 1 });
customerSchema.index({ customerName: "text" });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
