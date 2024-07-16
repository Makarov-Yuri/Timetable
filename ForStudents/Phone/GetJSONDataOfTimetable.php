<?php

include_once"GetDBSettings.php";


//Объявить класс для хранения данных одной строки SQL-таблицы

class StringInSQLTable{
		
	public $DayOfWeek;
	public $Holiday;
	public $Comment;
	public $Exist;
	public $NumberOfLesson;
	public $Time;
	public $Subgroup;
	public $Week;
	public $TypeOfLesson;
	public $Subject;
	public $Teacher;
	public $Auditorium;

	public function __construct($dayOfWeek, $holiday, $comment, $exist, $numberOfLesson, 
	$timeOfLesson, $subgroup, $week, $typeOfLesson, $subject, $teacher, $auditorium){

		$this->DayOfWeek=$dayOfWeek;
		
		//Изменяем регистр дня недели на нижний
		$this->DayOfWeek=mb_strtolower($this->DayOfWeek);

		$this->Holiday=$holiday;
		$this->Comment=$comment;
		$this->Exist=$exist;
		$this->NumberOfLesson=$numberOfLesson;
		$this->TimeOfLesson=$timeOfLesson;
		$this->Subgroup=$subgroup;
		$this->Week=$week;
		$this->TypeOfLesson=$typeOfLesson;
		$this->Subject=$subject;
		$this->Teacher=$teacher;
		$this->Auditorium=$auditorium;

	}	
	
	
	public function WriteData(){

		echo $this->DayOfWeek;
		echo "<br>";
		echo $this->Holiday." Выходной";
		echo "<br>";
		echo $this->Comment." Комментарий";
		echo "<br>";
		echo $this->Exist." Существует";
		echo "<br>";
		echo $this->NumberOfLesson;
		echo "<br>";
		echo $this->TimeOfLesson;
		echo "<br>";
		echo $this->Subgroup." Подгруппа";
		echo "<br>";
		echo $this->Week." Неделя";
		echo "<br>";
		echo $this->TypeOfLesson;
		echo "<br>";
		echo $this->Subject;
		echo "<br>";
		echo $this->Teacher;
		echo "<br>";
		echo $this->Auditorium;
		echo "<br>";
		echo "<br>";

	}
	
	
}


//Функция возвращает массив объектов класса для хранения данных одной строки SQL-таблицы

function GetArrayOfStringsWithTimetableOfGroup($NumberOfGroup){
	
	//Создать массив для строк с расписанием
	$ArrayOfStringsInTimetable=[];
	
	$Last_Key=0;//Ключ для элементов массива
	
	$db_host; // ваш хост
	$db_name; // ваша бд
	$db_user; // пользователь бд
	$db_pass; // пароль к бд

	GetDBSettings($db_host,$db_user,$db_pass,$db_name);
	
	//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
	$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
	$mysqli->set_charset("utf8mb4"); // задаем кодировку
	$result = $mysqli->query('SELECT * FROM `group_'.$NumberOfGroup.'`'); // запрос на выборку
	while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
	{

		$Last_Key=$Last_Key+1;

		//Сохраняем данные в объект типа StringInTimetable

		$ArrayOfStringsInTimetable[$Last_Key]=new StringInSQLTable($Data['DayOfWeek'], $Data['Holiday'], $Data['Comment'],

		$Data['Exist'], $Data['NumberOfLesson'], $Data['Time'], $Data['Subgroup'], $Data['Week'], $Data['TypeOfLesson'],

		$Data['Subject'],  $Data['Teacher'],  $Data['Auditorium']);

		//$ArrayOfStringsInTimetable[$Last_Key]->WriteData();//Отображение данных при необходимости для видимости работы

	}
	
	return $ArrayOfStringsInTimetable;
	
}









//Объявление классов для хранения данных и их реализации

class JSON_SimpleBlock{

	public $Exist;//Указание существования пары

	public $TimeOfLesson;//Время пары
	public $TypeOfLesson;//Тип пары (лекция,практическое занятие и другое)
	public $Subject;//Название предмета
	public $Teacher;//Преподаватель
	public $Auditorium;//Аудитория с парой

	public $SubGroup;
	public $Week;

