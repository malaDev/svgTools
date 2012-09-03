    $.fn.pathHide=function(){
        this.each(function(i,elm){
            style=$(elm).attr("style");
            style+=";display:none";
            $(elm).attr("style",style);
        })
    };
    $.fn.pathShow=function(){
        this.each(function(i,elm){
            style=$(elm).attr("style");
            style=style.replace(/;?display:none/g,"");
            $(elm).attr("style",style);
        })
    };
    $.fn.isVisible=function(){
        style=this.attr("style");
        if(style.match(/display:none/))return false;
        else return true;
    };
    $.fn.altVisible=function(cls,attr){
        if($(this).isVisible()) {
            $(this).pathHide();
            $(cls).find('input:checkbox[value='+attr+']').removeAttr("checked")
        }else {
            $(this).pathShow()
            $(cls).find('input:checkbox[value='+attr+']').attr("checked","checked")
        };
    }
    $.fn.getPoint=function(){
            t4=$(this).attr("d");
            t4=t4.replace(/c\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?\ (\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?/gi,"");
            t4=t4.replace(/(m|l|z)\ ?/gi,'');
            t4=t4.replace(/\ \ /gi,' ');
            t4=t4.replace(/(^\ |\ $)/ig,'');
            t4=t4.split(/\ /);
            return t4;
    }
    $.fn.point=function(){
            t4=$(this).attr("d");
            t4=t4.replace(/c\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?\ (\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?/gi,"");
            t4=t4.replace(/(m|l|z)\ ?/gi,'');
            t4=t4.replace(/\ \ /gi,' ');
            t4=t4.replace(/(^\ |\ $)/ig,'');
            //t4=t4.split(/\ /);
            return t4;
    }    