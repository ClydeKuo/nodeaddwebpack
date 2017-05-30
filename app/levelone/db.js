var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongourl = 'mongodb://clyde:asdqwe123@list-shard-00-00-si9p2.mongodb.net:27017,list-shard-00-01-si9p2.mongodb.net:27017,list-shard-00-02-si9p2.mongodb.net:27017/list?ssl=true&replicaSet=list-shard-0&authSource=admin'
// 获得db对象
let db = mongoose.connection;
// 各种事件
// connection的事件列表可查看:http://mongoosejs.com/docs/api.html#connection_Connection
// 或 ./node_modules/mongoose/lib/connection.js#Connection()
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', ()=>{console.log('db open');});
db.on('connecting', ()=>{console.log('db connecting...');});
db.on('connected', ()=>{console.log('db connected');});
db.on('disconnecting', ()=>{console.log('db disconnecting...');});
db.on('disconnected', ()=>{console.log('db disconnected');});
db.on('close', ()=>{console.log('db close');});
mongoose.connect(mongourl);  
var Schema = mongoose.Schema;  
//骨架模版  
var ipListSchema = new Schema({  
    name:String,
    urls : Array  
})  
//模型  
var IpList = mongoose.model('ipList', ipListSchema); 
module.exports=IpList