	public function __construct($ArrayOfDataString,&$Last_Key){

		$this->SubGroup=$ArrayOfDataString[$Last_Key]->Subgroup;
		$this->Week=$ArrayOfDataString[$Last_Key]->Week;

		$this->Exist=$ArrayOfDataString[$Last_Key]->Exist;
		$this->TypeOfLesson=$ArrayOfDataString[$Last_Key]->TypeOfLesson;
		$this->Subject=$ArrayOfDataString[$Last_Key]->Subject;
		$this->Teacher=$ArrayOfDataString[$Last_Key]->Teacher;
		$this->Auditorium=$ArrayOfDataString[$Last_Key]->Auditorium;


		$this->TimeOfLesson=$ArrayOfDataString[$Last_Key]->TimeOfLesson;

		
		$Last_Key=$Last_Key+1;

	}
	

	
	public function WriteData(){

		switch($this->TypeOfLesson){
		case"лек.":
		$this->TypeOfLesson="Лекция";
		break;

		case"пр.з.":
		$this->TypeOfLesson="Практическое занятие";
		break;

		case"лаб.":
		$this->TypeOfLesson="Лабораторная работа";
		break;

		case"прак.":
		$this->TypeOfLesson="Практика";
		break;

		}


		if($this->Auditorium=="сп.зал"){

		$this->Auditorium="Спортивный зал";

		}
		
		echo $this->Exist." Существует ";
		
		echo $this->Week." Неделя ";
		
		echo $this->SubGroup." Подгруппа ";
		
		echo $this->TimeOfLesson." ";

		echo $this->TypeOfLesson." ";

		echo $this->Subject." ";

		echo $this->Teacher." ";

		echo $this->Auditorium." ";

		
		
	}
	
	
	
		
	public function GetJSON(){

		switch($this->TypeOfLesson){
		case"лек.":
		$this->TypeOfLesson="Лекция";
		break;

		case"пр.з.":
		$this->TypeOfLesson="Практическое занятие";
		break;

		case"лаб.":
		$this->TypeOfLesson="Лабораторная работа";
		break;

		case"прак.":
		$this->TypeOfLesson="Практика";
		break;

		}


		if($this->Auditorium=="сп.зал"){

		$this->Auditorium="Спортивный зал";

		}
		
		
		if($this->Exist=='Yes'){
			
			$this->Exist='Exists';
			
			return"
			{
				'LessonExists':'{$this->Exist}',
				
				'TypeOfLesson':'{$this->TypeOfLesson}', 
				
				'NameOfSubject':'{$this->Subject}',
				
				'Auditorium':'{$this->Auditorium}',
				
				'Teacher':'{$this->Teacher}'
				
			}";
			
		}else if($this->Exist=='No'){
			
			$this->Exist='NotExists';
						
			return"{'LessonExists':'{$this->Exist}'}";		
				
		}
		

	}
	
}






class JSON_Lesson{

	public $NumberOfLesson;

	public $FirstSubGroup_TopWeek;
	public $FirstSubGroup_BottomWeek;
	public $SecondSubGroup_TopWeek;
	public $SecondSubGroup_BottomWeek;

	public $TimeOfLesson;

	public $Exist="true";

	public function __construct($ArrayOfDataString,&$Last_Key){

		$this->NumberOfLesson=$ArrayOfDataString[$Last_Key]->NumberOfLesson;

		$this->TimeOfLesson=$ArrayOfDataString[$Last_Key]->TimeOfLesson;

		$this->FirstSubGroup_TopWeek= new JSON_SimpleBlock($ArrayOfDataString,$Last_Key);
		$this->FirstSubGroup_BottomWeek=new JSON_SimpleBlock($ArrayOfDataString,$Last_Key);
		$this->SecondSubGroup_TopWeek=new JSON_SimpleBlock($ArrayOfDataString,$Last_Key);
		$this->SecondSubGroup_BottomWeek=new JSON_SimpleBlock($ArrayOfDataString,$Last_Key);

		if(

			$this->FirstSubGroup_TopWeek->Exist=="No" and

			$this->FirstSubGroup_BottomWeek->Exist=="No"and

			$this->SecondSubGroup_TopWeek->Exist=="No" and

			$this->SecondSubGroup_BottomWeek->Exist=="No"

		){

			$this->Exist="false";

		}


	}
	
