var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService.js');



/* GET tasks listing. */
//get - /tasks -> list of all the tasks
router.get('/', function(req, res, next) {
   res.render('tasks/index', {list : taskService.getAll()})
});


//get - /tasks/new -> serve a html page where the user can submit the new task
router.get('/new', function(req,res,next){
    res.render('tasks/new');
});

//post - /tasks/new -> add the incoming task to the list and redirect the user to /tasks
router.post('/new', function( req, res, next){
    //req.body.newTask
    taskService.add(req.body.newTask);
    res.redirect('/tasks');
});

// post - /tasks/toggle -> toggle the completed status of the given id
router.post('/toggle', function(req, res, next){
    var taskId = parseInt(req.body.id);
    var task = taskService.toggle(taskId);
    res.json(task);
});

module.exports = router;
