<?php

include "WriteTimetableFunctions.php";

ini_set('max_execution_time', '3600');//Увеличить максимальное время выполнения скрипта до 3600 секунд

$i=1;

ScanSQLTableWithGroups($ArrayOfGroups);//Включение функции для получения данных из таблицы с группами

while($i<count($ArrayOfGroups)){

ScanTimetableOfGroup($ArrayOfGroups[$i],$Excel,$TimetableOfGroup);//Запуск функции на сканирование расписания определенной группы

Create_SQL_Table_With_Timetable($TimetableOfGroup);//Запуск функции для создания и заполнения расписания определенной группы в SQL-таблице

//WriteTimetableForOneGroup($ArrayOfGroups[$i]);

$i=$i+1;

}


echo"<br>";

echo date('l jS \of F Y h:i:s A');

$File = 'LastDataBaseWritten.txt';
// Обновляем время в файле
$Data="Дата последнего обновления базы дынных: ".date('l jS \of F Y h:i:s A');
// Пишем содержимое обратно в файл
file_put_contents($File, $Data);









?>




