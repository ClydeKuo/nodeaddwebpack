var request =require("request")
let targetOptions = {
    method: 'GET',
    url: 'http://ip.chinaz.com/getip.aspx',
    timeout: 8000,
    encoding: null,
};
let checkedArr=[]
let collectionName=''
//验证代理是否可用
function check(simpleProxy,times=1){
  return new Promise(function(resolve, reject) {
      targetOptions.proxy=simpleProxy
      // targetOptions.proxy='http://127.0.0.1:1080'
      let simpleProxyIp=simpleProxy.split(':')[0]
      console.log('checking '+simpleProxy)
      request(targetOptions, function (error, response, body) {
          try {
              if(error){
                    // if(times<6){
                    //     console.log(simpleProxy+' request error happened  and request at '+ ++times+' times')
                    //     // check(simpleProxy,times).then(()=>{},()=>{})
                    // }else{
                    //      reject(simpleProxy+' request error:'+error)
                    // }
                    reject('fuck')
                }else{
                    body = body.toString();
                    let arr=body.split("'")
                    let ret={ip:arr[1],address:arr[3]}
                    console.log('ret='+JSON.stringify(ret))
                    if (ret&&ret.ip) {
                        console.log('验证成功==>> '+ret.address)
                        resolve(simpleProxy)
                    }else{
                        reject('验证不成功==>> '+ret.address)
                    }
                }
          } catch (e) {
              reject('formatting error:'+e)
          }
      })
  })
}
//更新数据
function updateCollection(newlist){
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

//获取待验证的IP地址
 function verifyProxy(name){
    collectionName=name
    db.find().where('name').eq(collectionName).exec((err,list)=>{
        console.log('in '+collectionName)
        if(err){
            console.log(err)
        }else{
            console.log('got list')
            repeation(list[0].urls)
            // updateCollection(collectionName,newlist)
        }
    })
}
//按顺序发送request请求
async function repeation(urls){
    let len=urls.length
    // let add=addSelf()
    let times=1
    for(let i=0;i<len;i++){
        await check(urls[i]).then((simpleProxy)=>{
            console.log(urls[i] +" bingo")
            checkedArr.push(simpleProxy)
        },(e)=>{
            //重新验证
            if(e=='fuck'){
                if(times<2){
                    console.log(urls[i]+' request error happened  and request at '+ ++times+' times')
                    i--
                }else{
                    times=1
                    console.log(urls[i]+' request error')
                }
            }else{
                console.log(e)
            }
        })
    }
    console.log(checkedArr.length)
    updateCollection(checkedArr)
}
module.exports=verifyProxy
