$.ajax({
    "url":"insert-region.php",
    "type":"POST",
    "dataType":"json",
    "data":svgMada,
    "success":function(){
        console.log("OK");
    },
    "error":function(){console.error("Nisy Blem")}
})