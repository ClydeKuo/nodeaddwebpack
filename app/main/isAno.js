var request =require("request")
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var targetOptions = {
    method: 'GET',
    url: 'http://ip.chinaz.com/getip.aspx',
    timeout: 8000,
    encoding: null,
    // proxy:"http://80.240.60.165:8081"
};
request(targetOptions, function (error, response, body) {
  console.log(111)
    try {
        if (error) throw error;
        body = body.toString();
        console.log(body);
        // eval(`var ret = ${body}`);
        var ret=body.replace(/ip/,"'ip'").replace(/address/,"'address'")
        var ret=JSON.parse(ret)
        if (ret) {
            console.log(`验证成功==>> ${ret.address}`);
        }
    } catch (e) {
        console.error("error:"+e);
    }
});
