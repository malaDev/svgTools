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
    <script type="text/javascript">
    $(document).ready(function(){
        svg=$("svg");
        svg.find("g.group-region").click(function(e){
            if(!e.ctrlKey) {
                svg.find("g.selected").each(function(i,elm){
                    $(elm).delClass("selected");
                })
            }
            $(this).plusClass("selected");
        })
    })
    jQuery.fn.delClass=function(class_){
        var cls=$(this).attr("class");
        var reg=new RegExp("\ ?"+class_+"\ ?","ig");
        if (cls){
            cls=cls.replace(reg,'');
            $(this).attr("class",cls);
        }
    }
    jQuery.fn.plusClass=function(class_){
        var cls=$(this).attr("class");
        var reg=new RegExp(class_,"ig");
        if (cls){
            if (!cls.match(reg))
            $(this).attr("class",cls+" "+class_);
        }
    }    
    </script>
</head>
<body>
<div id="content">

<div id="carte2">
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
   id="svg2"
   xml:space="preserve"
   inkscape:version="0.48.3.1 r9886"
   sodipodi:docname="Madagascar_location_map.svg">';
    $svg.='<g id="Madagascar" transform="scale(0.4)" style="fill:none">';
    $svg.='<rect
   width="803.12671"
   height="1458.4299"
   x="0"
   y="0"
   style="fill:#c6ecff;fill-rule:evenodd"
   id="rect7" /> ';
    
    //données de la base
    /*
    $tab=array(1,40,41,42,48);
    $tab=array();
    $sql="select * from path_brut order by `zindex`";
    //$sql.=" where num in ".$tab;
    $query=mysql_query($sql) or die(mysql_error());
    while($dsvg=mysql_fetch_array($query)){
        $title="";
        if($dsvg["zindex"]==3) $title=$dsvg["name"];
        $svg.='<path id="'.$dsvg['id'].'" title="'.$title.'" d="'.$dsvg['geom'].'" class="'.$dsvg['class'].'"/>';
    }
    */
    $sqlg=mysql_query("select `group`,`name` FROM `path_brut` where not `group` is null and `group`<>'mada' group by `group`") or die(mysql_error());
    while($group=mysql_fetch_array($sqlg)){
        $svg.='<g title="'.$group["name"].'" class="group-region">';
        $group_=$group["group"];
        $sql="select * from path_brut where `group`='$group_'";
        $query=mysql_query($sql) or die(mysql_error());
        while($dsvg=mysql_fetch_array($query)){
            $title="";
            if($dsvg["zindex"]==3) $title=$dsvg["name"];
            $svg.='<path id="'.$dsvg['id'].'" title="'.$title.'" d="'.$dsvg['geom'].'" class="'.$dsvg['class'].'"/>';
        }        
        $svg.="</g>";
    }
    
    $svg.="<g class='del-group'>";
        $sqld="select * from path_brut where `group` is null";
        $query=mysql_query($sqld) or die(mysql_error());
        while($dsvg=mysql_fetch_array($query)){
            if($dsvg["zindex"]==3) $title=$dsvg["name"];
            $svg.='<path id="'.$dsvg['id'].'" d="'.$dsvg['geom'].'" class="'.$dsvg['class'].'"/>';
        }    
    $svg.="</g>";   
    $svg.='</g></svg>';
    echo $svg;
    ?>
</div>

<div id="infos">
    <h2>Région Atsinanana</h2>
    <table>
        <tr><td>Chef lieu de région</td><td>Toamasina</td></tr>
        <tr><td>Population</td><td>878 000 habitants</span></td></tr>
        <tr><td>Croissance démographique</td><td>2.4%</span></td></tr>
        <tr><td>taux de pauvreté</td><td>67%</span></td></tr>
    </table>
</div>
   
    
</div>
</body>
</html>