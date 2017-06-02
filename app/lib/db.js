var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongourl = 'mongodb://clyde:asdqwe123@list-shard-00-00-si9p2.mongodb.net:27017,list-shard-00-01-si9p2.mongodb.net:27017,list-shard-00-02-si9p2.mongodb.net:27017/p2p?ssl=true&replicaSet=list-shard-0&authSource=admin'
// 获得db对象
var db = mongoose.connection;
// 各种事件
// connection的事件列表可查看:http://mongoosejs.com/docs/api.html#connection_Connection
// 或 ./node_modules/mongoose/lib/connection.js#Connection()
db.on('error', console.error.bind(console, 'p2p connection error:'));
db.on('open', ()=>{console.log('p2p db open');});
db.on('connecting', ()=>{console.log('p2p db connecting...');});
db.on('connected', ()=>{console.log('p2p db connected');});
db.on('disconnecting', ()=>{console.log('p2p db disconnecting...');});
db.on('disconnected', ()=>{console.log('p2p db disconnected');});
db.on('close', ()=>{console.log('p2p db close');});
mongoose.connect(mongourl);
var Schema = mongoose.Schema;
//骨架模版
var torrentSchema = new Schema({
    info:Object,
    address : String,
    port:Number,
    infohash:String,
    magnet:String
})
//模型
var torrent = mongoose.model('torrent', torrentSchema);
// module.exports=IpList
global.tdb=torrent
