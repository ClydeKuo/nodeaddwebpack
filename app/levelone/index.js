import proxyList from './update/proxy-list.js'
import insertData from './util/insertData'
import uniq from './util/uniq.js'
import './db.js'
setInterval(async ()=>{
  let arrProxy= await proxyList(arrProxy)
  await insertData('proxy-list',arrProxy)
  uniq('proxy-list')
},10000000)
