<?php
include("./server/mysql.php");
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Carte administrative de Madagascar</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="css/css.css" />
    <script src="http://127.0.0.1/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="./raphael.js"></script>
    <script src="js/jquery-plus.js"></script>
    <script src="js/prototype-plus.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
        //console.log("Prêt pour svg-insert");
        svg=$("svg");
        svg_=document.getElementById("svg2");
        /* Capte et enregsitre à la base les infos path
        svg.find("path").each(function(num,elm){
            //console.log(num,elm);
            var style, geom, id,data=0;
            style=$(elm).attr("style");
            geom=$(elm).attr("d");
            id=$(elm).attr("id");
            data={"style":style,"geom":geom,"id":id};
            $.ajax({
                "url":      "insert.php",
                "type":     "post",
                "dataType": "json",
                "data":     data,
                "error":    function(){console.error("Il y a eu erreur")},
                "success":    function(){
                    console.log("success");
                }
            });
        });
        */
       $("#select-tous").click(function(){
           $(".list-path").find(":checkbox").attr("checked","checked");
           svg.find("path").pathShow();
       })
       $("#select-none").click(function(){
           $(".list-path").find(":checkbox").removeAttr("checked","checked");
           svg.find("path").pathHide();
       })
       $(".list-path").find("input:checkbox").click(function(){
           id="#"+$(this).val();
           $(id).altVisible();
       })
       $(".list-path").find("input:checkbox").each(function(i,list){
           id="#"+$(list).val();
           if(!$(id).isVisible()) $(list).attr("checked");
       })
       pt=[];
       pp=[];
       pa=[];
       sw=[];
       for(i=0;i<$("path").length;i++){
           pt[i]=$("path").eq(i).getPoint();
           pp[i]=$("path").eq(i).point();
           pa[i]=new path($("path").eq(i));
           sw[i]=new seq(pa[i]);
       }
    })

    </script>
</head>
<body>
<div id="content">
<div id="command">
    <a id="select-tous" href="javascript:void(0)">Tous</a>
    <a id="select-none" href="javascript:void(0)">Aucun</a>
    <ul class="list-path">
        <?php
        $sql_list=mysql_query("select * from path_brut");
        $i=0;
        while($path=mysql_fetch_array($sql_list)){
            //if($i%25==0){echo '</ul><ul class="list-path">';}
            echo '<li><input value="'.$path['id'].'" type="checkbox" checked="checked"/>'.$i.'- '.$path['id'].'</li>';
            $i++;
        }
        ?>
    </ul>

</div>
<div id="carte">
    <?php
    $svg='<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.0"
   width="803.12671"
   height="1458.4299"
   viewBox="0 0 803.12671 1458.4299"
   preserveAspectRatio="xMidYMid Slice"
   id="svg2"
   xml:space="preserve"
   inkscape:version="0.48.3.1 r9886"
   sodipodi:docname="Madagascar_location_map.svg">';
    $svg.='<g id="Madagascar" transform="scale(0.45)" style="fill:none">';
    $svg.='<rect
   width="803.12671"
   height="1458.4299"
   x="0"
   y="0"
   style="fill:#c6ecff;fill-rule:evenodd"
   id="rect7" /> ';
    
    //données de la base
    $tab=array(1,40,41,42,48);
    $tab=array(0);
    $sql="select * from path_brut";
    //$sql.=" where num in ".$tab;
    $query=mysql_query($sql) or die(mysql_error());
    while($dsvg=mysql_fetch_array($query)){
        if(in_array($dsvg['num'], $tab)) $display = "";
        else $display = "display:none";
        $svg.='<path id="'.$dsvg['id'].'" d="'.$dsvg['geom'].'" style="'.$display.'" class="'.$dsvg['class'].'"/>';
    }
    $svg.='</g></svg>';
    echo $svg;
    ?>
</div>

</div>
</body>
</html>