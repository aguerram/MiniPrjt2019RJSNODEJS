const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ModuleSchema = new Schema({
    code:{
        type:String,
    },
    filiere:Object,
    title:String
});
module.exports = mongoose.model("modules",ModuleSchema);
