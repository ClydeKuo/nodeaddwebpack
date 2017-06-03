'use strict';

var P2PSpider = require('../lib');

var p2p = P2PSpider({
    nodesMaxSize: 1,   // be careful
    maxConnections: 1, // be careful
    timeout: 5000
});

p2p.ignore(function (infohash, rinfo, callback) {
    // false => always to download the metadata even though the metadata is exists.
    var theInfohashIsExistsInDatabase = false;
    callback(theInfohashIsExistsInDatabase);
});

// 写入数据
function saveData(data){
    var torrent = new tdb(data)
    torrent.save(function(err) {
      if (err) {console.log('保存失败')
          return;
      }
      console.log('meow');
    })
}

function change(value){
    if(value/1024>=1&&value/1024<1024){
        return Math.round(value/1024)+'kb'
    }else if(value/1048576>=1&&value/1048576<1024){
        return Math.round(value/1048576)+"mb"
    }else if(value/1073741824>=1&&value/1073741824<1024){
        return Math.round(value/1073741824) +'gb'
    }else if(value/1099511627776>=1&&value/1099511627776<1024){
        return Math.round(value/1099511627776) +'tb'
    }else{
        return 'NaN: '+value
    }
}
p2p.on('metadata', function (metadata) {
    tdb.find({infohash:metadata.infohash}).then(function(res){
        if(res.length=0){
            console.log('----------------------------')
            console.log(new Date())
            var data={infohash:metadata.infohash,
                    magnet:metadata.magnet,
                    name:metadata.info.name.toString(),
                    length:change(metadata.info.length)
            }
            saveData(data)
            console.log(data);
        }else{
            console.log('repeated')
        }
    },function(err){
        console.log('err: '+err)
    })
});

p2p.listen(6881, '0.0.0.0');