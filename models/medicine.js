const mongoose = require("mongoose")
const medicineSchema = mongoose.Schema({
type: String,
cost: {type:Number,required:true},
name: {type:String,unique:true},
});
module.exports = mongoose.model("Medicine", medicineSchema)