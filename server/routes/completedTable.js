var express = require('express');
var router = express.Router();
var pool = require('../modules/pool')

router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, client, done){
      if (errorConnectingToDatabase){
        console.log('Error connecting to database', errorConnectingToDatabase);
        res.sendStatus(500);
        
      } else {
        client.query(`SELECT * FROM tasks WHERE completed = 'Yes' ORDER BY id;`, function(errorMakingQuery, result){
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



