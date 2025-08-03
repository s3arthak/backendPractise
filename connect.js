const mongo= require('mongoose');

async function connectToMongo(url){
     return mongo.connect(url);
}
module.exports= connectToMongo;