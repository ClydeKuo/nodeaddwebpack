var EventListener=require ('events').EventEmitter
var life =new EventListener
function didi(data){
console.log(data)
}
 life.on('haha',didi)
 life.on('haha',function(data){
    console.log(data)
 })

 life.removeListener('haha',didi)
// life.removeAllListeners()
 var ll=life.emit('haha','kkkk')
 console.log(life.listeners('haha').length)
//   console.log(EventEmitter.listenerCount())
console.log(EventListener.listenerCount(life,'haha'))