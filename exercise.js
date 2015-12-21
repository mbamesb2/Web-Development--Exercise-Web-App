var mysql = require('mysql');

var express = require('express');
var app = express();

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'student',
    password        : 'default',
    database        : 'student'
});

module.exports.pool = pool;


app.use(express.static('public'));
app.set('port', 3000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/reset-table',function(req,res,next){
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts(" +
        "id INT PRIMARY KEY AUTO_INCREMENT," +
        "name VARCHAR(255) NOT NULL," +
        "reps INT," +
        "weight INT," +
        "date DATE," +
        "lbs BOOLEAN)";
        pool.query(createString, function(err){
            res.send(null);
    })
  });
});


app.get('/display', function(req, res){
    
   pool.query("SELECT * FROM workouts", function(err, rows, fields){
       if(err){
            console.log(err);
           return;
       }
    var results = JSON.stringify(rows);
    res.send(results);
    
   });
});

app.post('/insert', function(req, res, next){
    var context = {};
   pool.query("INSERT INTO workouts(name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){
       if(err){
           next(err);
           return;
       }
    context.id= result.insertId;
    
    pool.query("SELECT * FROM workouts", function(err, rows, fields){
       if(err){
            console.log(err);
           return;
       }
    var context = JSON.stringify(rows);

    res.send(context);
    
   });
   
   });
});

app.post('/delete', function(req, res, next){
   var context = {}; 
   pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
       if(err){
           next(err);
           return;
       }
    
    pool.query("SELECT * FROM workouts", function(err, rows, fields){
       if(err){
            console.log(err);
           return;
       }
    var context = JSON.stringify(rows);
    res.send(context);
   });
    });
});


app.post('/update',function(req,res,next){
  var context = {};

  pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }

    if(result.length == 1){
        var curVals = result[0];

        pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
            [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id || curVals.id],
            function(err, result){
                if(err){
                    next(err);
                return;
        }

        //context.results = "Updated " + result.changedRows + " rows.";
        //res.send('home',context);
      });
    }
    pool.query("SELECT * FROM workouts", function(err, rows, fields){
       if(err){
            console.log(err);
           return;
       }
    var context = JSON.stringify(rows);
    res.send(context);
   });
  });
});

app.post('/retrieve',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    var context = JSON.stringify(result);
    res.send(context);
  });
});




app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});