console.log('client.js is loaded');

$(document).ready(function(){
    console.log('JQ');
$('#addTask').on('click', function(){
    var taskObject = {
        task: $('input').val()
    }
    addTask(taskObject);
});  


}) //end of ready

function addTask (newTask){
    console.log('addTask button clicked', newTask);
    //this will add a new task, it is a POST
$.ajax({
    method: 'POST',
    url: '/toDo',
    data: newTask,
    success: function( data ){
        console.log( 'New tasks: ', data );
}})
    getTasks();
} //end of addTask

function getTasks(){
    console.log('in getTasks');
    
    //this will get the whole list of tasks from the database with updated info
    // it is a GET
} //end of getTasks