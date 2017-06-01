var request =require("request")
let targetOptions = {
    method: 'GET',
    url: 'http://ip.chinaz.com/getip.aspx',
    timeout: 8000,
    encoding: null,
};
//验证代理是否可用
function check(simpleProxy,i){
  return new Promise(function(resolve, reject) {
      targetOptions.proxy=simpleProxy
      // targetOptions.proxy='http://127.0.0.1:1080'
      let simpleProxyIp=simpleProxy.split(':')[0]
      console.log(simpleProxy)
      console.log('checking')
      request(targetOptions, function (error, response, body) {
          try {
              if (error) throw reject(error);
              console.log('checked')
              body = body.toString();
              let arr=body.split("'")
              let ret={ip:arr[1],address:arr[3]}
              if (ret&&ret.ip==simpleProxyIp) {
                  console.log('验证成功==>> '+ret.address)
                  console.log('meow');
                  resolve(simpleProxy)
              }else{
                console.log('验证不成功==>> '+ret.address)
                reject()
              }
          } catch (e) {
              /*if(e.toString().match(/ETIMEDOUT/)){
                console.log("ETIMEDOUT happened, connect again");
                check(simpleProxy)
              }else{
                reject(e)
              }*/
              if(i<5){
                  console.log('connect '+ ++i+' times')
                  check(simpleProxy,i).then(()=>{},(e)=>{
                      console.log('error happened at '+i+' times:'+e)
                  })
              }
              reject(e)
          }
      })
  })
}
function updateCollection(collectionName,newlist){
  db.update({name : collectionName},
      {$set : { urls: newlist}},
      {safe : true, upsert : true},
      (err, rawResponse)=>{
          if (err) {
              console.log(err);
          } else {
              console.log('updateCollection success!')
          }
      }
  );
}

 function verifyProxy(collectionName){
  db.find().where('name').eq(collectionName).exec((err,list)=>{
    console.log('in '+collectionName)
      if(err){
          console.log(err)
      }else{
        console.log('got list')
          let urls=list[0].urls
          let len=urls.length
          let newlist=[]
          let times=0
          new Promise((resolve, reject)=>{
            urls.forEach((item,index)=>{
            check(urls[0],0).then((simpleProxy)=>{
                newlist.push(simpleProxy)
                console.log("bingo")
                checkresolve(len,times,resolve)
            },(e)=>{
                console.log('error happened'+e)
                checkresolve(len,times,resolve)
            })
          })
          }).then(()=>{
              console.log("complete!")
          })
          // updateCollection(collectionName,newlist)
      }
  })
}
function checkresolve(len,times,resolve){
    if(len==++times){
        resolve()
    }
}
module.exports=verifyProxy
