<?php

$Group=$_POST["Group"];

$Group=str_replace (".","_",$Group);//Заменить точки в номере группы на нижние подчеркивания

$GroupExists=false;

include"GetDBSettings.php";

$db_host; // ваш хост
$db_name; // ваша бд
$db_user; // пользователь бд
$db_pass; // пароль к бд

GetDBSettings($db_host,$db_user,$db_pass,$db_name);


//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
$mysqli->set_charset("utf8mb4"); // задаем кодировку
$result = $mysqli->query("SELECT * FROM `listofgroups` WHERE NumberOfGroup='".$Group."'"); // запрос на выборку
while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
{

	$GroupExist=true;

}




if($GroupExist==true){
	
	echo"1";	
	
	
}else if($GroupExist==false){

	echo"0";
	
}



?>




































