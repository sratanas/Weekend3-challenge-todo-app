console.log('client.js is loaded');

$(document).ready(function(){
    console.log('JQ');
    // getTasks();
document.getElementById("todaysDate").innerHTML = Date();
// $('#todaysDate').html() = Date()
$('#addTask').on('click', function(){
    var taskObject = {
        task: $('input').val(),
        completed: 'No'
    
    }
    addTask(taskObject);
// document.getElementById("todaysDate").innerHTML = Date();

$('#viewTasks').on('click', '.deleteButton', deleteTask)
$('#viewTasks').on('click', '.completedButton', updateToComplete);
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
        $('input').val('');
        
          for (var i = 0; i < response.length; i++){
              var task = response[i];
              var $newTask = $('<tr>' + '<td id = "tableId">' + task.task + '</td>'+ '</tr>');
              
              var $dueDate = $('<label for = "dueDate" id = "label">Due:</label><input type="date" id="dueDate">');
              $newTask.append($dueDate);
              $dueDate.data('id',task.id);
            
        

              if (task.completed !== 'Yes'){
                var $completedButton = $('<button class = "completedButton">completed</button>')
                $newTask.append($completedButton); //$completedButton is now appended INSIDE $newShoeItem
                $completedButton.data('id', task.id)}

              

              //create and appending delete button
              var $deleteTaskButton = $('<button class = "deleteButton">Delete</button>');
              $newTask.append($deleteTaskButton);
              $deleteTaskButton.data('id',task.id);
              


              //append tasks to view tasks table
              $('#viewTasks').append($newTask);
          }
        
        
        }   // end success
    
    }); //end ajax
  }; // end getTasks


  function deleteTask(){
    console.log('in deleteTask');
    console.log($(this).data());
    var taskToRemove = $(this).data().id;
    console.log('Clicked delete, task id was ', taskToRemove);
    var r = confirm("Are you sure?");
    if (r == true) {
        $.ajax({
            method: 'DELETE',
            url:'/toDo/' + taskToRemove,
            success: function(response){
              console.log('task deleted!');
      
                  
              getTasks();
            }
          })
    }


      
  } //end delete tasks

  function updateToComplete(){
    console.log($(this).data());
    var taskToSetComplete = $(this).data().id;
    var taskToMove = $(this).data().task;
    console.log('taskToMove', $(this).data().task);
    
    console.log('Task completed, the task ID was, ', taskToSetComplete);
    var completed =  $(this).parent().children('#tableId')
    var deletedMove = $(this).parent().children('.deleteButton')
    var completedMove = $(this).parent().children('.completedButton')
    var completedDueDate = $(this).parent().children('#dueDate')
    var completedlabel = $(this).parent().children('#label')
    $.ajax({
      method: 'PUT',
      url:'/toDo/' + taskToSetComplete,
      data: completed,
      success: function(response){
        console.log('Task complete success', response);
        //need to add CSS to change to green, possibly move to bottom?

        $(completed).slideUp('slow');
        $(deletedMove).slideUp('slow');
        $(completedMove).slideUp('slow');
        $(completedDueDate).slideUp('slow');
        $(completedlabel).slideUp('slow');

        moveToNewTable();
    
        // $('#viewComplete').append( completed ).css('background-color','green');
      }
    })

  } // end updateToComplete


///BELOW THIS LINE IS EXPERIMENTATION

function moveToNewTable (){
    console.log('In moveToNewTable');
    // ajax call to server to get koalas
    $.ajax({
      url: '/completedTable',
      type: 'GET',
      success: function(response){
        console.log( 'got completed tasks ', response);
        $('#viewComplete').empty();
        
        for (var i = 0; i < response.length; i++){
            var task = response[i];
            $('#viewComplete').append('<tr>' + '<td>' + response[i].task+ '</td>'+ '</tr>').css('color', 'green');
            
            // getTasks();

        }}})
    }
