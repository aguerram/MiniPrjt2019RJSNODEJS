const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FiliereSchema = new Schema({
    code:{
        type:String,
        unique:true
    },
    title:String
});
module.exports = mongoose.model("filieres",FiliereSchema);
