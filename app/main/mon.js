var MongoClient = require('mongodb').MongoClient;
import DHTSpider from'./nodeDHT.js'
// var DB_CONN_STR = 'mongo -u clyde -p asdqwe123 --host localhost:27017 --authenticationDatabase admin';
// var DB_CONN_STR = 'mongodb://runoob:asdqwe123@104.160.45.118:27017/runoob'
let DB_CONN_STR={pd:'mongodb://runoob:asdqwe123@localhost:27017/runoob',dev:'mongodb://runoob:asdqwe123@104.160.45.118:27017/runoob'}[ENV]

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    (new DHTSpider({address: '0.0.0.0', port: 6881,db:db})).start();
      db.close();
});
