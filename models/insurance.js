const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  policyHolder: { type: String, required: true },
  policyNo: { type: String, required: true },
  address: { type: String, required: true },
  paymentTillDate: { type: String, required: true },
  totalPayment: { type: String, required: true },
});

module.exports = mongoose.model("Insurance", insuranceSchema);
