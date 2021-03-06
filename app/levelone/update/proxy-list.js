var cheerio = require('cheerio')
var request =require("request")
var proxyIp=require('../env.js')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
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
  return new Promise((resolve, reject) => {
    request(option,function(error,response,body){
      if(error){console.log(error)
      }else if(response.statusCode==200){
        console.log('got web data')
        let arrProxy=filterIp(body)
        resolve(arrProxy)
      }else{
          console.log(response.statusCode)
      }
  })})
}
function filterIp(data){
  var $ = cheerio.load(data)
  var temp=$(".tdl")
  let arrProxy=[]
  for(var i=0,len=temp.length;i<len;i++){
     var simpleProxyIp= $(temp[i]).text()
     var simpleProxy='http://'+simpleProxyIp+":"+$(temp[i]).next().text()
     arrProxy.push(simpleProxy)
  }
  return arrProxy
}

module.exports=getProxyIp
