<?php

$host="127.0.0.1";
$user="root";
$pass="mysql";
$base="carte";
$connexion = mysql_connect($host,$user,$pass) or die ("Erreur d'accès aux informations");
$db=mysql_select_db($base,$connexion)or die ("Erreur de connexion à la base de données");
mysql_query("SET NAMES 'utf8'");

?>