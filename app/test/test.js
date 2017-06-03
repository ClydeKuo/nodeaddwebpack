require('../lib/db')
// tdb.find({port:51413}).exec(function(err,list){
//     debugger
// })
function check(infohash){
    return tdb.find({infohash:infohash})
}
check('ad01e26fff09b01b67043b9616070e38857848').then(function(res){
    console.log(res)
},function(err){
    console.log('err:  '+err)
})