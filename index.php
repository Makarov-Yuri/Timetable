<?php

//Функция для определение мобильного устройства
function check_mobile_device(){
	
	$mobile_agent_array = array('ipad', 'iphone', 'android', 'pocket', 'palm', 'windows ce', 'windowsce', 'cellphone', 'opera mobi', 'ipod', 'small', 'sharp', 'sonyericsson', 'symbian', 'opera mini', 'nokia', 'htc_', 'samsung', 'motorola', 'smartphone', 'blackberry', 'playstation portable', 'tablet browser');
	
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);    
	
	foreach ($mobile_agent_array as $value){
		
		if (strpos($agent, $value)!== false){return true;}
		
	}
	
	return false;
	
}

// пример использования
$is_mobile_device = check_mobile_device();

if($is_mobile_device){

	//Загрузка данных, если зашли на сайт с мобильного устройства
	include"ForStudents\Phone\App.php";	
	
}else{
	
	//Загрузка данных, если зашли на сайт с персонального компьютера (PC)
	include"ForStudents\PC\Enter.php";	
	
}

?>
