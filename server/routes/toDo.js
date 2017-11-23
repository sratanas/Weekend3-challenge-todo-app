var express = require('express');
var router = express.Router();
var pool = require('../modules/pool')

// route.get and route.put etc will be in here

router.post('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, client, done){
      if (errorConnectingToDatabase){
        console.log('Error conecting to database', errorConnectingToDatabase);
      } else{
        client.query(`INSERT INTO tasks (task)
          VALUES ($1);`, [req.body.task], function(errorMakingQuery, result){
              done();
              if (errorMakingQuery){
                console.log('Error making query', errorMakingQuery);
                res.sendStatus(500);
              } else{
                res.sendStatus(201);
              }
          })
      }
    })
  })

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
  

  router.delete('/:id', function(req, res){
    var taskToDelete = req.params.id
    pool.connect(function(errorConnectingToDatabase, client, done){
      if (errorConnectingToDatabase){
        console.log('Error connecting to database', errorConnectingToDatabase);
        res.sendStatus(500);
        
      } else {
        client.query(`DELETE FROM tasks WHERE id = $1`, [taskToDelete],function(errorMakingQuery, result){
          done();
          if (errorMakingQuery){
            console.log('Error making query', errorMakingQuery);
            res.sendStatus(500);
            
          } else {
            res.sendStatus(200);
          }
        })
      }
    })
  });//end router delete

module.exports = router;