console.log('client.js is loaded');

$(document).ready(function(){
    console.log('JQ');
$('#addTask').on('click', addTask);  
}) //end of ready

function addTask (){
    console.log('addTask button clicked');
    
    //this will add a new task, it is a POST

    getTasks();
} //end of addTask

function getTasks(){
    console.log('in getTasks');
    
    //this will get the whole list of tasks from the database with updated info
    // it is a GET
} //end of getTasks