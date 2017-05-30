var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongourl = 'mongodb://clyde:asdqwe123@list-shard-00-00-si9p2.mongodb.net:27017,list-shard-00-01-si9p2.mongodb.net:27017,list-shard-00-02-si9p2.mongodb.net:27017/list?ssl=true&replicaSet=list-shard-0&authSource=admin'
mongoose.connect(mongourl);  
var Schema = mongoose.Schema;  
//骨架模版  
var ipListSchema = new Schema({  
    ahref : String  
})  
//模型  
var IpList = mongoose.model('ipList', ipListSchema); 
var ipList = new IpList({ ahref : '1234567'})  
ipList.save(function(err) {  
                if (err) {console.log('保存失败')  
                    return;  
                }                                                                 
                console.log('meow'); 
                return 
            })  