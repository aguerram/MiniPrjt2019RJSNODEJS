const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationsSchema = new Schema({
    by:Object,
    target:Object,
    at:{
        default:Date.now(),
        type:Date
    },
    contenu:String,
    name:String
});
module.exports = mongoose.model("notifications",NotificationsSchema);
