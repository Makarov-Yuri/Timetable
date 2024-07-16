<?php

include "WriteTimetableFunctions.php";

ini_set('max_execution_time', '3600');//Увеличить максимальное время выполнения скрипта до 3600 секунд

//unlink('LastGroupsWritten.txt');//Удалить файл со списком обновления расписания

//unlink('LastDataBaseWritten.txt');//Удалить файл со последним обновлением расписания


//ИТ_1:

WriteTimetableForOneGroup(112);
WriteTimetableForOneGroup(115);
WriteTimetableForOneGroup(116);
WriteTimetableForOneGroup(114);


WriteTimetableForOneGroup(122);
WriteTimetableForOneGroup(125);
WriteTimetableForOneGroup(126);
WriteTimetableForOneGroup(124);


WriteTimetableForOneGroup(132);
WriteTimetableForOneGroup(135);
WriteTimetableForOneGroup(136);
WriteTimetableForOneGroup(134);


WriteTimetableForOneGroup(142);
WriteTimetableForOneGroup(145);
WriteTimetableForOneGroup(146);
WriteTimetableForOneGroup(144);


WriteTimetableForOneGroup(119.1);
WriteTimetableForOneGroup(119.2);
WriteTimetableForOneGroup(119.3);
WriteTimetableForOneGroup(119.4);

WriteTimetableForOneGroup(129.1);
WriteTimetableForOneGroup(129.2);
WriteTimetableForOneGroup(129.3);







//ИТ_2:

WriteTimetableForOneGroup(211);
WriteTimetableForOneGroup(221);
WriteTimetableForOneGroup(231);
WriteTimetableForOneGroup(241);

WriteTimetableForOneGroup(219);
WriteTimetableForOneGroup(229);







//ИТ_3:

WriteTimetableForOneGroup(811);
WriteTimetableForOneGroup(812);

WriteTimetableForOneGroup(821);
WriteTimetableForOneGroup(822);

WriteTimetableForOneGroup(831);
WriteTimetableForOneGroup(832);

WriteTimetableForOneGroup(841);
WriteTimetableForOneGroup(842);

WriteTimetableForOneGroup(819.1);

WriteTimetableForOneGroup(829.1);
WriteTimetableForOneGroup(829.2);







//ИУиЭ:

WriteTimetableForOneGroup(312);
WriteTimetableForOneGroup(315);
WriteTimetableForOneGroup(317);

WriteTimetableForOneGroup(321);
WriteTimetableForOneGroup(325);
WriteTimetableForOneGroup(327);

WriteTimetableForOneGroup(332);
WriteTimetableForOneGroup(335);
WriteTimetableForOneGroup(337);

WriteTimetableForOneGroup(342);
WriteTimetableForOneGroup(345);
WriteTimetableForOneGroup(347);

WriteTimetableForOneGroup(319);
WriteTimetableForOneGroup(319.1);





//ИЭиА_1:

WriteTimetableForOneGroup(411);
WriteTimetableForOneGroup(412);
WriteTimetableForOneGroup(413);
WriteTimetableForOneGroup(416);


WriteTimetableForOneGroup(421);
WriteTimetableForOneGroup(422);
WriteTimetableForOneGroup(423);
WriteTimetableForOneGroup(426);


WriteTimetableForOneGroup(431);
WriteTimetableForOneGroup(432);
WriteTimetableForOneGroup(433);
WriteTimetableForOneGroup(436);


WriteTimetableForOneGroup(441);
WriteTimetableForOneGroup(442);
WriteTimetableForOneGroup(443);
WriteTimetableForOneGroup(446);

WriteTimetableForOneGroup(429.1);
WriteTimetableForOneGroup(429.2);







//ИЭиА_2:

WriteTimetableForOneGroup(511);
WriteTimetableForOneGroup(512);
WriteTimetableForOneGroup(513);
WriteTimetableForOneGroup(515);
WriteTimetableForOneGroup(517);
WriteTimetableForOneGroup(514);


WriteTimetableForOneGroup(521);
WriteTimetableForOneGroup(522);
WriteTimetableForOneGroup(523);
WriteTimetableForOneGroup(525);
WriteTimetableForOneGroup(526);
WriteTimetableForOneGroup(527);
WriteTimetableForOneGroup(524);


WriteTimetableForOneGroup(531);
WriteTimetableForOneGroup(532);
WriteTimetableForOneGroup(533);
WriteTimetableForOneGroup(535);
WriteTimetableForOneGroup(536);
WriteTimetableForOneGroup(537);
WriteTimetableForOneGroup(534);


WriteTimetableForOneGroup(541);
WriteTimetableForOneGroup(542);
WriteTimetableForOneGroup(543);
WriteTimetableForOneGroup(545);
WriteTimetableForOneGroup(547);
WriteTimetableForOneGroup(544);

WriteTimetableForOneGroup(519);
WriteTimetableForOneGroup(529);


echo"<br>";

echo date('l jS \of F Y h:i:s A');

$File = 'LastDataBaseWritten.txt';
// Обновляем время в файле
$Data="Дата последнего обновления базы дынных: ".date('l jS \of F Y h:i:s A');
// Пишем содержимое обратно в файл
file_put_contents($File, $Data);






/*

WriteTimetableForOneGroup();
WriteTimetableForOneGroup();
WriteTimetableForOneGroup();
WriteTimetableForOneGroup();

*/

?>




































