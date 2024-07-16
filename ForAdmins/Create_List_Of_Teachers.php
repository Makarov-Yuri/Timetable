<?php

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);//Выключить предупреждения (будет продолжен вывод критичных ошибок)

ini_set('max_execution_time', '300');//Увеличить максимальное время выполнения скрипта до 300 секунд


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
		
}

//Подключение модулей для чтения Excel файлов

require_once 'Library/PHPExcel.php';
require'Library/ФункцииЧтения.php';

$ArrayOfTeachers=[];//Объявление массива групп

$ArrayOfTeachers[0]="Нулевой ключ";
$ArrayOfTeachers[1]="Первый ключ";


//Переменная отвечает за номер последнего из определенных элементов массива объектов

$Last_Key=2;

$Excel;

function Scan_Excel_File(&$ArrayOfTeachers){

global $Excel;

global $Last_Key;

$Excel = PHPExcel_IOFactory::load("Teachers\\Список преподавателей.xlsx");//Загрузка файла в оперативную память

$Number;//Номер преподавателя в списке
	
$Department;//Кафдера

$SurName;//Фамилия

$Name;//Имя

$Patronymic;//Отчество

$Post;//Должность

$FullName;//Фамилия и инициалы

$Email;//Почта преподавателя



//Цикл анализа всего файла, с условием об окончании файла

while(getCellValue(1,$Last_Key)!=""){
	
$Department=getCellValue(1,$Last_Key);

$SurName=getCellValue(2,$Last_Key);

$Name=getCellValue(3,$Last_Key);

$Patronymic=getCellValue(4,$Last_Key);

$Post=getCellValue(5,$Last_Key);

$FullName=getCellValue(6,$Last_Key);

$Email=getCellValue(7,$Last_Key);

$ArrayOfTeachers[$Last_Key]=new Teacher($Department,$SurName,$Name,$Patronymic,$Post,$FullName,$Email);

echo ($Last_Key-1)." ";

$ArrayOfTeachers[$Last_Key]->WriteData();//Отображение данных при необходимости для видимости работы

$Last_Key=$Last_Key+1;

}

}

Scan_Excel_File($ArrayOfTeachers);








//Запись данных в SQL-базу данных

include "SQL_query.php";//Подключение функции для отрпавки запросов к базе данных

function WriteSQLTable(&$ArrayOfTeachers){

global $Last_Key;
	

//Создать SQL-таблицу

if(SQL_query("CREATE TABLE ListOfTeachers (
    NumberID int,
	Department varchar(255),
	SurName varchar(255),
    Name varchar(255),
	Patronymic varchar(255),
	Post varchar(255),
	FullName varchar(255),
	Email varchar(255))", "<br>Список преподавателей СОЗДАН успешно",
	
	"<br>Ошибка создания списка преподавателей: ","timetable-hste")==true){

//Заполнить SQL-таблицу

for($i=2; $i<$Last_Key; $i++){	

$Number=$i-1;

SQL_query("

INSERT INTO ListOfTeachers (NumberID, Department,SurName, Name, Patronymic, Post, FullName, Email)

VALUES('$Number','{$ArrayOfTeachers[$i]->Department}','{$ArrayOfTeachers[$i]->SurName}','{$ArrayOfTeachers[$i]->Name}',

'{$ArrayOfTeachers[$i]->Patronymic}','{$ArrayOfTeachers[$i]->Post}','{$ArrayOfTeachers[$i]->FullName}',

'{$ArrayOfTeachers[$i]->Email}')", 
		   
"<br>Список преподавателей ЗАПОЛНЕН успешно","<br>Ошибка заполнения списка преподавателей: ","timetable-hste");	

}


}else{
	
SQL_query("DROP TABLE ListOfTeachers", "<br>Список преподавателей УДАЛЕН успешно",

"<br>Ошибка удаления списка преподавателей: ","timetable-hste");

WriteSQLTable($ArrayOfTeachers);	

}
	
}


WriteSQLTable($ArrayOfTeachers);





?>



