var express = require('express');
var router = express.Router();
var pool = require('../modules/pool')

// route.get and route.put etc will be in here



router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, client, done){
      if (errorConnectingToDatabase){
        console.log('Error connecting to database', errorConnectingToDatabase);
        res.sendStatus(500);
        
      } else {
        client.query('SELECT * FROM tasks ORDER BY id;', function(errorMakingQuery, result){
          done();
          if (errorMakingQuery){
            console.log('Error making query', errorMakingQuery);
            res.sendStatus(500);
            
          }else {
            res.send(result.rows);
          }
        })
      }
    })
  })
  



module.exports = router;