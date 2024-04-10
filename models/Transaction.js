const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, 'status not indicated'],
      trim: true,
      maxlength: [30, "status length not valid"]
    },

    rent_date: {
      type: Date,
      required: true
    },

    successful_payment_date: {
      type: Date
    },

    slip_images: {
      // TODO Please Check if this declaration is valid or not
      type: [mongoose.Schema.ObjectId],
      ref: "transaction_slip"
    },

    campground: {
      type: mongoose.Schema.ObjectId,
      ref: "Campground",
      required: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    
    appointment: {
      type: mongoose.Schema.ObjectId,
      ref: "Appointment",
      required: true,
    }
  }
)

// Cascade delete appointments when a transaction is deleted
TransactionSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Transaction Slip being removed from transaction ${this._id}`);
    await this.model("TransactionSlip").deleteMany({ transaction: this._id });
    next();
  }
);

//Add tracnsactionSlip virtual to transaction

TransactionSchema.virtual("transactionSlip", {
  ref: "TransactionSlip",
  localField: "_id",
  foreignField: "transaction",
  justOne: false,
});

module.exports = mongoose.model("Transaction", TransactionSchema);