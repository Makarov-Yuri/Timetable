<?php

//Класс объекта расписания группы

class TimetableOfGroup{

public $NumberOfGroup;
public $KeyCoordinate;//Координата по оси X
public $NumberInCourse;
public $Day=[];

public function __construct($Group){

$this->NumberOfGroup=$Group->NumberOfGroup;
$this->KeyCoordinate=$Group->KeyCoordinate;
$this->NumberInCourse=$Group->NumberInCourse;

for($NumberInWeek=1;$NumberInWeek<=7;$NumberInWeek++){
	
$this->Day[$NumberInWeek]= new Day($NumberInWeek,$this);	
	
}

}	

public function WriteData(){

echo"<br>";	
echo"<br>";	
echo $this->NumberOfGroup;
echo"<br>";	
echo"<br>";	

echo"День недели выходной комментарий существование занятия номер пары время";

echo"<br>";	
echo"<br>";	

for($NumberInWeek=1;$NumberInWeek<=7;$NumberInWeek++){

echo $this->Day[$NumberInWeek]->WriteData();	
echo"<br>";
	
}
	
}






public function WriteDataInSQLTable(){

for($NumberInWeek=1;$NumberInWeek<=7;$NumberInWeek++){

$this->Day[$NumberInWeek]->WriteDataInSQLTable();	
	
}

}




	
}



?>

