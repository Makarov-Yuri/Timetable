<?php

function GetDBSettings(&$servername,&$username,&$password,&$DataBase){

$Data=file("../SettingsOfDB.txt");

$servername = trim($Data[1]); // локалхост
$username = trim($Data[3]); // имя пользователя
$password = trim($Data[5]); // пароль если существует
$DataBase = trim($Data[7]);







}

?>