	public function WriteData(){
		
		echo"<br>";
		echo $this->NumberOfLesson." Номер урока";
		echo"<br>";
		echo"<br>";
		
		echo $this->TimeOfLesson." Время урока";
		echo"<br>";
		echo"<br>";
		
		

		$this->FirstSubGroup_TopWeek->WriteData();
		echo"<br>";
		$this->FirstSubGroup_BottomWeek->WriteData();
		echo"<br>";
		$this->SecondSubGroup_TopWeek->WriteData();
		echo"<br>";
		$this->SecondSubGroup_BottomWeek->WriteData();
		echo"<br>";

	}
	
		
	public function GetJSON(){
		
		return"{
				'LessonNumber':'{$this->NumberOfLesson}',
				<br>			 
				'TimeOfLesson':'{$this->TimeOfLesson}',
				<br>
				'FirstSubGroupTopWeek':".$this->FirstSubGroup_TopWeek->GetJSON().",
				<br>
				'FirstSubGroupBottomWeek':".$this->FirstSubGroup_BottomWeek->GetJSON().",
				<br>
				'SecondSubGroupTopWeek':".$this->SecondSubGroup_TopWeek->GetJSON().",
				<br>
				'SecondSubGroupBottomWeek':".$this->SecondSubGroup_BottomWeek->GetJSON()."
				<br>
				
			}";
		
	}
	
}




class JSON_Day{

	public $NameOfDay;
	public $Holiday;
	public $Comment;

	public $JSON_Lesson=[];

	public $LastNumberOfLesson;

	public $FirstKeyOfDay;


	public function __construct($ArrayOfDataString,&$Last_Key){

		$this->FirstKeyOfDay=$Last_Key;

		$this->NameOfDay=$ArrayOfDataString[$Last_Key]->DayOfWeek;

		$this->Holiday=$ArrayOfDataString[$Last_Key]->Holiday;

		$this->Comment=$ArrayOfDataString[$Last_Key]->Comment;

		$this->LastNumberOfLesson=0;

		while
		(

			$Last_Key<=count($ArrayOfDataString) and

			$ArrayOfDataString[$Last_Key]->DayOfWeek==$this->NameOfDay

		){

			$this->LastNumberOfLesson=$this->LastNumberOfLesson+1;

			$this->JSON_Lesson[$this->LastNumberOfLesson]=new JSON_Lesson($ArrayOfDataString,$Last_Key);

		}

	}


