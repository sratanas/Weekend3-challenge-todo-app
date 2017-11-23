console.log('client.js is loaded');

$(document).ready(function(){
    console.log('JQ');
$('#addTask').on('click', function(){
    var taskObject = {
        task: $('input').val()
    }
    addTask(taskObject);

$('#viewTasks').on('click', '.deleteButton', deleteTask)
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
        getTasks();
}})
   
} //end of addTask

function getTasks(){
    console.log( 'in getTasks' );
    // ajax call to server to get koalas
    $.ajax({
      url: '/toDo',
      type: 'GET',
      success: function(response){
        console.log( 'got some tasks ', response);
        $('#viewTasks').empty();
        
          for (var i = 0; i < response.length; i++){
              var task = response[i];
              var $newTask = $('<tr>' + '<td>' + task.task + '</td>'+ '</tr>');
            
              //create and appending delete button
              var $deleteTaskButton = $('<button class = "deleteButton">Delete</button>');
              $newTask.append($deleteTaskButton);
              $deleteTaskButton.data('id',task.id);

              //create and append complete button
              var $completedButton = $('<button class = "completedButton">Completed</button>');
              $newTask.append($completedButton);
              $completedButton.data('id', task.id);

              //append tasks to view tasks table
              $('#viewTasks').append($newTask);
          }
        
        
        }   // end success
    
    }); //end ajax
  }; // end getTasks

  function deleteTask(){
    console.log($(this).data());
    var taskToRemove = $(this).data().id;
    console.log('Clicked delete, task id was ', taskToRemove);
    $.ajax({
      method: 'DELETE',
      url:'/toDo/' + taskToRemove,
      success: function(response){
        console.log('task deleted!');
        
        getTasks();
      }
    })
      
  } //end delete tasks

