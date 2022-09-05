const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Required"],
    },
    bankName: {
      type: String,
      require: [true, "Required"],
    },
    noRekening: {
      type: String,
      require: [true, "Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
