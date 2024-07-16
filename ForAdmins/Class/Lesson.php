<?php

//Класс объекта урока

class Lesson{

public $NumberOfLesson;
public $KeyCoordinateX;
public $KeyCoordinateY;
public $TimeOfLesson;
public $Day;


public $Ready;//Переменная отвечает за показание того, закончено ли сканирование этого урока

public $FirstSubGroup_TopWeek;
public $FirstSubGroup_BottomWeek;
public $SecondSubGroup_TopWeek;
public $SecondSubGroup_BottomWeek;




public function Empty_Lesson(){

//Пустая пара


if(

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)==""

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="" 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)=="" 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)=="" 

)

{
	

$this->Ready=true;	
	
}
	
}


public function Common_Lesson_For_One_Group(){

//Обычная пара для одной целой группы

if(

$this->Ready==false

and

(

//Проверка по размещению в таблице типа занятия

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лаб." or 


getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="пр.з." or 


getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек." or 


getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек./пр.з." or


getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="прак.")



//Проверка на длину блока с название предмета

and getWidthOfCellArray($this->KeyCoordinateX,$this->KeyCoordinateY+1)==4

//обособление от пар зависящих от недели

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)== getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)


//обособление от пар зависящих от подгруппы

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="лаб." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="пр.з." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="лек."

//обособление от пар зависящих от подгруппы и от недели

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="лаб." 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="пр.з." 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="лек." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="лаб." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="пр.з." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="лек." 

)

){
	
$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->Ready=true;	
	
}
	
}


public function Common_Lesson_For_Few_Groups(){

//Обычная пара для нескольких групп(лекция для потока/части потока)

if(

$this->Ready==false

and

(

getWidthOfCellArray($this->KeyCoordinateX,$this->KeyCoordinateY+1)>4

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)== getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)!=""

)

){

//Вычисление ширины блока с лекцией
$i=0;

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="пр.з." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек./пр.з." 

){

$i=$i+1;
	
}

$WidthToAuditorium=getWidthOfCellArray($this->KeyCoordinateX,$this->KeyCoordinateY+1)-$i-1;

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium,$this->KeyCoordinateY);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium,$this->KeyCoordinateY);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium,$this->KeyCoordinateY);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium,$this->KeyCoordinateY);

$this->Ready=true;	

}
	
}



public function Lesson_Common_Depend_On_Group(){

//Обычное разделение по подгруппам

if(

$this->Ready==false

and

(

//Все вариации типов занятий

(


(
getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек." 

and (getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лаб." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лек." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="пр.з." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="-------")

)

or

(
getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лаб." 

and (getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лаб." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лек." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="пр.з." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="-------")

)

or

(

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="пр.з." 

and (getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="пр.з." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лек." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лаб." 

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="-------")

)

or

(

getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лек." 

and (getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лаб." 

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек."

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="пр.з." 

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="-------")

)

or

(

getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лаб." 

and (getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лаб." 

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек."

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="пр.з." 

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="-------")

)

or

(

getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="пр.з." 

and (getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="пр.з." 

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек."

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лаб." 

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="-------")

)

)

//Исключение смешанного типа(по блокам высотой в две единицы )

and

(

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)==getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)

and

getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1)==getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)

)


//Исключение смешанного типа (по названиям типов занятий)
and

(

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="лаб." and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="лаб.")

or

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="пр.з." and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="пр.з.")

)

)

){

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->Ready=true;	
	
}

}





public function Lesson_Common_Depend_On_Week_For_One_Group(){

//Пара с зависимостью от недели у одной целой группы

if(

$this->Ready==false

and

(


getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)!= getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)

and getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY+1)<5

and getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY+3)<5

//Исключение смешанного типа
and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="лаб." and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="пр.з."

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="лек." and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="-------"


and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="лаб." and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="пр.з."

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="лек." and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="-------"

)

){

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+2);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+2);

