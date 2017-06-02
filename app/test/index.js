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
p2p.on('metadata', function (metadata) {
    console.log('----------------------------')
    console.log(new Date())
    saveData(metadata)
    console.log(metadata);
});

p2p.listen(6881, '0.0.0.0');