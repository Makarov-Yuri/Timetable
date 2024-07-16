<?php
ob_start();
//Для записи вывода в строку в php есть средства работы с буфером вывода.
//Эта функция включает буферизацию вывода. Пока активна буферизация вывода, 
//никакой вывод из сценария не отправляется (кроме заголовков), вместо этого вывод сохраняется во внутреннем буфере.

$Group=$_POST["Group"];
//$Group=124;


error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);//Выключить предупреждения (будет продолжен вывод критичных ошибок)

include_once"WriteHTMLFunctions.php";

Scan_SQL_Table_With_Timetable($Group,$ArrayOfStringInTimetable);//Включение функции для получения данных из таблицы с расписанием определенной

$HTML_Timetable=new HTML_Timetable($ArrayOfStringInTimetable);

GetDataOfGroup($Group,$NameOfFile,$NameOfInstitute);

$HTML_Timetable->WriteHTML();

$Data_HTML = ob_get_clean();

echo $Data_HTML;







?>









