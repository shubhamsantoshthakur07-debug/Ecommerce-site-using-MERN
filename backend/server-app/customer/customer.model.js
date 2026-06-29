const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    CUserId: { type: String, unique: true, required: true },
    CUserPass: { type: String, required: true },
    CustomerName: { type: String, required: true },
    CAddress: { type: String },
    CStId: { type: Number },
    CCtId: { type: Number },
    CContact: { type: Number },
    CEmail: { type: String, unique: true, required: true },
    CPicName: { type: String, default: "" },
    Cid: { type: Number, unique: true, required: true },
    Status: { type: String, default: "Inactive" }
}, { collection: "Customer" });

module.exports = mongoose.model("Customer", CustomerSchema);