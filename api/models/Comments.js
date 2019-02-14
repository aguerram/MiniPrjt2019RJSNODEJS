const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
    by:Object,
    postid:Object,
    at:{
        default:Date.now(),
        type:Date
    },
    contenu:String,
    name:String
});
module.exports = mongoose.model("comments",CommentsSchema);