if
($this->FirstSubGroup_TopWeek->Teacher==$this->FirstSubGroup_TopWeek->Subject){
$this->FirstSubGroup_TopWeek->Teacher="";
}

if
($this->FirstSubGroup_BottomWeek->Teacher==$this->FirstSubGroup_BottomWeek->Subject){
$this->FirstSubGroup_BottomWeek->Teacher="";
}

if
($this->SecondSubGroup_TopWeek->Teacher==$this->SecondSubGroup_TopWeek->Subject){
$this->SecondSubGroup_TopWeek->Teacher="";
}

if
($this->SecondSubGroup_BottomWeek->Teacher==$this->SecondSubGroup_BottomWeek->Subject){
$this->SecondSubGroup_BottomWeek->Teacher="";
}

$this->Ready=true;	

}

}


public function Lesson_Common_Depend_On_Week_For_Few_Group(){



if(

$this->Ready==false

and

(

(

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)!= getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)

or(getWidthOfCellArray($this->KeyCoordinateX,$this->KeyCoordinateY+1)>4 and//Новое

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)=="")//Новое

)




and
( 
getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY+1)>4

or

getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY+3)>4
)

//Исключение смешанного типа
and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="лаб." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="пр.з."

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)!="-------"//Новое

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="лаб." 

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="пр.з."

and getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)!="-------"//Новое




)

){

$i=0;

if
(

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!="лек." 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!="пр.з." 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!="лаб."

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!="лек./пр.з."//Новое

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!=""

)

{

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="пр.з."

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек./пр.з."//Новое

){

$i=$i+1;
	
}

}

$WidthToAuditorium1=getWidthOfCellArray($this->KeyCoordinateX,$this->KeyCoordinateY+1)-$i-1;

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);


$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);

if($WidthToAuditorium1>0){

$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium1,$this->KeyCoordinateY);	

$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium1,$this->KeyCoordinateY);
	
} else {

$this->FirstSubGroup_TopWeek->Auditorium="";

$this->SecondSubGroup_TopWeek->Auditorium="";

}

$i=0;

if
(

getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="лек." 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="пр.з." 

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="лаб."

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!="лек./пр.з."//Новое

and getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!=""

)

{

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="пр.з."

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="лек./пр.з."//Новое

){

$i=$i+1;
	
}

}

$WidthToAuditorium2=getWidthOfCellArray($this->KeyCoordinateX,$this->KeyCoordinateY+3)-$i-1;

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);


$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);

if($WidthToAuditorium2>0){

$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium2,$this->KeyCoordinateY+2);

$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium2,$this->KeyCoordinateY+2);

} else{

$this->FirstSubGroup_BottomWeek->Auditorium="";

$this->SecondSubGroup_BottomWeek->Auditorium="";

}


if
($this->FirstSubGroup_TopWeek->Teacher==$this->FirstSubGroup_TopWeek->Subject){
$this->FirstSubGroup_TopWeek->Teacher="";
}

if
($this->FirstSubGroup_BottomWeek->Teacher==$this->FirstSubGroup_BottomWeek->Subject){
$this->FirstSubGroup_BottomWeek->Teacher="";
}

if
($this->SecondSubGroup_TopWeek->Teacher==$this->SecondSubGroup_TopWeek->Subject){
$this->SecondSubGroup_TopWeek->Teacher="";
}

if
($this->SecondSubGroup_BottomWeek->Teacher==$this->SecondSubGroup_BottomWeek->Subject){
$this->SecondSubGroup_BottomWeek->Teacher="";
}

$this->Ready=true;	

}

}




public function Lesson_Mix_Style(){

if(

$this->Ready==false

and

(

(

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лаб." or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="пр.з."

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)=="лек.")

and

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)!=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+1))

)

or

(

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)=="лаб." or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)=="пр.з."

or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)=="лек.")

and

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3)!=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+3))

)

or

(

(getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лаб." or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="пр.з."

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)=="лек.")

