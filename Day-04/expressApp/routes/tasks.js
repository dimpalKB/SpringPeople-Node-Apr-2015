var express = require('express');
var router = express.Router();

var taskList = [
    {id : 1, name : 'Explore MongoDb', isCompleted : false},
    {id : 2, name : 'Practice JavaScript', isCompleted : false},
    {id : 3, name : 'Master Node.js', isCompleted : false},
    {id : 4, name : 'Answer - what is ES6?', isCompleted : false}
];

/* GET tasks listing. */
//get - /tasks -> list of all the tasks
router.get('/', function(req, res, next) {
   res.render('tasks/index', {list : taskList})
});


//get - /tasks/new -> serve a html page where the user can submit the new task
router.get('/new', function(req,res,next){
    res.render('tasks/new');
});

//post - /tasks/new -> add the incoming task to the list and redirect the user to /tasks
router.post('/new', function( req, res, next){
    var newId = taskList.reduce(function(seed, task){
        return seed > task.id ? seed : task.id
    }, 0) + 1;
    var newTask = {
        id : newId,
        name : req.body.newTask,
        isCompleted : false
    };
    taskList.push(newTask);
    res.redirect('/tasks');
});


module.exports = router;
