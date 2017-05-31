
let targetOptions = {
    method: 'GET',
    url: 'http://ip.chinaz.com/getip.aspx',
    timeout: 80000,
    encoding: null,
};
//验证代理是否可用
function check(simpleProxy){
  new Promise(function(resolve, reject) {
    let simpleProxyIp=simpleProxy.split(':')[0]
    request(targetOptions, function (error, response, body) {
        try {
            if (error) throw error;
            body = body.toString();
            eval(`var ret = ${body}`);
            if (ret&&ret.ip==simpleProxyIp) {
                console.log(`验证成功==>> ${ret.address}`)
                resolve()
                  console.log('meow');
              })
            }
        } catch (e) {
            if(e.toString().match(/ETIMEDOUT/)){
              console.log("connect again:");
              // verifyProxy(simpleProxy,simpleProxyIp)
            }else{
              console.error("error:"+e);
            }
        }
    })
})
}

async function verifyProxy(){
  db.find().where('name').eq(collectionName).exec((err,list)=>{
    console.log('in '+collectionName)
      if(err){
          console.log(err)
      }else{
          let urls=list[0].urls
          urls.forEach((item)=>{

          })

      }
  })
}
