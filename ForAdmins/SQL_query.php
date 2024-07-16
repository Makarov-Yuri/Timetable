
<?php
include"GetDBSettings.php";

function SQL_query($SQL,$Answer_1="Запрос выполнен успешно",$Answer_2="При выполнении запроса возникли ошибки: ", $database=null){

$servername; // локалхост
$username; // имя пользователя
$password; // пароль если существует
$DataBase;//ваша база данных

GetDBSettings($servername,$username,$password,$DataBase);


if($database==null){

$connect = mysqli_connect($servername, $username, $password);

}
else{
	
$connect = mysqli_connect($servername, $username, $password,$database);	
	
}



if ($connect->connect_error) {
   die("Ошибка подключения: " . $connect->connect_error);
}

// Созданние базы данных
if ($connect->query($SQL) === TRUE) {
   echo $Answer_1;
   return true;
   
   
} else {
   echo $Answer_2.$connect->error;
   return false;
   
}

// Закрыть подключение
$connect->close();


}

?>
