const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    f_name:String,
    l_name:String,
    type:Number,
    email :{
        type :String,
        unique:true,
    },
    password:String,
    filiere:String,
    joined_in:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    confirmed:{
        type:Boolean,
        default:false
    }
});
module.exports = mongoose.model("users",UserSchema);