and

(getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1)!=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+1))

)

or

(

(getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)=="лаб." or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)=="пр.з."

or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)=="лек.")

and

(getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3)!=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+3))

)

)

){

$this->Ready=true;	


//отсутствие зависимости от недели слева	
if(

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)==getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2))

and

(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)!="" or getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1)!="-------")


){


$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+2);

}


//отсутствие зависимости от недели справа
else if(

(getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1)==getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2))

and

(getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1)!=""or getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1)!="-------")



){

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);

}





//общая пара сверху	
else if(

getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY)==getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)

){

$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);
//$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+1);







if(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!=""){

$i=0;

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="пр.з." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек./пр.з."

){

$i=$i+1;
	
}

$WidthToAuditorium1=getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY)-($i-1);

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium1,$this->KeyCoordinateY);

} else{
	
$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);	
	
}

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);





$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
//$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+1);

if(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY)!=""){

$i=0;

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="пр.з." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY)!="лек./пр.з."

){

$i=$i+1;
	
}

$WidthToAuditorium3=getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY)-($i-1);

//$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2);
//$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium3,$this->KeyCoordinateY+2);

$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium3,$this->KeyCoordinateY);



} else{
	
$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);
	
}


$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+2);	


}










// общая пара снизу
else if(

getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2)==getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)

){

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);




$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);


if(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!=""){

$i=0;

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="пр.з." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="лек./пр.з."

){

$i=$i+1;
	
}

$WidthToAuditorium2=getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY+2)-($i-1);

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium2,$this->KeyCoordinateY+2);

} else{

$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
	
}








$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);




$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);

if(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2)!=""){

$i=0;

while(

getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="лек." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="пр.з." 

and getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2)!="лек./пр.з."

){

$i=$i+1;
	
}

$WidthToAuditorium4=getWidthOfCellArray($this->KeyCoordinateX+1,$this->KeyCoordinateY+2)-($i-1);

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX-$i,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+$WidthToAuditorium4,$this->KeyCoordinateY+2);
	
} else{

$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);
	
	
}


}





// полное разделение
else if
(
//отсутствие общей пары сверху

getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY)!=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY)

and 

//Отсутствие общей пары снизу

getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2)!=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2)


){

$this->FirstSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);
$this->FirstSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+1);
$this->FirstSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY);


$this->FirstSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);
$this->FirstSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+3);
$this->FirstSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+1,$this->KeyCoordinateY+2);


$this->SecondSubGroup_TopWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);
$this->SecondSubGroup_TopWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+1);
$this->SecondSubGroup_TopWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY);


$this->SecondSubGroup_BottomWeek->TypeOfLesson=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+2);
$this->SecondSubGroup_BottomWeek->Subject=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Teacher=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+3);
$this->SecondSubGroup_BottomWeek->Auditorium=getCellValue($this->KeyCoordinateX+3,$this->KeyCoordinateY+2);	

}

}

}



