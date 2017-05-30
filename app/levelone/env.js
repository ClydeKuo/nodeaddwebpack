var proxyIp="http://127.0.0.1:1080"
if (process.platform == 'linux') {
    console.log('This platform is linux:' + (process.platform == 'linux'));
    proxy = ""
}
module.exports=proxyIp