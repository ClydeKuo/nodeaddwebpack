var request =require("request")
let targetOptions = {
    method: 'GET',
    url: 'http://ip.chinaz.com/getip.aspx',
    timeout: 80000,
    encoding: null,
};
//验证代理是否可用
function check(simpleProxy){
  return new Promise(function(resolve, reject) {
      targetOptions.proxy=simpleProxy
      let simpleProxyIp=simpleProxy.split(':')[0]
      console.log('checking')
      request(targetOptions, function (error, response, body) {
          try {
              if (error) throw error;
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
              if(e.toString().match(/ETIMEDOUT/)){
                console.log("ETIMEDOUT happened, connect again");
                check(simpleProxy)
              }else{
                reject(e)
              }
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
          let newlist=[]
          check(urls[0]).then(()=>{},()=>{})
          // urls.forEach( async (item)=>{
          //   let simpleProxy=  await check(item)
          //   newlist.push(simpleProxy)
          // })

          // updateCollection(collectionName,newlist)
      }
  })
}
module.exports=verifyProxy