public function __construct($numberOfLesson,$day){

$this->Day=$day;
$this->NumberOfLesson=$numberOfLesson;

//$this->Exist="No";//По стандарту пара не существует
$this->Ready=false;//Изначально расписание данной пары "не сканировано"

$this->KeyCoordinateX=$day->KeyCoordinateX;
$this->KeyCoordinateY=$day->KeyCoordinateY+($this->NumberOfLesson-1)*4;

//Код для полноценной практики:

//Узнаем есть ли в дне практика:

$DayKeyCoordinateX=$this->Day->KeyCoordinateX;
$DayKeyCoordinateY=$this->Day->KeyCoordinateY;

$IsExistFullEducationalPractice=false;

$NeedToWriteFullEducationalPractice=false;

$NumberOfLessonOfBeginPractice=0;



//Проверяем есть ли в дне полноценная практика

for ($i=$DayKeyCoordinateY;$i<$DayKeyCoordinateY+28;$i=$i+4){

$NumberOfLessonOfBeginPractice=$NumberOfLessonOfBeginPractice+1;

//Условие для полноценной практики

if
(

getCellValue($DayKeyCoordinateX,$i)=="прак."

and getCellValue($DayKeyCoordinateX,$i+1)==getCellValue($DayKeyCoordinateX,$i+3)

){

//Если выполнены условия, то это полная практика

$IsExistFullEducationalPractice=true;

if($NumberOfLessonOfBeginPractice==$this->NumberOfLesson){

$NeedToWriteFullEducationalPractice=true;//Нужно ли писать практику в этом уроке

}

break;

}

}




if($IsExistFullEducationalPractice==true and $NeedToWriteFullEducationalPractice==false){

$StringOfTime=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY);

$this->TimeOfLesson= substr($StringOfTime,0,2).':'.substr($StringOfTime,2,5).":".substr($StringOfTime,7,2);	

$this->FirstSubGroup_TopWeek= new SimpleBlock($this,"First","Top");
$this->FirstSubGroup_BottomWeek=new SimpleBlock($this,"First","Bottom");
$this->SecondSubGroup_TopWeek=new SimpleBlock($this,"Second","Top");
$this->SecondSubGroup_BottomWeek=new SimpleBlock($this,"Second","Bottom");

}






if($IsExistFullEducationalPractice==true and $NeedToWriteFullEducationalPractice==true){

//Узнаем "высоту" практики

$Subject=getCellValue($DayKeyCoordinateX,$DayKeyCoordinateY+($NumberOfLessonOfBeginPractice-1)*4+1);

$HeightOfEducationalPractice=0.5;

for($i=$DayKeyCoordinateY+($NumberOfLessonOfBeginPractice-1)*4+2;$i<$DayKeyCoordinateY+28;$i=$i+2){

$HeightOfEducationalPractice=$HeightOfEducationalPractice+0.5;

if
(getCellValue($DayKeyCoordinateX,$i+1)!=$Subject){
break;
}

}


$TypeOfLesson=getCellValue($this->KeyCoordinateX,$DayKeyCoordinateY+($NumberOfLessonOfBeginPractice-1)*4);

$Auditorium=getCellValue($this->KeyCoordinateX+3,$DayKeyCoordinateY+($NumberOfLessonOfBeginPractice-1)*4);

//$Subject=$HeightOfEducationalPractice;

$Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+$HeightOfEducationalPractice*4-1);


if(($HeightOfEducationalPractice - floor($HeightOfEducationalPractice))==0){
//Если число целое, то обычное значение переменных

$StringOfTime1=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY);

$StringOfTime2=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY+($HeightOfEducationalPractice)*4-1);	

$this->TimeOfLesson= substr($StringOfTime1,0,2).':'.substr($StringOfTime1,2,2)."-".substr($StringOfTime2,5,2).':'.substr($StringOfTime2,7,2);


$this->FirstSubGroup_TopWeek= new SimpleBlock($this,"First","Top");
$this->FirstSubGroup_BottomWeek=new SimpleBlock($this,"First","Bottom");
$this->SecondSubGroup_TopWeek=new SimpleBlock($this,"Second","Top");
$this->SecondSubGroup_BottomWeek=new SimpleBlock($this,"Second","Bottom");



$this->FirstSubGroup_TopWeek->TypeOfLesson=$TypeOfLesson;
$this->FirstSubGroup_TopWeek->Subject=$Subject;
$this->FirstSubGroup_TopWeek->Teacher=$Teacher;
$this->FirstSubGroup_TopWeek->Auditorium=$Auditorium;


$this->FirstSubGroup_BottomWeek->TypeOfLesson=$TypeOfLesson;
$this->FirstSubGroup_BottomWeek->Subject=$Subject;
$this->FirstSubGroup_BottomWeek->Teacher=$Teacher;
$this->FirstSubGroup_BottomWeek->Auditorium=$Auditorium;


