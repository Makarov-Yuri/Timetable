<?php

include_once"GetDBSettings.php";

class StringOfTeacher{
	
	public $Department;
	public $SurName;
	public $Name;
	public $Patronymic;
	public $FullName;
	public $Post;
	public $Email;
	
	
	public function __construct($Department,$SurName, $Name, $Patronymic,$FullName,$Post,$Email){

		$this->Department=$Department;
		$this->SurName=$SurName;
		$this->Name=$Name;
		$this->Patronymic=$Patronymic;
		$this->FullName=$FullName;
		$this->Post=$Post;
		$this->Email=$Email;
		
	}
	
	public function GetJSON(){

		return 
		'{
		
		"SurName":"'.$this->SurName.'",
		
		"Name":"'.$this->Name.'",
		
		"Patronymic":"'.$this->Patronymic.'",
		
		"FullName":"'.$this->FullName.'",
		
		"Department":"'.$this->Department.'",
		
		"Post":"'.$this->Post.'",
		
		"Email":"'.$this->Email.'"
		
		}';
		
	}
	
}




//Функция возвращает массив объектов класса для хранения данных одной строки SQL-таблицы

function GetDataOfTeacher($NumberID){
	
	
	$StringOfTeacher=null;//Объявляем переменную для хранения данных о преподавателе
	
	
	$db_host; // ваш хост
	$db_name; // ваша бд
	$db_user; // пользователь бд
	$db_pass; // пароль к бд

	GetDBSettings($db_host,$db_user,$db_pass,$db_name);
	
	//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
	$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
	$mysqli->set_charset("utf8mb4"); // задаем кодировку
	$result = $mysqli->query('SELECT * FROM `listofteachers` WHERE NumberID='.$NumberID.''); // запрос на выборку
	while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
	{

	

		//Сохраняем данные в объект типа StringInTimetable

		$StringOfTeacher=new StringOfTeacher($Data['Department'],$Data['SurName'], $Data['Name'], $Data['Patronymic'],$Data['FullName'],

		$Data['Post'], $Data['Email']);

	}
	
	return $StringOfTeacher;
	
}





$StringOfTeacher=GetDataOfTeacher($_POST["NumberID"]);

echo $StringOfTeacher->GetJSON();








//GetDataOfTeacher($_POST["NumberID"]);






?>




































