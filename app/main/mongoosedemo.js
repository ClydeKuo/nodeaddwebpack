var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongourl = 'mongodb://clyde:asdqwe123@list-shard-00-00-si9p2.mongodb.net:27017,list-shard-00-01-si9p2.mongodb.net:27017,list-shard-00-02-si9p2.mongodb.net:27017/list?ssl=true&replicaSet=list-shard-0&authSource=admin'
mongoose.connect(mongourl);  
var Schema = mongoose.Schema;  
//骨架模版  
var demoSchema = new Schema({  
    ahref : String  
})  
//模型  
var Demo = mongoose.model('demo', demoSchema); 
var demo = new Demo({ ahref : '1234567'})  
demo.save(function(err) {  
                                                                           
                console.log('meow'); 
                return 
            })  
var Demo2 = mongoose.model('demo', demoSchema); 
var demo2 = new Demo2({ ahref : 'qwety'})  
demo2.save(function(err) {  
                                                                           
                console.log('meow'); 
                return 
            })  