$this->SecondSubGroup_TopWeek->TypeOfLesson=$TypeOfLesson;
$this->SecondSubGroup_TopWeek->Subject=$Subject;
$this->SecondSubGroup_TopWeek->Teacher=$Teacher;
$this->SecondSubGroup_TopWeek->Auditorium=$Auditorium;


$this->SecondSubGroup_BottomWeek->TypeOfLesson=$TypeOfLesson;
$this->SecondSubGroup_BottomWeek->Subject=$Subject;
$this->SecondSubGroup_BottomWeek->Teacher=$Teacher;
$this->SecondSubGroup_BottomWeek->Auditorium=$Auditorium;

}

if(($HeightOfEducationalPractice - floor($HeightOfEducationalPractice))!=0){

//Если практика на нижней неделе ограниченная, то несколько иное значение переменных

$StringOfTime1=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY);

$StringOfTime2=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY+($HeightOfEducationalPractice)*4-1);	

$this->TimeOfLesson= substr($StringOfTime1,0,2).':'.substr($StringOfTime1,2,2)."-".substr($StringOfTime2,5,2).':'.substr($StringOfTime2,7,2);

$this->FirstSubGroup_TopWeek= new SimpleBlock($this,"First","Top");
$this->SecondSubGroup_TopWeek=new SimpleBlock($this,"Second","Top");

$this->FirstSubGroup_TopWeek->TypeOfLesson=$TypeOfLesson;
$this->FirstSubGroup_TopWeek->Subject=$Subject;
$this->FirstSubGroup_TopWeek->Teacher=$Teacher;
$this->FirstSubGroup_TopWeek->Auditorium=$Auditorium;

$this->SecondSubGroup_TopWeek->TypeOfLesson=$TypeOfLesson;
$this->SecondSubGroup_TopWeek->Subject=$Subject;
$this->SecondSubGroup_TopWeek->Teacher=$Teacher;
$this->SecondSubGroup_TopWeek->Auditorium=$Auditorium;




$StringOfTime1=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY);

$StringOfTime2=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY+($HeightOfEducationalPractice-0.5)*4-1);	

$this->TimeOfLesson= substr($StringOfTime1,0,2).':'.substr($StringOfTime1,2,2)."-".substr($StringOfTime2,5,2).':'.substr($StringOfTime2,7,2);

$this->FirstSubGroup_BottomWeek=new SimpleBlock($this,"First","Bottom");
$this->SecondSubGroup_BottomWeek=new SimpleBlock($this,"Second","Bottom");

$this->FirstSubGroup_BottomWeek->TypeOfLesson=$TypeOfLesson;
$this->FirstSubGroup_BottomWeek->Subject=$Subject;
$this->FirstSubGroup_BottomWeek->Teacher=$Teacher;
$this->FirstSubGroup_BottomWeek->Auditorium=$Auditorium;

$this->SecondSubGroup_BottomWeek->TypeOfLesson=$TypeOfLesson;
$this->SecondSubGroup_BottomWeek->Subject=$Subject;
$this->SecondSubGroup_BottomWeek->Teacher=$Teacher;
$this->SecondSubGroup_BottomWeek->Auditorium=$Auditorium;

}

}






