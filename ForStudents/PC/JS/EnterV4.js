
const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;

let LeftBlock= document.querySelector('.Left');
let Header= document.querySelector('header');
let RightBlock= document.querySelector('.Right');

var nameOfInstitute="empty";

let RightP= document.querySelector('.Right>p');

let LeftBlock_Li= document.querySelectorAll('.Left>ul>li');

var HTML_form=document.querySelector('form');

let body = document.querySelector('body');

//Header.style.height=window.innerHeight * 0.25+'px';
//LeftBlock.style.marginTop=window.innerHeight * 0.25+'px';

for(var i=0;i<=2;i++){

//LeftBlock_Li[i].style.height=window.innerHeight * 0.25+'px';

}




let button = document.querySelectorAll('body > section.Left > ul > li >button');

for (var i=0; i<=2; i++){

button[i].onclick = function() {
	
	
nameOfInstitute = this.innerHTML;

RightP.innerHTML=nameOfInstitute;

Input_NameOfInstitute.value=nameOfInstitute;	

LeftBlock.classList.remove('RightShift');
Header.classList.remove('RightShift');
RightBlock.classList.remove('RightShift');
 
LeftBlock.classList.add('LeftShift');
Header.classList.add('LeftShift');
RightBlock.classList.add('LeftShift');
 
Group.value= '';
 
SubGroup.value= '';

};

}


 
let ArrowIMG = document.querySelector('.Right>img');

ArrowIMG.onclick = function() {
LeftBlock.classList.remove('LeftShift');
Header.classList.remove('LeftShift');
RightBlock.classList.remove('LeftShift');
 
LeftBlock.classList.add('RightShift');
Header.classList.add('RightShift');
RightBlock.classList.add('RightShift');
 
Group.value= '';
 
SubGroup.value= '';
 
Button.style.background="rgb(223,245,196)";
 
Button.style.color="grey";
Button.style.fontWeight="100";
  
Error_Message.style.display="none";
 
};


let Input_NameOfInstitute=document.querySelector('#Input_NameOfInstitute');

Group.oninput=function() {
 
if (Group.value.replace(/\s/g, '').length>=3 && (SubGroup.value.replace(/\s/g, '') == "1"|| SubGroup.value.replace(/\s/g, '') == "2")){
 
Button.style.background="#008000";
 
Button.style.color="white";
Button.style.fontWeight="bold";
Input_NameOfInstitute.setAttribute("value",nameOfInstitute);

} else{
 
Error_Message.style.display="none";
 
Button.style.background="rgb(223,245,196)";
Button.style.color="grey";
Button.style.fontWeight="100";
 
}
 
};
 
 
SubGroup.oninput=function(){
 
if (Group.value.replace(/\s/g, '').length>=3 && (SubGroup.value.replace(/\s/g, '') == "1"|| SubGroup.value.replace(/\s/g, '') == "2")){
	
//убрать лишние пробелы
 
Button.style.background="#008000";
 
Button.style.color="white";
Button.style.fontWeight="bold";
Input_NameOfInstitute.setAttribute("value",nameOfInstitute);

} else{

Error_Message.style.display="none";
 
Button.style.background="rgb(223,245,196)";
Button.style.color="grey";
Button.style.fontWeight="100";
 
}
 
};


function SetMyCookies(){


//Преобразовать Group.value к другому значению изменить точку на _(нижнее подчеркивание)

var NumberOfGroup=Group.value.replace('.','_').replace(/\s/g, '');
	
// +30 день от текущей даты
let date = new Date(Date.now() + 86400e3*30);
date = date.toUTCString();

document.cookie = "SetedCookies="+"Yes"+"; expires="+date+"; path="+"/"+";";

document.cookie = "Group="+NumberOfGroup+"; expires="+date+"; path="+"/"+";";

document.cookie = "SubGroup="+SubGroup.value.replace(/\s/g, '')+"; expires="+date+"; path="+"/"+";";

document.cookie = "NameOfInstitute="+Input_NameOfInstitute.value+"; expires="+date+"; path="+"/"+";";
	
}

Button.onclick=function(){

if(Group.value.replace(/\s/g, '').length>=3 && (SubGroup.value.replace(/\s/g, '') == "1"|| SubGroup.value.replace(/\s/g, '') == "2")){

var formData = new FormData();

formData.append("Group", Group.value.replace(/\s/g, ''));

formData.append("NameOfInstitute", Input_NameOfInstitute.value);

var xhttp = new XMLHttpRequest();

xhttp.open("POST", "ForStudents/PC/CheckGroup.php", true);

xhttp.send(formData);

xhttp.onreadystatechange = function() {

if (this.readyState == 4) {

let Text=this.responseText;

let Code = Number(Text);

if(Code===1){

SetMyCookies();

window.location.replace("ForStudents/PC/Main.php");
	
}

if(Code===0){
Error_Message.style.display="flex";	
	
}

}

};
	
}

};

var IMG_Building_HSTE= document.querySelector('.Left>img');

var HTML_Name_Of_Institute=document.querySelectorAll('.Left>ul>li');


















/*

if(window.innerHeight > window.innerWidth){

for(var i=0;i<=2;i++){

HTML_Name_Of_Institute[i].style.height=window.innerHeight*0.15+'px';
	
}

IMG_Building_HSTE.style.top=window.innerHeight*0.5+'px';
	
Header.style.height=window.innerHeight*0.3+'px';

LeftBlock.style.marginTop=window.innerHeight * 0.24+'px';
	
}

*/


/*
window.onresize=function(){

Header.style.height=window.innerHeight * 0.25+'px';
LeftBlock.style.marginTop=window.innerHeight * 0.25+'px';

for(var i=0;i<=2;i++){

LeftBlock_Li[i].style.height=window.innerHeight * 0.25+'px';
	
}		

if(window.innerHeight > window.innerWidth){
	

for(var i=0;i<=2;i++){

HTML_Name_Of_Institute[i].style.height=window.innerHeight*0.15+'px';
	
}

IMG_Building_HSTE.style.top=window.innerHeight*0.5+'px';

Header.style.height=window.innerHeight*0.3+'px';

LeftBlock.style.marginTop=window.innerHeight * 0.24+'px';	
	
}

if(window.innerHeight < window.innerWidth){
	

for(var i=0;i<=2;i++){

HTML_Name_Of_Institute[i].style.height=window.innerHeight*0.25+'px';
	
}

IMG_Building_HSTE.style.top=0+'px';
	
Header.style.height=window.innerHeight*0.25+'px';

LeftBlock.style.marginTop=window.innerHeight * 0.25+'px';	
	
}

};


*/




body.style.opacity = 1;	




























