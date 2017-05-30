var MongoClient = require('mongodb').MongoClient;
// var globaldb=''
var DB_CONN_STR = "mongodb://clyde:asdqwe123@list-shard-00-00-si9p2.mongodb.net:27017,list-shard-00-01-si9p2.mongodb.net:27017,list-shard-00-02-si9p2.mongodb.net:27017/list?ssl=true&replicaSet=list-shard-0&authSource=admin"
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    /*(new DHTSpider({address: '0.0.0.0', port: 6881,db:db})).start();
      db.close();*/
      if(err){
        console.log(err)
      }else{
        // globaldb=db
        insertData(db, function(result) {
            console.log(result);
            db.close();
        });
        debugger
        console.log(db.collection("site").find())
      }
      // db.close()
});
// mongodb://clyde:asdqwe123@list-shard-00-00-si9p2.mongodb.net:27017,list-shard-00-01-si9p2.mongodb.net:27017,list-shard-00-02-si9p2.mongodb.net:27017/admin?ssl=true&replicaSet=list-shard-0&authSource=admin
// exports.globaldb

var insertData = function(db, callback) {  
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = {"name":"菜鸟教程","url":"www.runoob.com"}
    collection.insert(data, function(err, result) { 
        if(err){
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}