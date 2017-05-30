var cheerio = require('cheerio')
var request =require("request")
var IpList=require('./IpList.js')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var targetUrl='http://adpays.net/v.php?user=4297'
var proxyIp="http://127.0.0.1:1080"
if (process.platform == 'linux') {
    console.log('This platform is linux:' + (process.platform == 'linux'));
    proxy = ""
}
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
              // ptp(simpleProxy)
              // proxyList.push(simpleProxy)
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
// for(var i=0;i<15;i++){
//   option.url="https://hidemy.name/en/proxy-list/?start="+i*64
//   getProxyIp()
// }
option.url="https://hidemy.name/en/proxy-list/"
getProxyIp()