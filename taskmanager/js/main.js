/******************************************
 *  Author : Chris   
 *  Created On : Mon Jul 22 2019
 *  File : main.js
 *******************************************/

 $(document).ready(function(){
	getTasks();
	getCategoryOptions();
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
			output += '<span class="float-right"><a class="btn btn-primary btn-sm" href="#">Edit</a> <a class="btn btn-outline-danger btn-sm" href="#">Delete</a></span>';
		});
		output += '</ul>';
		$('#tasks').html(output);
	 });
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