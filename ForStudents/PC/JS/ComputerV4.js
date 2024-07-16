let windowInnerWidth = window.innerWidth;
let windowInnerHeight = window.innerHeight;

let SubGroup=getCookie('SubGroup');


let Week=1;

let body=document.querySelector('body');

var Section = document.querySelectorAll('section');

var ActiveSection;

var Holiday =document.querySelectorAll('.Holiday');

var StringInTimetable = document.querySelectorAll('.StringInTimetable');

var TimeOfLesson = document.querySelectorAll('.TimeOfLesson');

var TypeOfLesson=document.querySelectorAll('.TypeOfLesson');

var Teacher = document.querySelectorAll('.Teacher');
 
var Subject = document.querySelectorAll('.Subject');
 
var Auditorium = document.querySelectorAll('.Auditorium');

var FirstSubGroupTopWeek= document.querySelectorAll('.FirstSubGroupTopWeek');

var FirstSubGroupBottomWeek= document.querySelectorAll('.FirstSubGroupBottomWeek');

var SecondSubGroupTopWeek= document.querySelectorAll('.SecondSubGroupTopWeek');

var SecondSubGroupBottomWeek= document.querySelectorAll('.SecondSubGroupBottomWeek');

var ButtonOfDay=document.querySelectorAll('.DaysOfWeek>li');

var StringButtonOfDay=document.querySelector('.DaysOfWeek');

var Header=document.querySelector('header');

var StringOfWeek= document.querySelector('.Week');

var StringOfGroup= document.querySelector('.SubGroup');

var BlockOfTime=document.querySelector('.Time');

var BlockOfDate=document.querySelector('.Date');

var Exists=document.querySelectorAll('.Exists');

var DayOfWeek;

function Add_Variable(){

Section = document.querySelectorAll('section');

Holiday =document.querySelectorAll('.Holiday');

StringInTimetable = document.querySelectorAll('.StringInTimetable');

TimeOfLesson = document.querySelectorAll('.TimeOfLesson');

Teacher = document.querySelectorAll('.Teacher');
 
Subject = document.querySelectorAll('.Subject');
 
Auditorium = document.querySelectorAll('.Auditorium');

FirstSubGroupTopWeek= document.querySelectorAll('.FirstSubGroupTopWeek');

FirstSubGroupBottomWeek= document.querySelectorAll('.FirstSubGroupBottomWeek');

SecondSubGroupTopWeek= document.querySelectorAll('.SecondSubGroupTopWeek');

SecondSubGroupBottomWeek= document.querySelectorAll('.SecondSubGroupBottomWeek');

ButtonOfDay=document.querySelectorAll('.DaysOfWeek>li');

StringButtonOfDay=document.querySelector('.DaysOfWeek');

Header=document.querySelector('header');

StringOfWeek= document.querySelector('.Week');

StringOfGroup= document.querySelector('.SubGroup');

BlockOfTime=document.querySelector('.Time');

BlockOfDate=document.querySelector('.Date');

TypeOfLesson=document.querySelectorAll('.TypeOfLesson');

Exists=document.querySelectorAll('.Exists');

}




StartOfSettingsOfSections();

Get_NumberOfWeek();

removeExtraElements();

AdaptButtonsOfDay();

AdaptHeader();

SetNewComments();

var Time = setInterval(function() {
var date = new Date();

var Hours=date.getHours();

if(Hours<10){
StrHours='0'+Hours;
}else{StrHours=Hours}

var Minutes=date.getMinutes();

if(Minutes<10){
StrMinutes='0'+Minutes;
}
else{StrMinutes=Minutes}


var Seconds=date.getSeconds();

if(Seconds<10){
StrSeconds='0'+Seconds;
}else{StrSeconds=Seconds}

BlockOfTime.innerHTML = (StrHours + ":" + StrMinutes + ":" + StrSeconds);
}, 10);


var Month;

var date = new Date();

switch(date.getMonth()+1){
	
case 1:	Month='января';
break;

case 2:	Month='февраля';
break;

case 3:	Month='марта';
break;

case 4:	Month='апреля';
break;

case 5:	Month='мая';
break;

case 6:	Month='июня';
break;

case 7:	Month='июля';
break;

case 8:	Month='августа';
break;

case 9:	Month='сентября';
break;

case 10:Month='октября';
break;
	
case 11:Month='ноября';
break;	
	
case 12:Month='декабря';
break;		

}



BlockOfDate.innerHTML=''+date.getDate()+' '+Month;



body.style.visibility="visible";



//Избавимся от проблемы с отсутствием работы функции Create_Holiday при загрузке страницы

var now = new Date();

DayOfWeek=now.getDay();

//DayOfWeek==0 если сейчас воскресенье, но воскресенье имеет номер 6 в HTML коде, поэтому:

if(DayOfWeek==0){

ButtonOfDay[6].click();

ActiveSection=6;

} 

//DayOfWeek>0 если сейчас не воскресенье, но воскресенье имеет номер 0, поэтому:

if(DayOfWeek>0){

ButtonOfDay[DayOfWeek-1].click();

ActiveSection=DayOfWeek-1;

}




