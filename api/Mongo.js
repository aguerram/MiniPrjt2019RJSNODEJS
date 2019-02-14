var Mongo = require("mongodb").MongoClient;

Mongo.connect("mongodb://localhost:27017/SchoolProject",function(err,db)
{
    if(err)
    {
        console.log(err);
    }

})