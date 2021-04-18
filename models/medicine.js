const mongoose = require("mongoose")
const medicineSchema = mongoose.Schema({
type: String,
cost: Number,
name: String
})
module.exports = mongoose.model("Medicine", medicineSchema)