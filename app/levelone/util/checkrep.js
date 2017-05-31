// import db from './db.js'
var db=require('./db.js')
function checkrep(data){
  db.find().where('name').eq(data).exec((err,list)=>{
      if(err){
          console.log(err)
      }else{
          // console.log(list[0].urls)
          var newlist=uniq(list[0].urls)
          if(newlist.length==list[0].urls.length){
            console.log('nothing changed')
            return
          }
          db.update({name : data},
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
}
//去重
function uniq(list){
    var tempList=[]
    for(var j=0,len=list.length;j<len;j++){
        tempList.indexOf(list[j])==-1?tempList.push(list[j]):"";
    }
    return tempList
}
// checkrep('proxy-list')
module.exports=checkrep
