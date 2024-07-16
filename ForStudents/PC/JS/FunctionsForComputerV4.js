
function StartOfSettingsOfSections(){

var now = new Date();

DayOfWeek=now.getDay();

Section[DayOfWeek].style.display="block";

}

function Get_NumberOfWeek(){


Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}
	
var numberOfWeek = new Date().getWeek();

if (numberOfWeek % 2==0) {
	
Week=2;	

} else {
	
Week=1;	

}

}







//Добавить день курсового проектирования к чередующимся в недели выходным вместо дня индивидуальных занятий

function SetNewComments(){

var setCommentHoliday="День индивидуальных занятий";

for(var i=0;i<=Holiday.length-1;i++){

if(Holiday[i].children[0].innerHTML=="День курсового проектирования"){

setCommentHoliday="День курсового проектирования";

}

}


for(var i=0;i<=5;i++){

Holiday[i].children[0].innerHTML=setCommentHoliday;

}

}



function DeleteEmptyLessons(DataBlock){

if(DataBlock.children[5].innerHTML=="No"){

DataBlock.parentElement.parentElement.style.display="none";

}

}





function RecoveryLessons(){

for(var i=0; i<StringInTimetable.length;i++){

StringInTimetable[i].style.display="flex";

}

}





function removeExtraElements(){
	

for (let i=0; i<FirstSubGroupTopWeek.length;i++){
	
if(SubGroup==1){

if(Week==1){

FirstSubGroupTopWeek[i].style.display="block";	

FirstSubGroupBottomWeek[i].style.display="none";	

SecondSubGroupTopWeek[i].style.display="none";	

SecondSubGroupBottomWeek[i].style.display="none";

DeleteEmptyLessons(FirstSubGroupTopWeek[i]);	

}


if(Week==2){

FirstSubGroupTopWeek[i].style.display="none";	

FirstSubGroupBottomWeek[i].style.display="block";	

SecondSubGroupTopWeek[i].style.display="none";	

SecondSubGroupBottomWeek[i].style.display="none";

DeleteEmptyLessons(FirstSubGroupBottomWeek[i]);		

}
	
}


if(SubGroup==2){

if(Week==1){

FirstSubGroupTopWeek[i].style.display="none";	

FirstSubGroupBottomWeek[i].style.display="none";	

SecondSubGroupTopWeek[i].style.display="block";	

SecondSubGroupBottomWeek[i].style.display="none";

DeleteEmptyLessons(SecondSubGroupTopWeek[i]);		
	
}


if(Week==2){

FirstSubGroupTopWeek[i].style.display="none";	

FirstSubGroupBottomWeek[i].style.display="none";	

SecondSubGroupTopWeek[i].style.display="none";	

SecondSubGroupBottomWeek[i].style.display="block";	

DeleteEmptyLessons(SecondSubGroupBottomWeek[i]);

}
	
}
	
}

}



function Create_Holiday(){
	
let ActiveSection=0;

for (var i=0; i< Section.length;i++){

if(Section[i].style.display!="none"){

ActiveSection=Section[i];	

}

}	
	

for (var i=0; i< Section.length;i++){	
Section[i].children[0].style.display="none";	
}
	
let EmptySection=true;

for (var i=0;i <ActiveSection.children.length; i++){
	
if(ActiveSection.children[i].style.display!="none"  && ActiveSection.children[i].classList.contains('StringInTimetable')==true){

EmptySection=false;

}
	
}

if(EmptySection==true){

ActiveSection.children[0].style.display="flex";
	
}
	
}


