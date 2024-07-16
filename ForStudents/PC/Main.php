<?php
if(isset($_COOKIE["SetedCookies"])==true){


//Если мобильное устройство, то переход с компьютерной версии на телефонную

// определение мобильного устройства
function check_mobile_device() { 
$mobile_agent_array = array('ipad', 'iphone', 'android', 'pocket', 'palm', 'windows ce', 'windowsce', 'cellphone', 'opera mobi', 'ipod', 'small', 'sharp', 'sonyericsson', 'symbian', 'opera mini', 'nokia', 'htc_', 'samsung', 'motorola', 'smartphone', 'blackberry', 'playstation portable', 'tablet browser');
$agent = strtolower($_SERVER['HTTP_USER_AGENT']);    
// var_dump($agent);exit;
foreach ($mobile_agent_array as $value) {    
if (strpos($agent, $value) !== false) return true;   
}       
return false; 
}

$is_mobile_device = check_mobile_device();
if($is_mobile_device==true){

//Вы зашли с мобильного устройства

header('Location: ../Phone/Main.php');

exit();	

}


	
$Group=$_COOKIE["Group"];	

$SubGroup=$_COOKIE["SubGroup"];

$NameOfInstitute=$_COOKIE["NameOfInstitute"];


} else{
	
header('Location: ../../index.php');

exit();		
	
}

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);//Выключить предупреждения (будет продолжен вывод критичных ошибок)

include_once"WriteHTMLFunctions.php";

Scan_SQL_Table_With_Timetable($Group,$ArrayOfStringInTimetable);//Включение функции для получения данных из таблицы с расписанием определенной

$HTML_Timetable=new HTML_Timetable($ArrayOfStringInTimetable);

GetDataOfGroup($Group,$NameOfFile,$NameOfInstitute);

$Group=str_replace ("_",".",$Group);


?>

<!DOCTYPE HTML>


<html>


<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="CSS/resetV4.css">

<link rel="icon" type="image/png" sizes="32x32" href="IMG/ЗнакВШТЭ.png">

<link rel="stylesheet" href="CSS/TimetableForComputerV4.css">

<?php

echo"<title>Группа $Group</title>";

?>

</head>



<body>

<header>

<div class="Top_Line">

<ul class="DaysOfWeek">

<li tabindex="1">Пн</li>

<li tabindex="1">Вт</li>

<li tabindex="1">Ср</li>

<li tabindex="1">Чт</li>

<li tabindex="1">Пт</li>

<li tabindex="1">Сб</li>

<li tabindex="1">Вс</li>

</ul>

<a class="Excel" href="Excel\<?php echo $NameOfFile?>" download>Полное расписание</a>

<div class="Date"></div>

<div class="Time"></div>

</div>


<div class="Bottom_Line">

<div class="NameOfInstitute"><?php echo $NameOfInstitute;?></div>

<div class="Group"><input type="text" value="<?php echo $Group;?>"> <p>группа</p></div>

<div class="SubGroup"><span tabindex="1">Первая подгруппа</span></div>

<div class="Week"><span tabindex="1" >Нечетная неделя</span></div>

</div>


</header>


<div class="EmptyBlock"></div>


<div id="DataBox">

<?php

$HTML_Timetable->WriteHTML();

?>

</div>

</body>

<script src="JS/Cookie.js"></script>

<script src="JS/FunctionsForComputerV4.js"></script>

<script src="JS/ComputerV4.js"></script>

</html>















