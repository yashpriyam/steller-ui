const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    programType: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    isPaymentSuccessfull: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export { Transaction };
