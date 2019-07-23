/******************************************
 *  Author : Chris   
 *  Created On : Mon Jul 22 2019
 *  File : main.js
 *******************************************/

$(document).ready(function(){
	getTasks();
	getCategoryOptions();

	$("#submitTask").click(addTask);
	$("body").on('click','.btn-edit-task',setTask);
});

 function getTasks(){
	$.get('http://192.168.33.20:3001/taskmanager/tasks', function(data){
		let output = '<ul class="list-group">';
		$.each(data, function(key, task){
			output += '<li class="list-group-item">';
			output += task.task_name+'<span class="due_on"> [Due on: '+task.due_date+'] </span>';
			// if(JSON.parse(task.is_urgent)){
			if(task.is_urgent){
				output += '<span class="label label-danger">Urgent</span>';
			}
			output += '<span class="float-right"><a class="btn btn-primary btn-sm btn-edit-task" data-task-name="'+task.task_name+'" data-task-id="'+task._id+'" title="Edit:'+task._id+'">Edit</a> <a class="btn btn-outline-danger btn-sm" href="#">Delete</a></span>';
		});
		output += '</ul>';
		$('#tasks').html(output);
	});
}

function addTask(event){
	let task_name = $("#task_name").val();
	let category = $('#category').val();
	let due_date = $('#due_date').val();
	let is_urgent = ($('#is_urgent').val() == "true") ? true : false ;
	// alert('task_name='+task_name+'\ncategory='+category+'\ndue_date='+due_date+'\nis_urgent='+$('#is_urgent').val()+'('+is_urgent+')');
	$.ajax({
		url:'http://192.168.33.20:3001/taskmanager/tasks',
		data: JSON.stringify({
			"task_name":  task_name,
			"category": category,
			"due_date": due_date,
			"is_urgent": is_urgent
		}),
		type: 'POST',
		contentType: 'application/json',
		success: goHome(),
		error: errAlert()
	});
	event.preventDefault();
}

function errAlert(xhr, status, err){if(err){alert(err)};}

function goHome(){
	alert('going home');
	window.location.replace("index.html");
}

function getCategoryOptions(){
	$.get('http://192.168.33.20:3001/taskmanager/categories', function(data){
		let output;
		$.each(data, function(key, category){
			output += '<option value="'+category.category_name+'">'+category.category_name+'</option>';
		});
		$('#category').append(output);
	});
}

function setTask(){
	let task_id = $(this).data('task-id');
	sessionStorage.setItem('current_id', task_id);
	window.location.replace("edittask.html");
	return false
}