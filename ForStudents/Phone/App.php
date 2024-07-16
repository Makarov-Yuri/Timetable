
<!DOCTYPE HTML>

<html lang='ru'>




	<head>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/reset.css?v=<?php echo filemtime('ForStudents/Phone/CSS/reset.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/App.css?v=<?php echo filemtime('ForStudents/Phone/CSS/App.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/Calendar.css?v=<?php echo filemtime('ForStudents/Phone/CSS/Calendar.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/Month.css?v=<?php echo filemtime('ForStudents/Phone/CSS/Month.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/ButtonOfDay.css?v=<?php echo filemtime('ForStudents/Phone/CSS/ButtonOfDay.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/Timetable.css?v=<?php echo filemtime('ForStudents/Phone/CSS/Timetable.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/ComponentsPanel.css?v=<?php echo filemtime('ForStudents/Phone/CSS/ComponentsPanel.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/Settings.css?v=<?php echo filemtime('ForStudents/Phone/CSS/Settings.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/TeachersList.css?v=<?php echo filemtime('ForStudents/Phone/CSS/TeachersList.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/Enter.css?v=<?php echo filemtime('ForStudents/Phone/CSS/Enter.css');?>'>
		<link rel='stylesheet' href='ForStudents/Phone/CSS/LoadingScreen.css?v=<?php echo filemtime('ForStudents/Phone/CSS/LoadingScreen.css');?>'>
		
		<link rel="icon" type="image/png" sizes="32x32" href="ForStudents/Phone/IMG/ЗнакВШТЭ.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="UTF-8">
		
		<meta property="og:type" content="website">
		<meta property="og:title" content="Расписание ВШТЭ">
		<meta property="og:description" content="Интерактивное расписание ВШТЭ">
		<meta property="og:image" content="ForStudents/Phone/IMG/ЗнакВШТЭ.png">
		
		<title>Расписание ВШТЭ</title>
		
	</head>
	
	<body>
		
		<div id="App"></div>
		
		
		
		
		
	</body>
	<script src='ForStudents/Phone/JS/Enter/Enter.js?v=<?php echo filemtime('ForStudents/Phone/JS/Enter/Enter.js');?>'></script>
	
	
	<script src='ForStudents/Phone/JS/ScrollSnap/ScrollSnapForCalendar.js?v=<?php echo filemtime('ForStudents/Phone/JS/ScrollSnap/ScrollSnapForCalendar.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/ScrollSnap/ScrollSnapForTimetable.js?v=<?php echo filemtime('ForStudents/Phone/JS/ScrollSnap/ScrollSnapForTimetable.js');?>'></script>

	<!-- Используем Vue 2-->
	<script src='ForStudents/Phone/JS/Vue.js?v=<?php echo filemtime('ForStudents/Phone/JS/Vue.js');?>'></script>
	 
	<!--<script src="https://unpkg.com/vuex@3.6.2/dist/vuex.js"></script> аналогичный файл ниже-->
	<script src='ForStudents/Phone/JS/VueX.js?v=<?php echo filemtime('ForStudents/Phone/JS/VueX.js');?>'></script>

	<script src='ForStudents/Phone/JS/VueX/state.js?v=<?php echo filemtime('ForStudents/Phone/JS/VueX/state.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/VueX/getters.js?v=<?php echo filemtime('ForStudents/Phone/JS/VueX/getters.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/VueX/mutations.js?v=<?php echo filemtime('ForStudents/Phone/JS/VueX/mutations.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/VueX/actions.js?v=<?php echo filemtime('ForStudents/Phone/JS/VueX/actions.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/VueX/main.js?v=<?php echo filemtime('ForStudents/Phone/JS/VueX/main.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/ComponentsPanel/ComponentsPanel.js?v=<?php echo filemtime('ForStudents/Phone/JS/ComponentsPanel/ComponentsPanel.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/Settings/Settings.js?v=<?php echo filemtime('ForStudents/Phone/JS/Settings/Settings.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TeachersList/TeachersList.js?v=<?php echo filemtime('ForStudents/Phone/JS/TeachersList/TeachersList.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/Calendar/ButtonOfDay.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/Calendar/ButtonOfDay.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/Calendar/Month.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/Calendar/Month.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/Calendar/Calendar.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/Calendar/Calendar.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/Timetable/Lesson.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/Timetable/Lesson.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/Timetable/TimetableBlockOfDay.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/Timetable/TimetableBlockOfDay.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/Timetable/Timetable.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/Timetable/Timetable.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/TimetableSection/TimetableSection.js?v=<?php echo filemtime('ForStudents/Phone/JS/TimetableSection/TimetableSection.js');?>'></script>
	
	<script src='ForStudents/Phone/JS/App.js?v=<?php echo filemtime('ForStudents/Phone/JS/App.js');?>'></script>
	
</html>