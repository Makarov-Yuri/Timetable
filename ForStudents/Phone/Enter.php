<?php

if(isset($_COOKIE["SetedCookies"])==true){

header('Location: ForStudents/Phone/Main.php');

exit();	
	
}

?>

<!DOCTYPE HTML>

<html lang="ru">

<head> 

<meta charset="UTF-8">

<link rel="stylesheet" href="ForStudents/Phone/CSS/resetV4.css">
<link rel="stylesheet" href="ForStudents/Phone/CSS/IndexV4.css">

<title>Расписание ВШТЭ</title>

<link rel="icon" type="image/png" sizes="32x32" href="ForStudents/Phone/IMG/ЗнакВШТЭ.png">

<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

</head>


<body>

<header>
<div>
<h1>Выберите свой институт</h1>
<p>У нас есть актуальное расписание</p>
</div>
</header>



<section class=Left>

<img src="ForStudents/Phone/IMG/Здание.png">

<ul>

<li tabindex="1"><button>Институт технологии</button></li>

<li tabindex="1"><button>Институт управления и экономики</button></li>
  
<li tabindex="1"><button>Институт энергетики и автоматизации</button></li>

</ul>


</section>






<section class=Right>

<img src="ForStudents/Phone/IMG/left-arrow.svg" tabindex="1" draggable="false"> <!-- draggable="false" - запрет на перетаскивание картинки левой кнопкой мыши-->

<p>Empty</p>

<input id="Group" name="Group" type="text" placeholder="Номер группы" autofocus name="Group">

<p id="Error_Message">В этом институте нет группы с таким номером</p>

<input id="SubGroup" name="SubGroup" type="text" placeholder="Номер подгруппы" autofocus name="SubGroup">

<input id="Button" type="button" value = "Перейти к расписанию">

<input id="Input_NameOfInstitute" name="NameOfInstitute" type="hidden" value="">

</section>

<script src="ForStudents/Phone/JS/EnterV4.js">

</script>

</body>

</html>






































