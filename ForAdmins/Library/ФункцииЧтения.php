<?php

// Получить значение ячейки независимо от ее нахождения в диапозоне(будто бы любая ячейка диапозона содержит его значение)

function getCellValue($Column,$row){

global $Excel;

//получаем ссылку на ячейку через ее численные координаты 
$cell = $Excel->getActiveSheet()->getCellByColumnAndRow($Column-1, $row);

if($cell->isInMergeRange()==true){//находится ли ячейка в диапозоне

//$cell->getMergeRange(); получить диапозон в виде строки

$array = $Excel->getActiveSheet()->rangeToArray($cell->getMergeRange());// преобразовать диапозон (строку) в массив

$val= $array[0][0];// получить значение первого элемента
	
} else{
	
$val= $cell->getValue();	
	
}


$formatted_val=$val;//работа с получаемым значением

$formatted_val=trim($formatted_val);//Удаляем спецсимволы

$formatted_val = str_replace(" ", "", $formatted_val);//Удаляем пробелы в строке

$formatted_val = str_replace(".", "", $formatted_val);//Удаляем точки в строке

//Содержит ли строка символы --- и более

if(strpos($formatted_val,"---")!==false){

$val="-------";//Получение верного результата

}


//в пустых строках удалены лишние пробелы

if($formatted_val==""){

$val="";//Получение верного результата

}


if($formatted_val=="прз"){

$val="пр.з.";//Получение верного результата

}



if($formatted_val=="лаб"){

$val="лаб.";//Получение верного результата

}



if($formatted_val=="лек"){

$val="лек.";//Получение верного результата

}

if($formatted_val=="прак"){

$val="прак.";//Получение верного результата

}


if($formatted_val=="лек/прз"){

$val="лек./пр.з.";//Получение верного результата

}


return  $val ;
			
}


//Получить длину диапозона, в котором находится ячейка

function getWidthOfCellArray($Column,$row){
	
global $Excel;

//получаем ссылку на ячейку через ее численные координаты 
$cell = $Excel->getActiveSheet()->getCellByColumnAndRow($Column-1, $row);

if($cell->isInMergeRange()==true){//находится ли ячейка в диапозоне

//$cell->getMergeRange(); получить диапозон в виде строки

$array = $Excel->getActiveSheet()->rangeToArray($cell->getMergeRange());// преобразовать диапозон (строку) в массив

$WidthOfCellArray= count($array[0]);// получить длину массива

return $WidthOfCellArray;
} 

return false;
	
}





?>