/*

//Если день содержит учебниую практику, то код немного изменяется:

if($this->Day->Educational_Practice=="true"){

//Определяем количество уроков (высоту) в практике:

$Height=1;

$NumberOfLesson=$this->NumberOfLesson;

while(getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+$Height*4)!='' and $NumberOfLesson<7){

$NumberOfLesson=$NumberOfLesson+1;

$Height=$Height+1;

}


$StringOfTime1=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY);

$StringOfTime2=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY+($Height-1)*4);	

$this->TimeOfLesson= substr($StringOfTime1,0,2).':'.substr($StringOfTime1,2,2)."-".substr($StringOfTime2,5,2).':'.substr($StringOfTime2,7,2);

$TypeOfLesson=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY);

$Auditorium=getCellValue($this->KeyCoordinateX+2,$this->KeyCoordinateY);

$Subject=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+2);

$Teacher=getCellValue($this->KeyCoordinateX,$this->KeyCoordinateY+$Height*4-1);



$this->FirstSubGroup_TopWeek= new SimpleBlock($this,"First","Top");
$this->FirstSubGroup_BottomWeek=new SimpleBlock($this,"First","Bottom");
$this->SecondSubGroup_TopWeek=new SimpleBlock($this,"Second","Top");
$this->SecondSubGroup_BottomWeek=new SimpleBlock($this,"Second","Bottom");

//Заполнение простейших блоков данными:

$this->FirstSubGroup_TopWeek->TypeOfLesson=$TypeOfLesson;
$this->FirstSubGroup_TopWeek->Subject=$Subject;
$this->FirstSubGroup_TopWeek->Teacher=$Teacher;
$this->FirstSubGroup_TopWeek->Auditorium=$Auditorium;


$this->FirstSubGroup_BottomWeek->TypeOfLesson=$TypeOfLesson;
$this->FirstSubGroup_BottomWeek->Subject=$Subject;
$this->FirstSubGroup_BottomWeek->Teacher=$Teacher;
$this->FirstSubGroup_BottomWeek->Auditorium=$Auditorium;


$this->SecondSubGroup_TopWeek->TypeOfLesson=$TypeOfLesson;
$this->SecondSubGroup_TopWeek->Subject=$Subject;
$this->SecondSubGroup_TopWeek->Teacher=$Teacher;
$this->SecondSubGroup_TopWeek->Auditorium=$Auditorium;


$this->SecondSubGroup_BottomWeek->TypeOfLesson=$TypeOfLesson;
$this->SecondSubGroup_BottomWeek->Subject=$Subject;
$this->SecondSubGroup_BottomWeek->Teacher=$Teacher;
$this->SecondSubGroup_BottomWeek->Auditorium=$Auditorium;

}

*/





if($IsExistFullEducationalPractice==false and $NeedToWriteFullEducationalPractice==false){

$StringOfTime=getCellValue($this->KeyCoordinateX-($day->NumberInCourse-1)*4-1,$this->KeyCoordinateY);

$this->TimeOfLesson= substr($StringOfTime,0,2).':'.substr($StringOfTime,2,5).":".substr($StringOfTime,7,2);	

$this->FirstSubGroup_TopWeek= new SimpleBlock($this,"First","Top");
$this->FirstSubGroup_BottomWeek=new SimpleBlock($this,"First","Bottom");
$this->SecondSubGroup_TopWeek=new SimpleBlock($this,"Second","Top");
$this->SecondSubGroup_BottomWeek=new SimpleBlock($this,"Second","Bottom");


//Анализ расписания определенного урока и соответствующая запись данных

$this->Empty_Lesson();

$this->Common_Lesson_For_One_Group();

$this->Common_Lesson_For_Few_Groups();

$this->Lesson_Common_Depend_On_Group();

$this->Lesson_Common_Depend_On_Week_For_One_Group();

$this->Lesson_Common_Depend_On_Week_For_Few_Group();

$this->Lesson_Mix_Style();

}
	
}



public function WriteData(){

$this->FirstSubGroup_TopWeek->WriteData();
$this->FirstSubGroup_BottomWeek->WriteData();
$this->SecondSubGroup_TopWeek->WriteData();
$this->SecondSubGroup_BottomWeek->WriteData();
	
}


public function WriteDataInSQLTable(){

$this->FirstSubGroup_TopWeek->WriteDataInSQLTable();
$this->FirstSubGroup_BottomWeek->WriteDataInSQLTable();
$this->SecondSubGroup_TopWeek->WriteDataInSQLTable();
$this->SecondSubGroup_BottomWeek->WriteDataInSQLTable();	

}
	
}













































?>








