const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Required"],
    },
    name: {
      type: String,
      require: [true, "Required"],
    },
    password: {
      type: String,
      require: [true, "Required"],
    },
    status: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    phone: {
      type: String,
      require: [true, "Required"],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
