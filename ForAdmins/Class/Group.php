

<?php

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

}

public function WriteData(){

echo $this->NumberOfGroup." ";

echo $this->NameOfFile." ";
	
echo $this->NameOfInstitute." ";	
	
echo $this->Course." курс ";

echo $this->KeyCoordinate." координатаX ";

echo $this->NumberInCourse." номер в потоке";

echo"<br>";
	
}
		
}


?>