	public function WriteData(){
		
		echo"<br>";
		echo $this->NameOfDay;
		echo"<br>";
		echo"<br>";
		echo $this->Holiday." Выходной";
		echo"<br>";
		echo $this->Comment." Комментарий";
		echo"<br>";
		
		for($i=1;$i<=$this->LastNumberOfLesson;$i++){

		$this->JSON_Lesson[$i]->WriteData();

		}

	}
	
	
	public function GetJSON(){
			
		$JSONData="
			<br>
		{	
			<br>
			'TypeOfDay':";
			 
			 
		if($this->Holiday=='true'){
			
			$JSONData=$JSONData."'Holiday',";
			
			$JSONData=$JSONData."<br>
			
			'Comment':'{$this->Comment}'";
			
		}else if($this->Holiday=='false'){
			
			$JSONData=$JSONData."'WorkDay',";
			
			$JSONData=$JSONData."<br>
			
			'Comment':'{$this->Comment}',";
			
			$JSONData=$JSONData."
			
			<br>'Lessons':[";
				
				for($i=1;$i<=$this->LastNumberOfLesson;$i++){
					
					if($this->JSON_Lesson[$i]->Exist=="true"){
						
						$JSONData=$JSONData.$this->JSON_Lesson[$i]->GetJSON();
						
					}
					
					//Для каждого не последнего урока нужно поставить запятую как для элемента массива:
					//Если счетчик меньше номера последнего урока, то "следующий" урок существует в массиве
					if($i<$this->LastNumberOfLesson){
						
						//Если нынешний и следующий урок должен отображаться в расписании, то ставим после нынешнего урока запятую
						if($this->JSON_Lesson[$i]->Exist=="true" and $this->JSON_Lesson[$i+1]->Exist=="true")
						{
						
							$JSONData=$JSONData.",";
						
						}
						
					}
					
							
				};
				
			$JSONData=$JSONData."<br>]";
			
		}
		
		$JSONData=$JSONData."<br>}";
		
		return $JSONData;

	}
	
}





class JSON_TimetableOfGroup{
	
	public $JSON_Day=[];
	public $SemesterNumber;
	public $Group;
	public $NameOfInstitute;
	public $Course;

	public function __construct($NameOfInstitute,$Course,$Group,$ArrayOfDataString){
		
		$this->Group=$Group;
		
		$this->SemesterNumber=1;
		
		$this->NameOfInstitute=$NameOfInstitute;
		
		$this->Course=$Course;
		
		
		//$this->NameOfInstitute='';
		
		$Last_Key=1;//Последний ключ  доступа к массиву

		for($i=1; $i<=7; $i++){

			$this->JSON_Day[$i]=new JSON_Day($ArrayOfDataString,$Last_Key);

		}

	}


	public function WriteData(){

		for($i=1; $i<=7; $i++){

			$this->JSON_Day[$i]->WriteData();

		}

	}
	
	
	
	public function GetJSON(){
		
		$JSONData="
		{
			
			<br>'SemesterNumber':'{$this->SemesterNumber}',
			
			<br>'NameOfInstitute':'{$this->NameOfInstitute}',
			
			<br>'Course':'{$this->Course}',
			
			<br>'Group':'{$this->Group}',
			
			<br>'Days':[
			
			";	
			
			for($i=1; $i<=7; $i++){

				$JSONData=$JSONData.$this->JSON_Day[$i]->GetJSON();
				
				//Каждый день в массиве кроме последнего должен иметь после себя запятую
				if($i<7){
					
					$JSONData=$JSONData.",";
					
				}

			}
			
		$JSONData=$JSONData."
			<br>]
					
		<br>}
				
		";
		
		return $JSONData;

	}
		
}


function GetDataOfGroup($Group){


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
$result = $mysqli->query("SELECT * FROM `listofgroups` WHERE NumberOfGroup='$Group';"); // запрос на выборку
while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
{

$NameOfFile=$Data['NameOfFile'];

$NameOfInstitute=$Data['NameOfInstitute'];

}

}









$Group=$_POST["Group"];

$Group=str_replace (".","_",$Group);//Заменить точки в номере группы на нижние подчеркивания

//сли группа не задана, то выводим 125 группу (необходимо во время разраобтки, потом убрать)
if($Group==null){

	$Group=125;

}





//Получаем данные о группе:

$Course=1;
$NameOfInstitute='Институт технологии';


$db_host; // ваш хост
$db_name; // ваша бд
$db_user; // пользователь бд
$db_pass; // пароль к бд

GetDBSettings($db_host,$db_user,$db_pass,$db_name);
	
	//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
	$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
	$mysqli->set_charset("utf8mb4"); // задаем кодировку
	$result = $mysqli->query("SELECT * FROM `listofgroups` WHERE NumberOfGroup='$Group'"); // запрос на выборку
	while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
	{
		$Course=$Data['Course'];
		$NameOfInstitute=$Data['NameOfInstitute'];
	}

//Получаем массив строк с данными о расписании определенной группы
$ArrayOfStringsInTimetable=GetArrayOfStringsWithTimetableOfGroup($Group);


//Создаем на основе этого массива объект с расписанием
$JSON_TimetableOfGroup=new JSON_TimetableOfGroup($NameOfInstitute,$Course,$Group, $ArrayOfStringsInTimetable);

//GetDataOfGroup($Group,$NameOfFile,$NameOfInstitute);



//Печатаем данные из объекта с расписанием группы
//$JSON_TimetableOfGroup->WriteData();

$JSONDataOfTimetable=$JSON_TimetableOfGroup->GetJSON();


//Убираем все <br>
$JSONDataOfTimetable=str_replace("<br>","",$JSONDataOfTimetable);

//Заменяем одинарные кавычки на двойные
$JSONDataOfTimetable=str_replace("'",'"',$JSONDataOfTimetable);



echo $JSONDataOfTimetable;


?>




































