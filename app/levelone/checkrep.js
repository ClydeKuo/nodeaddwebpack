// import db from './db.js'
var db=require('./db.js')
db.find().where('name').eq('proxy-list').exec((err,list)=>{
    if(err){
        console.log(err)
    }else{
        // console.log(list[0].urls)
        var newlist=derep(list[0].urls)
        // console.log(newlist)
        db.update({name : 'proxy-list'},
            {$set : { urls: newlist}},
            {safe : true, upsert : true},
            (err, rawResponse)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log('update success!')
                }
            }
        );
    }
})
//去重
function derep(list){
    var tempList=[]
    for(var j=0,len=list.length;j<len;j++){
        tempList.indexOf(list[j])==-1?tempList.push(list[j]):"";
    }
    return tempList
}
// db.close()