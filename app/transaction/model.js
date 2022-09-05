const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "Required"] },
      category: { type: String, require: [true, "Required"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Required"] },
      coinQuantity: { type: String, require: [true, "Required"] },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "Required"] },
      type: { type: String, require: [true, "Required"] },
      bankName: { type: String, require: [true, "Required"] },
      noRekening: { type: String, require: [true, "Required"] },
    },
    name: {
      type: String,
      require: [true, "Required"],
    },
    accountUser: {
      type: String,
      require: [true, "Required"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: { type: String, require: [true, "Required"] },
      phoneNumber: { type: String, require: [true, "Required"] },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
