<?php

include_once"GetDBSettings.php";

//Объявить класс для хранения данных одной строки SQL-таблицы

class StringOfTeacherName{
		
	public $SurName;
	public $Name;
	public $Patronymic;
	public $NumberID;
	
	
	public function __construct($NumberID,$SurName, $Name, $Patronymic){

		$this->NumberID=$NumberID;
		$this->SurName=$SurName;
		$this->Name=$Name;
		$this->Patronymic=$Patronymic;
		
	}
	
	public function GetJSON(){

		return '{"NumberID":"'.$this->NumberID.'","SurName":"'.$this->SurName.'","Name":"'.$this->Name.'","Patronymic":"'.$this->Patronymic.'"}';
		
	}
	
}




//Функция возвращает массив объектов класса для хранения данных одной строки SQL-таблицы

function GetArrayOfTeachers(){
	
	//Создать массив для строк с расписанием
	$ArrayOfTeachersName=[];
	
	$Last_Key=0;//Ключ для элементов массива
	
	$db_host; // ваш хост
	$db_name; // ваша бд
	$db_user; // пользователь бд
	$db_pass; // пароль к бд

	GetDBSettings($db_host,$db_user,$db_pass,$db_name);
	
	//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
	$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
	$mysqli->set_charset("utf8mb4"); // задаем кодировку
	$result = $mysqli->query('SELECT * FROM `listofteachers`'); // запрос на выборку
	while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
	{
		
		//Сохраняем данные в объект типа StringOfTeacherName

		$ArrayOfTeachersName[$Last_Key]=new StringOfTeacherName($Data['NumberID'],$Data['SurName'], $Data['Name'], $Data['Patronymic']);

		//$ArrayOfTeachersName[$Last_Key]->WriteJSON();//Отображение данных при необходимости для видимости работы
		
		$Last_Key=$Last_Key+1;

	}
	
	return $ArrayOfTeachersName;
	
}


$ArrayOfTeachersName=GetArrayOfTeachers();


$OutputJSON='[';

for($i=0; $i<=count($ArrayOfTeachersName)-1;$i++){
	
	if($i<count($ArrayOfTeachersName)-1){
		
		$OutputJSON=$OutputJSON.$ArrayOfTeachersName[$i]->GetJSON().',';
		
	}else if($i<count($ArrayOfTeachersName)){
		
		$OutputJSON=$OutputJSON.$ArrayOfTeachersName[$i]->GetJSON();
		
	}

}



$OutputJSON=$OutputJSON.']';


echo $OutputJSON;

?>




































