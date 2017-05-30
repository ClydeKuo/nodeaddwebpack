var cheerio = require('cheerio')
var request =require("request")
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var targetUrl='http://adpays.net/v.php?user=4297'
var proxyIp="http://127.0.0.1:1080"
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
var targetOptions = {
    method: 'GET',
    url: 'http://ip.chinaz.com/getip.aspx',
    timeout: 80000,
    encoding: null,
    // proxy:"http://83.239.58.162:8080"
};
var proxyList=[]
var option={
    url:"https://hidemy.name/en/proxy-list/",
    methods:"GET",
    proxy:proxyIp,
    headers:{
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'deflate, sdch, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
        'referer':"https://hidemy.name/en/",
        'upgrade-insecure-requests':'1',
        "authority":"hidemy.name",
        "cache-control":"max-age=0",
        'Cookie':"'__cfduid=dc52ee1850e2ae36a3cf8cd7cc7ca71bc1494513603; _ym_uid=1494513682773488310; _ym_isad=1; jv_enter_ts_EBSrukxUuA=1494513693373; jv_visits_count_EBSrukxUuA=1; PHPSESSID=0p8jhq1mchevvuifbe8emf1to3; PAPVisitorId=85678db782918021d3f50c71267befb9; _ga=GA1.2.1508972556.1494513676; _gid=GA1.2.1408522046.1494515825; _dc_gtm_UA-90263203-1=1; _ym_visorc_42065329=w; jv_pages_count_EBSrukxUuA=8"
    }
}
function getProxyIp(){
  request(option,function(error,response,body){
      if(error){console.log(error)
      }else if(response.statusCode==200){
        filterIp(body)
      }
  })
}
function filterIp(data){
  var $ = cheerio.load(data)
  var temp=$(".tdl")
  for(var i=0,len=temp.length;i<len;i++){
     var simpleProxyIp= $(temp[i]).text()
     var simpleProxy='http://'+simpleProxyIp+":"+$(temp[i]).next().text()
     targetOptions.proxy=simpleProxy
     verifyProxy(simpleProxy,simpleProxyIp)
  }
}
//验证代理是否可用
function verifyProxy(simpleProxy,simpleProxyIp){
  request(targetOptions, function (error, response, body) {
      try {
          if (error) throw error;
          body = body.toString();
          // console.log(body);
          eval(`var ret = ${body}`);
          // console.log("simpleProxy:"+simpleProxy)
          if (ret&&ret.ip==simpleProxyIp) {
              console.log(`验证成功==>> ${ret.address}`)
              ptp(simpleProxy)
              proxyList.push(simpleProxy)
              var IpList = mongoose.model('ipList', ipListSchema); 
              var ipList = new IpList({ ahref : simpleProxy})  
              ipList.save(function(err) {  
                              if (err) {console.log('保存失败')  
                                  return;  
                              }                                                                 
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
}
//paid to promote
function ptp(simpleProxy){
  request({
    method:"POST",
    url:'http://adpays.net/serve/dlvalid.php?var1=538&var2=http://adpays.net/v.php?user=4297&var3=deeacfecebb&var4=1494570942',
    proxy: simpleProxy,
    // proxy:"http://127.0.0.1:9999",
    followAllRedirects:true,
    headers:{
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'deflate, sdch, br',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
      'upgrade-insecure-requests':'1',
      "authority":"hidemy.name",
      "cache-control":"max-age=0",
      // "Connection":"keep-alive",
      'Cookie':"__cfduid=d76cafce38bd01b3b60041af7c7da412c1491010798; PHPSESSID=gflj3dti5bhj6rjol2130iheo7; TawkConnectionTime=0; __tawkuuid=e::adpays.net::nlF8BgfwL9/xShZQs7lP+IDLjoC4VJNJFauv4HokXlnn3l1uvpkAud9hlBKxHIXO::2; Tawk_5703f9be5c96cca60a9d16c2=vs3.tawk.to::0; ptp=1494564903; _ga=GA1.2.518476455.1494559785; _gid=GA1.2.1591825687.1494565013; _gat=1",

    }
  },function(error, response, body){
    if(error){
      console.log("error"+error)
    }else{
      console.log('bingo')
    }
  })
}

for(var i=0;i<15;i++){
  option.url="https://hidemy.name/en/proxy-list/?start="+i*64
  getProxyIp()
}
