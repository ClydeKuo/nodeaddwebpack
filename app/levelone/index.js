import proxyList from './update/proxy-list.js'
// import proxyList from './getList/proxy-list.js'
import './db.js'
import insertData from './util/insertData'
import uniq from './util/uniq.js'
import verifyProxy from './util/verifyProxy.js'
setInterval(async ()=>{
  let arrProxy= await proxyList(arrProxy)
  await insertData('proxy-list',arrProxy)
  await uniq('proxy-list')
  verifyProxy('proxy-list')
},3600000)


