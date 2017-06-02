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

p2p.on('metadata', function (metadata) {
    console.log('----------------------------')
    console.log(new Date())
    metadata.info.name=metadata.info.name.toString()
    metadata.pieces.name=metadata.pieces.name.toString()
    console.log(metadata);
});

p2p.listen(6881, '0.0.0.0');