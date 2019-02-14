const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CoursSchema = new Schema({
    by:Object,
    at:{
        default:Date.now(),
        type:Date
    },
    type:Number,
    module:Object,
    filiere:Object,
    title:String,
    contenu:String
});
module.exports = mongoose.model("lessons",CoursSchema);
