<?php

include("./server/mysql.php");
//include("./class/svg.php");

//Attribution des variables
$qlast=  mysql_query("select MAX(num) as max from path_brut") or die(mysql_error());
$last=  mysql_fetch_array ($qlast); 
$last=$last["max"];
$last=(is_null($last) || $last=="null" || $last=="NULL")?0:$last;

$style=isset($_POST["style"])?$_POST["style"]:"NULL";
$geom=isset($_POST["geom"])?$_POST["geom"]:"M 0,0";
$num=$last++;
$id=isset($_POST["id"])?$_POST["id"]:"cpath".$num;

//insertion à la base
$sql="insert into path_brut (id,style,geom) values('$id','$style','$geom')";
$query=mysql_query($sql) or die (mysql_error());
//fin insertion
mysql_close();
$output=array();
$output["post"]=$_POST;
$output["id"]=$id;
$output=json_encode($output);
echo $output;
?>