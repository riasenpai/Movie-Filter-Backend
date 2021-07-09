var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

router.get('/', function (req, res) {
    const dbName = 'topMovies';
    const client = new MongoClient(`mongodb+srv://${process.env["DB_USERNAME"]}:${process.env["DB_PASSWORD"]}@cluster0.7gj80.mongodb.net/topMovies?serverSelectionTryOnce=false&serverSelectionTimeoutMS=15000&w=majority`);
    client.connect(function(err) {
        if (err) {
            console.log("Unable to connect to server", err);
            return res.send("Unable to connect to server");
        } else {
            const db = client.db(dbName);
            console.log("Connected to server");
            const movieCollection = db.collection("movies");
            let queryParams = {}
            console.log(req.query)
            if(req.query['genre']){
                queryParams = {genre: {$in: req.query['genre'].split(',')}}
            }
            console.log(queryParams)
            movieCollection.find(queryParams).toArray(function(err, docs) {
                if (err) {
                    console.log("Found the following err after connection", err);
                    return res.send("Unable to connect to server");
                }
                console.log('Found the following records');
                console.log(docs);
                res.send(docs)
            })
        }
    })
});

router.get('/genre',function(req, res){
    const dbName = 'topMovies';
    const client = new MongoClient(`mongodb+srv://${process.env["DB_USERNAME"]}:${process.env["DB_PASSWORD"]}@cluster0.7gj80.mongodb.net/topMovies?serverSelectionTryOnce=false&serverSelectionTimeoutMS=15000&w=majority`);
    client.connect(function(err) {
        if (err) {
            console.log("Unable to connect to server", err);
            return res.send("Unable to connect to server");
        } else {
            const db = client.db(dbName);
            console.log("Connected to server");
            const movieCollection = db.collection("movies");
            
            movieCollection.find({},{genre:1}).toArray(function(err, docs) {
                if (err) {
                    console.log("Found the following err after connection", err);
                    return res.send("Unable to connect to server");
                }
                console.log('Found the following records');
                console.log(docs);
                res.send([...new Set(docs.map(doc =>{
                    return doc['genre']
                }))])
            })
        }
    })
})



  
module.exports = router;