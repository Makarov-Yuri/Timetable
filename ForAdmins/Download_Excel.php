
<?php

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);//Выключить предупреждения (будет продолжен вывод критичных ошибок)

$arrContextOptions=array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
);  



//Получить ссылки на файлы

$html = file_get_contents("https://gturp.spb.ru/?page_id=1120", false, stream_context_create($arrContextOptions));

$document=new DOMDocument();

$document->loadHTML($html);


$Links=[];

$Links[0]="Нулевой ключ";

for($i=0; $i<count($document->getElementsByTagName('a'));$i++){

//echo"Number $i ";

//$document->getElementsByTagName('a')[$i]->getAttribute('href');//Получаем значение атрибута тега с этим

//Проверка входит ли подстрока в строку

if(stripos($document->getElementsByTagName('a')[$i]->getAttribute('href'),"Для-студентов-гр.")){

//Если следующая ссылка не равна прошлой

if(substr_replace(str_replace(".xlsx","",$document->getElementsByTagName('a')[$i]->getAttribute('href')),"",-1)//Удаляем .xlsx, удаляем последний символ
!=substr_replace(str_replace(".xlsx","",$document->getElementsByTagName('a')[$i-1]->getAttribute('href')),"",-1)){//Удаляем .xlsx, удаляем последний символ
echo"<br>";
echo" Ссылка не повторяется:             ";
$Links[array_key_last($Links)+1]=$document->getElementsByTagName('a')[$i]->getAttribute('href');
echo $Links[array_key_last($Links)];
echo"<br>";
}

if(substr_replace(str_replace(".xlsx","",$document->getElementsByTagName('a')[$i]->getAttribute('href')),"",-1)==//Удаляем .xlsx, удаляем последний символ
substr_replace(str_replace(".xlsx","",$document->getElementsByTagName('a')[$i-1]->getAttribute('href')),"",-1)){//Удаляем .xlsx, удаляем последний символ
echo"<br>";
echo" Ссылка повторяется:             ";
$Links[array_key_last($Links)]=$document->getElementsByTagName('a')[$i]->getAttribute('href');
echo $Links[array_key_last($Links)];
echo"<br>";
}
}



}


echo"<br>";

for($i=1; $i<count($Links)-1;$i++){

echo $Links[$i];

echo"<br>";

}

echo"<br>";

$Name_Of_File_array=[];

$Name_Of_File_array[1]= "ИТ1.xlsx";

$Name_Of_File_array[2]= "ИТ2.xlsx";

$Name_Of_File_array[3]= "ИТ3.xlsx";

$Name_Of_File_array[4]= "ИУиЭ.xlsx";

$Name_Of_File_array[5]= "ИЭиА1.xlsx";

$Name_Of_File_array[6]= "ИЭиА2.xlsx";



//Перезапись файлов

for($i=1;$i<=6;$i++){

$path = "Excel/$Name_Of_File_array[$i]";

$url=$Links[$i];

$Data=file_get_contents($url, false, stream_context_create($arrContextOptions));

file_put_contents($path,$Data);


}





//Добавить Excel файлы в папки для скачивания студентами

//Папка для ПК

for($i=1;$i<=6;$i++){

$path = "../ForStudents/PC/Excel/$Name_Of_File_array[$i]";

$url=$Links[$i];

$Data=file_get_contents($url, false, stream_context_create($arrContextOptions));

file_put_contents($path,$Data);


}

//Папка для мобильных устройств

for($i=1;$i<=6;$i++){

$path = "../ForStudents/Phone/Excel/$Name_Of_File_array[$i]";

$url=$Links[$i];

$Data=file_get_contents($url, false, stream_context_create($arrContextOptions));

file_put_contents($path,$Data);


}

echo"Файлы обновлены";

//Записать дату последнего скачивания Excel файлов

echo"<br>";

echo date('l jS \of F Y h:i:s A');

$File = 'LastExcelFileUpload.txt';
// Обновляем время в файле
$Data="Дата последнего обновления Excel файлов: ".date('l jS \of F Y h:i:s A');
// Пишем содержимое обратно в файл
file_put_contents($File, $Data);


?>