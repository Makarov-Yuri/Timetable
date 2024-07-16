<?php

//Объявить класс для хранения данных о преподавателе

class Teacher

{
	
public $Department;//Кафдера

public $SurName;//Фамилия
	
public $Name;//Имя

public $Patronymic;//Отчество

public $Post;//Должность

public $FullName;//Фамилия и инициалы

public $Email;//Почта преподавателя


public function __construct($department,$surName,$name,$patronymic,$post,$fullName,$email) {

$this->Department=$department;//Присвоить кафедру

$this->SurName=$surName;//Присвоить фамилию

$this->Name=$name;//Присвоить имя

$this->Patronymic=$patronymic;//Присвоить отчество

$this->Post=$post;//Присвоить должность

$this->FullName=$fullName;//Присвоить фамилию и инициалы

$this->Email=$email;//Присвоить почту


}


public function WriteData(){

echo $this->Department." ";
	
echo $this->SurName." ";

echo $this->Name." ";	

echo $this->Patronymic." ";

echo $this->Post." ";

echo $this->FullName." ";

echo $this->Email." ";

echo"<br>";
	
}


public function WriteHTML(){

$NameOfPhoto="Teachers/Фотографии/{$this->Department} Фотографии сотрудников/{$this->SurName}.JPG";

echo"

<div id='Bottom'>

<div id='Left'>

<img id='Photo_Of_Teacher' src='$NameOfPhoto'>

</div>

<div id='Right'>

<p id='SurName'>Фамилия: {$this->SurName}</p>

<p id='Name'>Имя: {$this->Name}</p>

<p id='Patronymic'>Отчество: {$this->Patronymic}</p>

<p id='Post'>Должность: {$this->Post}</p>

<p id='Department'>Кафедра: {$this->Department}</p>

<p id='Email'>Почта: {$this->Email}</p>

</div>

</div>

";

}
		
}


include"GetDBSettings.php";



function GetDataOfTeacher($FullNameOfTeacher){

$DataOfTeacher="Нет информации";

/*

$db_host="localhost";; // ваш хост
$db_name='timetablehste'; // ваша бд
$db_user="root"; // пользователь бд
$db_pass=''; // пароль к бд

*/


$db_host; // ваш хост
$db_name; // ваша бд
$db_user; // пользователь бд
$db_pass; // пароль к бд

GetDBSettings($db_host,$db_user,$db_pass,$db_name);









//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
$mysqli->set_charset("utf8mb4"); // задаем кодировку
$result = $mysqli->query("SELECT * FROM `listofteachers`"); // запрос на выборку
while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
{

if($Data['SurName']." ".$Data['Name']." " .$Data['Patronymic']==$FullNameOfTeacher){

$DataOfTeacher=new Teacher($Data['Department'],$Data['SurName'],$Data['Name'],

$Data['Patronymic'],$Data['Post'],$Data['FullName'],$Data['Email']);

}

}

return $DataOfTeacher;

}


$FullNameOfTeacher=$_POST["FullNameOfTeacher"];	

$DataOfTeacher=GetDataOfTeacher($FullNameOfTeacher);

if($DataOfTeacher!="Нет информации"){

$DataOfTeacher->WriteHTML();

} else{

echo"Нет информации ";

echo $FullNameOfTeacher;

}

?>






