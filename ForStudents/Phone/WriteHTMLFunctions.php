<?php

//Объявить класс для хранения данных одной строки

class StringInTimetable{
	
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
echo $this->Week." Неделия";
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



include_once"GetDBSettings.php";


function Scan_SQL_Table_With_Timetable($NumberOfGroup,&$ArrayOfStringInTimetable){
//Создать массив для строк с расписанием
$ArrayOfStringInTimetable=[];

$Last_Key=0;//Ключ для элементов массива
//global $ArrayOfStringInTimetable;

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
$result = $mysqli->query('SELECT * FROM `group_'.$NumberOfGroup.'`'); // запрос на выборку
while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
{
//echo '<p>Запись id='.$Data['GroupID'].'. Текст: '.$Data['Course'].'</p>';// выводим данные

$Last_Key=$Last_Key+1;

//Сохраняем данные в объект типа StringInTimetable

$ArrayOfStringInTimetable[$Last_Key]=new StringInTimetable($Data['DayOfWeek'], $Data['Holiday'], $Data['Comment'],

$Data['Exist'], $Data['NumberOfLesson'], $Data['Time'], $Data['Subgroup'], $Data['Week'], $Data['TypeOfLesson'],

$Data['Subject'],  $Data['Teacher'],  $Data['Auditorium']);

//$ArrayOfStringInTimetable[$Last_Key]->WriteData();//Отображение данных при необходимости для видимости работы

}
	
}



//Объявление классов для хранения данных и их реализации

class HTML_SimpleBlock{

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

}

public function WriteHTML(){

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


echo"

<div class='{$this->SubGroup}SubGroup{$this->Week}Week'>

<p class='TimeOfLesson'>{$this->TimeOfLesson}</p>

<p class='TypeOfLesson'>{$this->TypeOfLesson}</p>

<p class='Subject'>{$this->Subject}</p>

<p class='Teacher'>{$this->Teacher}</p>

<p class='Auditorium'>{$this->Auditorium}</p>

<p class='Exists'>{$this->Exist}</p>

</div>

";

}


}














class HTML_Lesson{

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

$this->FirstSubGroup_TopWeek= new HTML_SimpleBlock($ArrayOfDataString,$Last_Key);
$this->FirstSubGroup_BottomWeek=new HTML_SimpleBlock($ArrayOfDataString,$Last_Key);
$this->SecondSubGroup_TopWeek=new HTML_SimpleBlock($ArrayOfDataString,$Last_Key);
$this->SecondSubGroup_BottomWeek=new HTML_SimpleBlock($ArrayOfDataString,$Last_Key);

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

echo $this->NumberOfLesson;
echo"<br>";

$this->FirstSubGroup_TopWeek->WriteData();
$this->FirstSubGroup_BottomWeek->WriteData();
$this->SecondSubGroup_TopWeek->WriteData();
$this->SecondSubGroup_BottomWeek->WriteData();

}

public function WriteHTML(){

if($this->Exist=="true"){

echo"

<div class='StringInTimetable'>

<div class='Lesson_Coordinates'>


</div>

<div class='DataOfLesson'>



";

$this->FirstSubGroup_TopWeek->WriteHTML();
$this->FirstSubGroup_BottomWeek->WriteHTML();
$this->SecondSubGroup_TopWeek->WriteHTML();
$this->SecondSubGroup_BottomWeek->WriteHTML();

echo"

</div>

</div>

";

}

}

}




class HTML_Day{

public $NameOfDay;
public $Holiday;
public $Comment;

public $HTML_Lesson=[];

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

$this->HTML_Lesson[$this->LastNumberOfLesson]=new HTML_Lesson($ArrayOfDataString,$Last_Key);

}

}


public function WriteData(){

echo $this->NameOfDay;
echo"<br>";

for($i=1;$i<=$this->LastNumberOfLesson;$i++){

$this->HTML_Lesson[$i]->WriteData();

}

}

public function WriteHTML(){


//echo $this->FirstKeyOfDay;

//Если это выходной, то не запускаем цикл с уроками, делаем блок с выходным в секции активным

if($this->Holiday=="true"){
echo"

<section>

<div class='Name_Of_Day'>{$this->NameOfDay}</div>

<div class='Holiday'>

<p>{$this->Comment}</p>

<img src='IMG/ЗнакВШТЭ.png'>

</div>

</section>


";

}


if($this->Holiday=="false"){
echo"

<section>

<div class='Name_Of_Day'>{$this->NameOfDay}</div>

<div class='Holiday' style='display:none'>

<p>День индивидуальных занятий</p>

<img src='IMG/ЗнакВШТЭ.png'>

</div>

";


for($i=1;$i<=$this->LastNumberOfLesson;$i++){

$this->HTML_Lesson[$i]->WriteHTML();

}

echo "
</section>

";

}

}

}





class HTML_Timetable{

public $HTML_Day=[];

public function __construct($ArrayOfDataString){

$Last_Key=1;//Последний ключ  доступа к массиву

for($i=1; $i<=7; $i++){

$this->HTML_Day[$i]=new HTML_Day($ArrayOfDataString,$Last_Key);

}

}


public function WriteData(){

for($i=1; $i<=7; $i++){

$this->HTML_Day[$i]->WriteData();

}

}

public function WriteHTML(){

for($i=1; $i<=7; $i++){

$this->HTML_Day[$i]->WriteHTML();

}

}
	
}


function GetDataOfGroup($Group,&$NameOfFile,&$NameOfInstitute){


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

echo"<div class='StringOfTeacher' tabindex='1'><span>{$this->SurName} </span> <span>{$this->Name} </span> 


<span>{$this->Patronymic} </span><span>{$this->Department}</span></div>";

}
		
}

$ArrayOfTeachers=[];

$ArrayOfTeachers[0]="Нулевой ключ";


function WriteTeachers(&$ArrayOfTeachers){

$LastKey=1;


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

$ArrayOfTeachers[$LastKey]=new Teacher($Data['Department'],$Data['SurName'],$Data['Name'],

$Data['Patronymic'],$Data['Post'],$Data['FullName'],$Data['Email']);

$ArrayOfTeachers[$LastKey]->WriteHTML();



$LastKey=$LastKey+1;

}

}

?>




































