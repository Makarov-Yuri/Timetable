<?php

//Объявление класса группы

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);//Выключить предупреждения (будет продолжен вывод критичных ошибок)

ini_set('max_execution_time', '300');//Увеличить максимальное время выполнения скрипта до 300 секунд

class Group

{
	
public $NumberOfGroup;//Номер группы
	
public $NameOfFile;//имя файла, в котором находится расписание группы
	
public $NameOfInstitute;//Имя института, к которому принадлежит группа

public $Course;//Курс группы (1 - 6 курсы)

public $KeyCoordinate;//Ключевая координата - координата левой верхней ячейки столбца с расписанием группы

public $NumberInCourse;//Номер в потоке(используется для определения времени)

public function __construct($numberOfGroup,$nameOfFile,$nameOfInstitute,$course,$keyCoordinate,$numberInCourse) {

$this->NumberOfGroup=$numberOfGroup;//Присвоение характеристике группы значения

$this->NameOfFile=$nameOfFile;//Присвоение характеристике группы значения

$this->NameOfInstitute=$nameOfInstitute;//Присвоение характеристике группы значения

$this->Course=$course;//Присвоение характеристике группы значения

$this->KeyCoordinate=$keyCoordinate;

$this->NumberInCourse=$numberInCourse;

$this->NumberOfGroup=str_replace (".","_",$this->NumberOfGroup);//Заменить точки в номере группы на нижние подчеркивания

}


public function WriteData(){

echo $this->NumberOfGroup." ";

echo $this->NameOfFile." ";
	
echo $this->NameOfInstitute." ";	
	
echo $this->Course." ";

echo $this->KeyCoordinate." ";

echo $this->NumberInCourse." ";

echo"<br>";
	
}
		
}


$ArrayOfGroups=[];//Объявление массива групп

$ArrayOfGroups[0]="Нулевой ключ";


//Получить список всех файлов из директории Excel

$directory='Excel';//Путь до папки

$file=scandir($directory);//Запись списка файлов в переменную $files

unset($file [0]);//Удаление элемента массива с виртуальной директорией

unset($file [1]);//Удаление элемента массива с виртуальной директорией

$file = array_values($file);//Восстановление нумерации в массиве



//Подключение модулей для чтения Excel файлов
require_once 'Library/PHPExcel.php';
require'Library/ФункцииЧтения.php';


$Last_Key=0;//Переменная отвечает за номер последнего из определенных элементов массива объектов


$Excel;

function Scan_Excel_File($NameOfFile,$NameOfInstitute){
	
global $ArrayOfGroups;//Объявление глобальной переменной массива групп

global $Excel;

global $Last_Key;


$Excel = PHPExcel_IOFactory::load("Excel\\$NameOfFile");//Загрузка файла в оперативную память

$Course=0;//Курс группы, начинаем с нуля, чтобы потом получать соответствующем значения

$indicatorX=2;//Начальное положение курсора по оси X при сканировании Excel файла	


//Пояснение:
//При достижении конца файла необходимо, чтобы счеткик по оси Х остался на том же месте, поэтому внешний цикл должен
//иметь прееход на другой курс в начале, поэтому до начала сканирования файла нужно реализовать значение счетчика по
//горизонтальной оси такое, к которому нужно прибавит то,которое будет использоваться в дальнейшем, чтобы получить начальную координату


$indicatorY=7;//Начальное положение курсора по оси Y при сканировании Excel файла

//Цикл анализа всего файла, с условием об окончании файла

while(getCellValue($indicatorX+1,8)!="ПОНЕДЕЛЬНИК"){

$indicatorX=$indicatorX+2;//Переход к следующему курсу после конца предыдущего

$Course=$Course+1;//Получить значение курса к которому принадлежит группа

$NumberInCourse=0;//Задаем нулевой номер группы в потоке

//Цикл анализа одного потока (группы с одного курса)

while(getCellValue($indicatorX,8)!="ПОНЕДЕЛЬНИК" and getCellValue($indicatorX+1,8)!="ПОНЕДЕЛЬНИК"){
	
//Запись данных в переменную класса Group

$NumberInCourse=$NumberInCourse+1;//вычисляем номер группы в потоке

$Last_Key=$Last_Key+1;//Продвижение ползунка конечного элемента массива на единицу

//Сохраняем данные в объект

$ArrayOfGroups[$Last_Key]=new Group(getCellValue($indicatorX,7),$NameOfFile,$NameOfInstitute,$Course,$indicatorX,$NumberInCourse);

echo"$Last_Key";

echo" ";

$ArrayOfGroups[$Last_Key]->WriteData();//Отображение данных при необходимости для видимости работы
	
$indicatorX=$indicatorX+4;//Переход к следующей группе в потоке
	
}

}

	
}


Scan_Excel_File($file[0],"Институт технологии");
Scan_Excel_File($file[1],"Институт технологии");
Scan_Excel_File($file[2],"Институт технологии");
	
Scan_Excel_File($file[3],"Институт управления и экономики");	
Scan_Excel_File($file[4],"Институт энергетики и автоматизации");
Scan_Excel_File($file[5],"Институт энергетики и автоматизации");



//Scan_Excel_File("ИТ1.xlsx","Институт технологии");
//Scan_Excel_File("ИТ2.xlsx","Институт технологии");
//Scan_Excel_File("ИТ3.xlsx","Институт технологии");
	
//Scan_Excel_File("ИУиЭ.xlsx","Институт управления и экономики");	
//Scan_Excel_File("ИЭиА1.xlsx","Институт энергетики и автоматизации");
//Scan_Excel_File("ИЭиА2.xlsx","Институт энергетики и автоматизации");



//Запись данных в SQL-базу данных

include "SQL_query.php";//Подключение функции для отрпавки запросов к базе данных

function WriteSQLTable(){
	
global $ArrayOfGroups;

global $Last_Key;

//Создать SQL-таблицу

if(SQL_query("CREATE TABLE ListOfGroups (
    NumberID int,
	NumberOfGroup varchar(255),
    NameOfFile varchar(255),
	NameOfInstitute varchar(255),
	Course varchar(255),
	KeyCoordinate varchar(255),
	NumberInCourse varchar(255))", "<br>Список групп СОЗДАН успешно","<br>Ошибка создания списка групп: ","timetable-hste")==true){

//Заполнить SQL-таблицу

for($i=1; $i<=$Last_Key; $i++){	

SQL_query("

INSERT INTO ListOfGroups (NumberID, NumberOfGroup, NameOfFile,NameOfInstitute,Course,KeyCoordinate,NumberInCourse)

VALUES('$i','{$ArrayOfGroups[$i]->NumberOfGroup}','{$ArrayOfGroups[$i]->NameOfFile}','{$ArrayOfGroups[$i]->NameOfInstitute}',


'{$ArrayOfGroups[$i]->Course}','{$ArrayOfGroups[$i]->KeyCoordinate}','{$ArrayOfGroups[$i]->NumberInCourse}')", 
		   
"<br>Список групп ЗАПОЛНЕН успешно","<br>Ошибка заполнения списка групп: ","timetable-hste");	

}


}else{
	
SQL_query("DROP TABLE ListOfGroups", "<br>Список групп УДАЛЕН успешно","<br>Ошибка удаления списка групп: ","timetable-hste");

WriteSQLTable();	

}
	
}


WriteSQLTable();


?>