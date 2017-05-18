var request =require("request")
var selff=require('./tem.js')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
    const {window} = new JSDOM('<html><script scr="http://ootid8wao.bkt.clouddn.com/jsdom.js"></script></html>', {
      runScripts: "dangerously"
    });
selff.selff(window);