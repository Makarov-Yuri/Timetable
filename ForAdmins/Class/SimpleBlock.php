<?php


//Класс объекта простого блока, включающего основную информацию о каждой паре

class SimpleBlock{
	
public $Lesson;//Ссылка на родительский урок
public $Subgroup;//Первая или вторая подгруппа
public $Week;//Верхняя или нижняя неделя

public $Exist;//Указание существования пары


public $TimeOfLesson;//Время проведения пары
public $TypeOfLesson;//Тип пары (лекция,практическое занятие и другое)
public $Subject;//Название предмета
public $Teacher;//Преподаватель
public $Auditorium;//Аудитория с парой


public function __construct($lesson,$subgroup,$week){
	
$this->Lesson=$lesson;
$this->Subgroup=$subgroup;
$this->Week=$week;
$this->TimeOfLesson=$this->Lesson->TimeOfLesson;	
}

function WriteData(){



if
(

($this->Subject=="" or $this->Subject=="-------")

and

($this->Teacher=="" or $this->Teacher=="-------")

and

($this->Auditorium=="" or $this->Auditorium=="-------")

){
	
$this->Exist="No";
	
} else{

$this->Exist="Yes";//По дефолту пара существует	

}






echo $this->Lesson->Day->Name." ";

echo $this->Lesson->Day->Holiday." выходной ";

echo $this->Lesson->Day->Comment." комментарий ";

echo $this->Exist." exists ";

echo $this->Lesson->NumberOfLesson." пара ";

echo $this->TimeOfLesson." ";

echo $this->Subgroup." подгруппа ";

echo $this->Week." неделя ";

echo $this->TypeOfLesson."  ";

echo $this->Subject."  ";

echo $this->Teacher."  ";

echo $this->Auditorium."  ";

echo"<br>";
	
}


public function WriteDataInSQLTable(){
	
global $Last_NumberID;

$Last_NumberID=$Last_NumberID+1;

//Заполнить SQL-таблицу

SQL_query("

INSERT INTO group_".$this->Lesson->Day->TimetableOfGroup->NumberOfGroup." ( NumberID, DayOfWeek, Holiday,Comment,Exist,NumberOfLesson,Time,

Subgroup,Week,TypeOfLesson,Subject,Teacher,Auditorium)

VALUES( $Last_NumberID,'{$this->Lesson->Day->Name}','{$this->Lesson->Day->Holiday}','{$this->Lesson->Day->Comment}',

'{$this->Exist}','{$this->Lesson->NumberOfLesson}','{$this->TimeOfLesson}','{$this->Subgroup}',

'{$this->Week}','{$this->TypeOfLesson}','{$this->Subject}','{$this->Teacher}','{$this->Auditorium}')", 


"<br>Строка ЗАПОЛНЕНА успешно","<br>Ошибка заполнения строки: ","timetable-hste");	
	
}
	
}



































?>
