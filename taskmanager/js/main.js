/******************************************
 *  Author : Chris   
 *  Created On : Mon Jul 22 2019
 *  File : main.js
 *******************************************/

 $(document).ready(function(){
	getTasks();
 });

 function getTasks(){
	 $.get('http://', function(data){
		 console.log(data);
	 });
 }