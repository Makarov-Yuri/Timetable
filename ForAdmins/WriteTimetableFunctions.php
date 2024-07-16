<?php

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);//Выключить предупреждения (будет продолжен вывод критичных ошибок)

ini_set('max_execution_time', '3600');//Увеличить максимальное время выполнения скрипта до 3600 секунд

//Подключение модулей для чтения Excel файлов

require_once 'Library/PHPExcel.php';
require'Library/ФункцииЧтения.php';

include "SQL_query.php";//Подключение функции для отрпавки запросов к базе данных

include"Class/Group.php";//Подключить файл с классом Group

include"Class/SimpleBlock.php";//Подключить файл с классом SimpleBlock

include"Class/Lesson.php";//Подключить файл с классом Day

include"Class/Day.php";//Подключить файл с классом Day

include"Class/Timetable.php";//Подключить файл с классом Day

include_once"GetDBSettings.php";


//Функция для сканирование таблицы с группами, получение данных для дальнейшего сканирования Excel файла

function ScanSQLTableWithGroups(&$ArrayOfGroups){
	
$ArrayOfGroups=[];//Объявление массива групп

$ArrayOfGroups[0]="Нулевой ключ";

$Last_Key=0;


/*
$db_host="localhost"; // ваш хост
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
$result = $mysqli->query('SELECT * FROM `listofgroups`'); // запрос на выборку
while($Data=$result->fetch_assoc())// получаем все строки в цикле по одной
{
//echo '<p>Запись id='.$Data['GroupID'].'. Текст: '.$Data['Course'].'</p>';// выводим данные

$Last_Key=$Last_Key+1;

//Сохраняем данные в объект типа Croup

$ArrayOfGroups[$Last_Key]=new Group($Data['NumberOfGroup'],$Data['NameOfFile'],

$Data['NameOfInstitute'],$Data['Course'],$Data['KeyCoordinate'],$Data['NumberInCourse']);

}
	
}



//Анализ расписания произвольной группы

function ScanTimetableOfGroup($Group,&$Excel,&$TimetableOfGroup){

$Excel = PHPExcel_IOFactory::load("Excel\\{$Group->NameOfFile}");//Загрузка файла в оперативную память

$TimetableOfGroup=new TimetableOfGroup($Group);

$TimetableOfGroup->WriteData();//Вывод данных для проверки

}

//Запись данных в SQL таблицу

$Last_NumberID;

function Create_SQL_Table_With_Timetable($TimetableOfGroup){

global $Last_NumberID;

$Last_NumberID=0;

//Создать SQL-таблицу

if(SQL_query("CREATE TABLE Group_".$TimetableOfGroup->NumberOfGroup." (
    NumberID varchar(255),
    DayOfWeek varchar(255),
	Holiday varchar(255),
	Comment varchar(255),
	Exist varchar(255),
	NumberOfLesson varchar(255),
	Time varchar(255),
	Subgroup varchar(255),
	Week varchar(255),
	TypeOfLesson varchar(255),
	Subject varchar(255),
	Teacher varchar(255),
	Auditorium varchar(255))", "<br>Таблица группы СОЗДАНА успешно","<br>Ошибка создания таблицы группы: ","timetable-hste")==true){

//Заполнить SQL таблицу

$TimetableOfGroup->WriteDataInSQLTable();

}else{
	
SQL_query("DROP TABLE Group_".$TimetableOfGroup->NumberOfGroup."", "<br>Список групп УДАЛЕН успешно","<br>Ошибка удаления списка групп: ","timetable-hste");

Create_SQL_Table_With_Timetable($TimetableOfGroup);	

}

}


$ArrayOfGroups;
$Excel;
$TimetableOfGroup;

function WriteTimetableForOneGroup($DesiredNumber){

global $ArrayOfGroups;
global $Excel;
global $TimetableOfGroup;

ScanSQLTableWithGroups($ArrayOfGroups);//Включение функции для получения данных из таблицы с группами



$DesiredNumber=str_replace (".","_",$DesiredNumber);//Заменить точки в номере группы на нижние подчеркивания

//Поиск группы с определенным номером

$i=1;

while($ArrayOfGroups[$i]->NumberOfGroup!=$DesiredNumber){
$i=$i+1;
}


ScanTimetableOfGroup($ArrayOfGroups[$i],$Excel,$TimetableOfGroup);//Запуск функции на сканирование расписания определенной группы

Create_SQL_Table_With_Timetable($TimetableOfGroup);//Запуск функции для создания и заполнения расписания определенной группы в SQL-таблице


//Запись данных в файл

echo"<br>";

echo date('l jS \of F Y h:i:s A');

$File = 'LastGroupsWritten.txt';
// Обновляем время в файле

$Data=file_get_contents($File);

$Data=$Data."\n"."Дата последнего обновления данных {$ArrayOfGroups[$i]->NumberOfGroup} группы: ".date('l jS \of F Y h:i:s A');

// Пишем содержимое обратно в файл
file_put_contents($File, $Data);

}

?>