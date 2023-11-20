const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      required: true,
    },
    isPaymentSuccessfull: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export { Transaction };
