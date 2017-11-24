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


  router.put('/:id', function (req, res) { //params = whatever is after the whack on a website (after/shoes/)
    var taskToSetComplete = req.params.id //whatever is at the end set it equal to the above property
    pool.connect(function (errorConnectingToDatabase, client, done) { 
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database     
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);//sending something went wrong, you don't need to know the details

        } else {
            //we connected to the database!!!
            //now we are going to GET things from the DB .gets should have selects in them
            client.query(`UPDATE tasks SET completed = 'Yes' WHERE id=$1`, [taskToSetComplete], function (errorMakingQuery, result) { // this is the callback function we make after our query runs
                //can't put req.body ^ here or you'll get hacked    
                done(); //it just ran, close the connection we don't need it anymore, put it back in the pool
                if (errorMakingQuery) {
                    // Query failed. Did you test it in postico?
                    //log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);

                } else {
                    res.sendStatus(200); //this is our array of objects
                }
            }) //test queries in postico first and then copy and paste, semicolon included

        }
    });
}); // end router.put


module.exports = router;