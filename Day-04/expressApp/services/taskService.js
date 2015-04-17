var taskList = [
    {id : 1, name : 'Explore MongoDb', isCompleted : false},
    {id : 2, name : 'Practice JavaScript', isCompleted : false},
    {id : 3, name : 'Master Node.js', isCompleted : false},
    {id : 4, name : 'Answer - what is ES6?', isCompleted : false}
];

module.exports = {
    getAll : function(){
        return taskList.slice(0);
    },
    add : function(taskName){
        var newId = taskList.reduce(function(seed, task){
            return seed > task.id ? seed : task.id
        }, 0) + 1;
        var newTask = {
            id : newId,
            name : taskName,
            isCompleted : false
        };
        taskList.push(newTask);
    },
    toggle : function(taskId){
        //var taskId = parseInt(req.body.id);
        var task = taskList.filter(function(task){
            return task.id === taskId;
        })[0];
        if (task){
            task.isCompleted = !task.isCompleted;
        };
        return task;
    }
}
