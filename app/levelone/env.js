var proxyIp="http://127.0.0.1:1080"
if (ENV == 'pd') {
    console.log('This platform is linux:' + (process.platform == 'linux'));
    proxyIp = ""
}
module.exports=proxyIp
