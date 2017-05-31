// 更新数据
function insertData(collectionName,arrProxy){
    return db.find().where('name').eq(collectionName).exec((err,list)=>{
      console.log('in '+collectionName)
        if(err){
            console.log(err)
        }else{
            console.log('old array length:'+list[0].urls.length)
            var newlist=list[0].urls.concat(arrProxy)
            db.update({name : collectionName},
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
module.exports=insertData
