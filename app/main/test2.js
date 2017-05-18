var request =require("request")
var selff=require('./tem.js')
var htmlbody=require('./v.php')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const {window} = new JSDOM(htmlbody, {
      // url: "http://adpays.net/v.php?user=4297",
      // referrer: "http://adpays.net/v.php?user=4297",
      // contentType: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      // userAgent: "Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
      // includeNodeLocations: true,
      runScripts: "dangerously"
    });
selff.selff(window);