function AdaptHeader(){
	
if(SubGroup==1){
	
StringOfGroup.innerHTML="Первая подгруппа";
	
} else{
	
StringOfGroup.innerHTML="Вторая подгруппа";
	
}	

if(Week==1){
	
StringOfWeek.innerHTML="Нечетная неделя";

	
} else{

StringOfWeek.innerHTML="Четная неделя";		
	
}	

StringOfGroup.onclick =  function(){


if(SubGroup==1){
	
SubGroup=2;

StringOfGroup.innerHTML="Вторая подгруппа";

deleteCookie("SubGroup");

// +30 день от текущей даты
let date = new Date(Date.now() + 86400e3*30);
date = date.toUTCString();

document.cookie = "SubGroup="+SubGroup+"; expires="+date+"; path="+"/"+";";

} else{
	
SubGroup=1;

StringOfGroup.innerHTML="Первая подгруппа";

deleteCookie("SubGroup");

// +30 день от текущей даты
let date = new Date(Date.now() + 86400e3*30);
date = date.toUTCString();

document.cookie = "SubGroup="+SubGroup+"; expires="+date+"; path="+"/"+";";
	
}

RecoveryLessons();

removeExtraElements();

Create_Holiday();

}

StringOfWeek.onclick =  function(){

if(Week==1){
	
Week=2;
StringOfWeek.innerHTML="Четная неделя";	
	
} else{
	
Week=1;

StringOfWeek.innerHTML="Нечетная неделя";	
	
}

RecoveryLessons();

removeExtraElements();

Create_Holiday();

}

}



function AdaptButtonsOfDay(){

var WidthOfStringButtonOfDay=window.innerWidth;


for(var i=0 ;i<=6; i++){

ButtonOfDay[i].onclick =  function(){

for(var i=0 ;i<=6; i++){
	
ButtonOfDay[i].style.background="rgb(223,245,196)";		
	
ButtonOfDay[i].style.color="black";
	
}

this.style.background="#008000";	

this.style.color="white";	


for (let i=0; i<Section.length;i++){

Section[i].style.display="none";

}

var parent =this.parentNode;// получение ссылки на родительский элемент

var number = Array.prototype.indexOf.call(parent.children, this);// узнать номер дочернего(данного) элемента

Section[number].style.display="block";

ActiveSection=number;

Create_Holiday();

}

}

}









//Функция для просмотра расписания группы без перехода на главную страницу

function ChangeData(){

var formData = new FormData();

formData.append("Group", NumberOfGroup.replace(/\s/g, ''));

var xhttp = new XMLHttpRequest();

xhttp.open("POST", "WriteData.php", true);

xhttp.send(formData);

xhttp.onreadystatechange = function() {

if (this.readyState == 4) {

InputGroup.style.background="green";

let Data=this.responseText;

let title=document.querySelector('title');


title.innerHTML="Группа "+InputGroup.value;

DataBox.innerHTML=Data;

Add_Variable();

Section[ActiveSection].style.display="block";

removeExtraElements();

AdaptButtonsOfDay();

AdaptHeader();

SetNewComments();

//Избавимся от проблемы с отсутствием работы функции Create_Hiliday при загрузке страницы

ButtonOfDay[ActiveSection].click();



deleteCookie("Group");

// +30 день от текущей даты
let date = new Date(Date.now() + 86400e3*30);
date = date.toUTCString();

document.cookie = "Group="+NumberOfGroup+"; expires="+date+"; path="+"/"+";";

}

};

}


let InputGroup=document.querySelector(".Group>input[type=text]");

let NameOfInstitute=document.querySelector(".NameOfInstitute");

var NumberOfGroup;

InputGroup.oninput=function() {
	
if(InputGroup.value.replace(/\s/g, '').length<3){

InputGroup.style.background="green";

}	

if(InputGroup.value.replace(/\s/g, '').length>=3){
	
NumberOfGroup=InputGroup.value.replace(/\s/g, '').replace('.','_');	

var formData = new FormData();

formData.append("Group", NumberOfGroup);

formData.append("NameOfInstitute", NameOfInstitute.innerHTML);

var xhttp = new XMLHttpRequest();

xhttp.open("POST", "CheckGroup.php", true);

xhttp.send(formData);

xhttp.onreadystatechange = function() {

if (this.readyState == 4) {

let Text=this.responseText;

let Code = Number(Text);

if(Code===1){

ChangeData();
	
}

if(Code===0){

DataBox.innerHTML="";
InputGroup.style.background="red";
	
}

}

};
	
}

}



let HTML_NameOfInstitute=document.querySelector(".NameOfInstitute");

HTML_NameOfInstitute.onclick=function(){
	
deleteCookie("SetedCookies");

deleteCookie("Group");

deleteCookie("SubGroup");

deleteCookie("NameOfInstitute");

window.location.replace("../../index.php");	

};























