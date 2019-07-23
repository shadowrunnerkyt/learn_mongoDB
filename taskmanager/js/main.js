/******************************************
 *  Author : Chris   
 *  Created On : Mon Jul 22 2019
 *  File : main.js
 *******************************************/

 $(document).ready(function(){
	getTasks();
 });

 function getTasks(){
	$.get('http://192.168.33.20:3001/taskmanager/tasks', function(data){
		let output = '<ul class="list-group">';
		$.each(data, function(key, task){
			output += '<li class="list-group-item">';
			output += task.task_name+'<span class="due_on">[Due on: '+task.due_date+']</span>';
		});
		output += '</ul>';
		$('#tasks').html(output);
	 });
 }