var express = require('express');
var router = express.Router();
var request = require('request');
var mongojs = require('mongojs');
var db = mongojs('mongodb://hackme:hackme@localhost:27017/radiodb', ['icecast']);
 
var currentTrack;
// API TASK
/*
    UNSECURE
    - getMeta : Returns track metadata
    - getAlbumArt : Returns URL to album artwork

    SECURE
    - requestTrack : Sends request to liquidsoap to play track
    
*/

// Get IceCAST Servers
router.get('/servers', function(req, res, next){
    db.icecast.find( function(err, servers){
        if(err){
            res.send(err);
        }
        console.log(servers);
        res.json(servers);
    });
});

// Get Single IceCAST Server
router.get('/servers/:id', function(req, res, next){
    db.icecast.findOne( {_id: mongojs.ObjectID(req.params.id)}, function(err, server){
        if(err){
            res.send(err);
        }
        res.json(server);
    });
});

// Save IceCAST Server
router.post('/servers', function(req, res, next){
    var server = req.body;

    if (!server.name || !server.uri){
        res.sendStatus(400);
        res.json({
            "error" : "Bad Data"
        })
    }else{
        db.icecast.save(server, function(err, server){
            if(err){
                res.send(err);
            }
            console.log('sending: ', server);
            res.json(server);
        })
    }
});

// Delete IceCAST Server
router.delete('/servers/:id', function(req, res, next){
    db.icecast.remove( {_id: mongojs.ObjectID(req.params.id)}, function(err, server){
        if(err){
            res.send(err);
        }
        console.log('deleting: ', server);
        res.json(server);
    });
});

// Update IceCAST Server
router.put('/servers/:id', function(req, res, next){
    var server = req.body;
    var updServer = {};

    if(server.name){
        updServer.name = server.name;
    }

    if(server.uri){
        updServer.uri = server.uri;
    }

    if(!updServer){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else{
        console.log('updServer: ',server);
        db.icecast.update( {_id: mongojs.ObjectID(req.params.id)}, updServer, {}, function(err, server){
            if(err){
                res.send(err);
            }
            console.log('updated: ',server);
            res.json(server);
        });
    }
});


router.get('/getMeta', function(req, res, next){
    // query for currently playing track
    // search mongoDB for track info
    // query last.fm if track info missing or old
    request.get('http://localhost:7000/getmeta', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) 
            this.currentTrack = body;
            res.send(body);
        }
    })
});


router.get('/getAlbumArt', function(req, res, next){
    // http://localhost:7000/getmeta
    request.get('http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=2333daa7177f832f1f687395c0738f87&artist=General+Mumble&track=Appleshake&format=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) 
            res.send(body);
        }
    })
});
module.exports = router;