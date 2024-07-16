<?php

//Класс объекта дня

class Day{

public $NumberInWeek;
public $Name;
public $Holiday;
public $Comment;


public $KeyCoordinateX;
public $KeyCoordinateY;

public $NumberInCourse;

public $TimetableOfGroup;

public $Educational_Practice;

public $Lesson=[];


public function __construct($numberInWeek,$timetableOfGroup){

$this->NumberInWeek=$numberInWeek;

$this->TimetableOfGroup=$timetableOfGroup;

$this->NumberInCourse=$timetableOfGroup->NumberInCourse;

$this->KeyCoordinateX=$timetableOfGroup->KeyCoordinate;

$this->KeyCoordinateY=8+($numberInWeek-1)*28;

$this->Holiday="false";//По дефолту день не является выходным

$this->Comment="null";//По дефолту у дня нет комментария

if($numberInWeek==7){//Если день является воскресеньем, то сразу устанавливаем все характеристики

$this->Name="ВОСКРЕСЕНЬЕ";

$this->Holiday="true";

$this->Comment="Выходной день";
	
$this->Lesson[1]=new Lesson(1,$this);//В воскресенье будет одна несуществующая пара для отображения информации в таблице
	
} 


if($numberInWeek!=7){//Получаем название дня (который не является воскресеньем)из колоники слева

$this->Name=getCellValue($this->KeyCoordinateX-($this->NumberInCourse-1)*4-2,$this->KeyCoordinateY);

}







if($numberInWeek==6){//Если день является субботой

//Проверка является ли день <<выходным>>

if (getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+4)=="День"){

$this->Holiday="true";

$this->Comment= trim(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+4))." ".

trim(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+8))." ".

trim(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+12));
	
}


if($this->Holiday=="true"){
	
//В выходной будет одна несуществующая пара для отображения информации в таблице	

$this->Lesson[1]=new Lesson(1,$this);

}

if($this->Holiday=="false" /*and $this->Educational_Practice=="false"*/){
	
//В обычный день будет стандратное для данного дня количество пар
	
for ($NumberOfLesson=1;$NumberOfLesson<=4;$NumberOfLesson++){

$this->Lesson[$NumberOfLesson]=new Lesson($NumberOfLesson,$this);

}

}
	
}


if($numberInWeek!=6 and $numberInWeek!=7){//Если день является ни субботой, ни воскресеньем


//Проверка является ли день <<выходным>>

if (getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+10)=="День"){

$this->Holiday="true";

$this->Comment= trim(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+10))." ".

trim(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+14))." ".

trim(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+18));
	
}


if($this->Holiday=="true"){
	
//В выходной будет одна несуществующая пара для отображения информации в таблице	

$this->Lesson[1]=new Lesson(1,$this);

}

if($this->Holiday=="false" /*and $this->Educational_Practice=="false"*/){
	
//В обычный день будет стандратное для данного дня количество пар
	
for ($NumberOfLesson=1;$NumberOfLesson<=7;$NumberOfLesson++){

$this->Lesson[$NumberOfLesson]=new Lesson($NumberOfLesson,$this);

}

}

}



}




function WriteData(){

for($NumberOfLesson=1;$NumberOfLesson<=count($this->Lesson);$NumberOfLesson++){

echo $this->Educational_Practice;

$this->Lesson[$NumberOfLesson]->WriteData();

echo"<br>";	
	
}

}


public function WriteDataInSQLTable(){

for($NumberOfLesson=1;$NumberOfLesson<=count($this->Lesson);$NumberOfLesson++){

$this->Lesson[$NumberOfLesson]->WriteDataInSQLTable();
	
}

}
	
}
















	



?>








