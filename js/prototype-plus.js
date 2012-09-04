/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Array.prototype.inArray=function(valTest){
    var i,n,ret;
    n=this.length;
    ret=false;
    for(i=0;i<n;i++){
        if (this[i]==valTest) ret=true;
    }
    return ret;
}

Array.prototype.bout=function(){
    return [this[0],this[this.length-1]];
}

Array.prototype.last=function(){
    return this[this.length-1];
}

Array.prototype.first=function(){
    return this[0];
}

String.prototype.point=function(){
    return this.split(/\,/g);
}

String.prototype.m=function(){
    var seqq=this,trans;
    trans=seqq;
    seqq=seqq.replace(/^l/ig,"M");
    if(seqq.match(/^c/ig)){
        trans=trans.analyse();
        seqq="M "+trans.point;
    }
    return seqq;
}

function intersec(array1,array2){
    var n1,n2,inter,index,k;
    n1=array1.length;
    n2=array2.length;
    inter=[];
    index=[];
    for(k = 0 ; k < n2 ; k++){
        if(array1.inArray(array2[k])){
            inter.push(array2[k]);
            index.push(k);
        }
    }
    return [inter,index];
}

//Calcul la distance entre 2 points
function distance(x1,x2){
    var px1,px2,dist;
    x1=x1.point();
    x2=x2.point();
    px1=Math.pow((x2[0]-x1[0]),2);
    //ordonnées
    px2=Math.pow((x2[1]-x1[1]),2);
    //distance
    dist=Math.sqrt(px1+px2);
    return dist;
}

//Détermine le point d'un path le plus proche d'un point donné quelconque
//path est définit comme un ensemble de points indépendants
//pt est de la forme P=x,y ou P=[x,y]
function minDist(path,pt){
    var po,lo,min,index,i,test;
    po=pt;
    lo=path.length;
    min=distance(path[0],po);
    index=0;
    for (i=1;i<lo;i++){
        test = distance(path[i],po);
        if(test<min) {min=test;index=i;}
    }
    return [min,index,path[index]];
}

//Création de classe d
function d(text){
    this.value=text;
    this.seq=this.seq().seq;
}

d.prototype.seq=function(){
    var d=this.value;
    var z=false;
    if (d.match(/z\ ?$/ig)) z=true;
    var se={};
    se["z"]=z;
    se["seq"]=d.match(/[mclvh](\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?)+/ig);
    return se;    
}

d.prototype.attrib=function(value){
    this.value=value;
    return true
}

d.prototype.fusion=function(d2){
    d2.attrib(d2.value.replace(/^M/i,"L"));
    var ret = new d(this.value);
    ret.value += d2.value;
    return ret;
}

d.prototype.inverse=function(){
    var ssq_,lo_,s0,i,ssqi_,pr_,pt_,param_,typPrec_,valiny,inv;
    ssq_=this.seq;
    lo_=ssq_.length;
    s0=[];
    for(i=0;i<lo_;i++){
        s0[i]=ssq_[i].analyse();
    }    
    ssqi_=[];
    ssqi_.push("M "+s0[lo_-1].point);
    for(i=lo_-2;i>=0;i--){
        typPrec_=s0[i+1].type;
        pt_=s0[i].point;
        pr_=s0[i+1].param;
        param_="";
        if(typPrec_=="C") param_=" "+pr_[1]+" "+pr_[0];
        ssqi_.push(typPrec_+param_+" "+pt_);
    }
    valiny={};
    valiny["seq"]=ssqi_;
    valiny["d"]=new d(ssqi_.join(" "));
    return valiny;
}

//Définition class path
function path(jqPath){
    this.isPath = true;
    this.elm    = jqPath;
    this.d      = jqPath.attr("d");
    this.org   = jqPath.attr("d");
    this.id     = jqPath.attr("id");
    this.class  = jqPath.attr("class");
    this.points = this.getPoint();
    this.line   = this.pointd();
    this.bouts  = this.extrem();
    this.length = this.getPoint().length;
    return this;
}

path.prototype.md=function(value){
    this.elm.attr("d",value);
}

path.prototype.extrem=function(){
    var tab,ext;
    tab=this.points;
    ext={};
    ext["deb"]=tab[0];
    ext["fin"]=tab[tab.length-1];
    //return [tab[0],tab[tab.length-1]];
    return ext;
}

path.prototype.getPoint=function(){
    var t4;
    t4=this.d;
    t4=t4.replace(/c\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?\ (\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?/gi,"");
    t4=t4.replace(/(m|l|z)\ ?/gi,'');
    t4=t4.replace(/\ \ /gi,' ');
    t4=t4.replace(/(^\ |\ $)/ig,'');
    t4=t4.split(/\ /);
    return t4;        
}

path.prototype.pointd=function(){
    var t4;
    t4=this.d;
    t4=t4.replace(/c\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?\ (\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?/gi,"");
    t4=t4.replace(/(m|l|z)\ ?/gi,'');
    t4=t4.replace(/\ \ /gi,' ');
    t4=t4.replace(/(^\ |\ $)/ig,'');
    return t4;
}

//Calcule la distance minimale entre un path et un point
//retourne un json avec :
// -la distance calculée
path.prototype.minDist=function(point){
    var po,pat,lo,min,index,test,info,i,t4;
    po=point;
    pat=this.points;
    lo=pat.length;
    min=distance(pat[0],po);
    index=0;
    for (i=1;i<lo;i++){
        test = test.replace(/(^\ |\ $)/ig,'');
    }
    t4=t4.split(/\ /);
    return t4;        
}

path.prototype.pointd=function(){
    var t4;
    t4=this.d;
    t4=t4.replace(/c\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?\ (\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?/gi,"");
    t4=t4.replace(/(m|l|z)\ ?/gi,'');
    t4=t4.replace(/\ \ /gi,' ');
    t4=t4.replace(/(^\ |\ $)/ig,'');
    return t4;
}

//Calcule la distance minimale entre un path et un point
//retourne un json avec :
// -la distance calculée
path.prototype.minDist=function(point){
    var po,pat,lo,min,index,test,info,i;
    po=point;
    pat=this.points;
    lo=pat.length;
    min=distance(pat[0],po);
    index=0;
    for (i=1;i<lo;i++){
        test = distance(pat[i],po);
        if(test<min) {min=test;index=i;}
    }
    info={};
    info["dist"]=min;
    info["index"]=index;
    info["point"]=pat[index];
    return info;
}

path.prototype.seq = function(){
    var d,z,se;
    //d=this.d;
    d=this.attr("d");
    z=false;
    if (d.match(/z\ ?$/ig)) z=true;
    se={};
    se["z"]=z;
    se["seq"]=d.match(/[mclvh](\ ?(\d+)\.(\d+)?\ ?\,\ ?(\d+)\.(\d+)?)+/ig);
    return se;
}

//Analyse d'une séquence
String.prototype.analyse=function(){
    var tab,seq_;
    tab=this.split(/\ /);
    seq_={};
    seq_["type"]=tab[0];
    seq_["param"]="";
    if (tab.length<=2){
        seq_["point"]=tab[1];
    }else{
        seq_["point"]=tab[3];
        seq_["param"]={0:tab[1],1:tab[2]};
    }
    return seq_;
}

//path en direction inverse
path.prototype.inverse=function(class_){
    var ssq_,lo_,s0,i,ssqi_,pr_,pt_,param_,typPrec_,valiny,inv;
    ssq_=this.seq().seq;
    lo_=ssq_.length;
    s0=[];
    for(i=0;i<lo_;i++){
        s0[i]=ssq_[i].analyse();
    }    
    ssqi_=[];
    ssqi_.push("M "+s0[lo_-1].point);
    for(i=lo_-2;i>=0;i--){
        typPrec_=s0[i+1].type;
        pt_=s0[i].point;
        pr_=s0[i+1].param;
        param_="";
        if(typPrec_=="C") param_=" "+pr_[1]+" "+pr_[0];
        ssqi_.push(typPrec_+param_+" "+pt_);
    }
    valiny={};
    valiny["seq"]=ssqi_;
    valiny["d"]=ssqi_.join(" ");
    inv = new path($("<path id='inv_"+this.id+"'d='"+valiny["d"]+"' class='"+class_+"'/>"));
    valiny["path"]=inv;
    return valiny;
}

//Crée un path à partir d'une séquence
path.prototype.create=function(seq,z){
    
}

//Découpe un path en deux jusqu'à la séquence lim
path.prototype.limit=function(lim,option){
    lim=($.isArray(lim))?lim[0]:lim;
    var d,dep=0,fin=lim,seq,seql,i,seqd,trans="";
    if(option || option == true || option==1) {dep=lim;fin=this.length;}
    else {dep=0;fin=lim;}
    seq=this.seq().seq;
    seql=[]
    for(i=dep;i<fin;i++)seql.push(seq[i]);

    if(seql.length==0) seqd="";
    else{
        if(option || option == true || option==1){
            trans=seql[0];
            seql[0]=seql[0].replace(/^l/ig,"M");
            if(seql[0].match(/^c/ig)){
                trans=trans.analyse();
                seql[0]="M "+trans.point;
            }
        }
        seqd=seql.join(" ");
    }
    this.attr("d",seqd);
    return seqd;
}

//Recherche de points d'intersection entre 2 paths
//Retourne false si le paramètre n'est pas un objet path
//Dans cas contraire:
// -retourne points = [x1,x2,...] : ensemble des points d'intersection
// -path1 : le path principal
// -path2 : le path sécant au principal
// -index : index des points d'intersection sur path2
// si les deux path ne sont pas sécants alors [points] sera vide
path.prototype.intersection=function(path2,eps){
    var pt1,pt2,pointsec2,pointsec1,indexec1,indexec2,test_,eps,min_,k,res; 
    if (!path2.isPath) return false;
    pt1=this.points;
    pt2=path2.points;
    pointsec1=[];
    pointsec2=[];
    indexec1=[];
    indexec2=[];
    test_=[];
    if(!eps)eps=0.1;
    for (k=0;k<pt2.length;k++){
        min_=this.minDist(path2.points[k]);
        test_.push(min_.dist);
        if (min_.dist<=eps) {
            pointsec2.push(pt2[k]);
            pointsec1.push(min_.point);
            indexec2.push(k);
            indexec1.push(min_.index);
        }
    }
    res={};
    res["paths"]={0:this,1:path2};
    res["points"]={0:pointsec1,1:pointsec2};
    res["index"]={0:indexec1,1:indexec2};
    return res;
}

path.prototype.decoupe=function(tab){
    if(!tab) return this.d;
    var ret={},res=[],coupe=[],sequ=this.seq().seq,temp,nan=false;
    if (tab.length!=1){
        for (var i=0;i<=tab.length;i++){
            temp=sequ;
            var deb,fin;
            if (!tab[i-1]) {deb=0;fin=tab[0]+1;}
            else if(!tab[i]){
                deb=tab.last();
                coupe=temp.slice(deb);
                nan=true;
            }else{deb=tab[i-1];fin=tab[i]+1;}
            if(!nan){coupe=temp.slice(deb,fin);}
            coupe[0]=coupe[0].m();
            res.push(coupe.join(" "));
        }
    }else{
        temp=sequ;
        res.push(sequ.slice(0,tab[0]).join(" "));
        temp[tab[0]-1]=temp[tab[0]-1].m();
        coupe=temp.slice(tab[0]-1);
        res.push(coupe.join(" "));
    }
    ret["cut"]=res;
    return ret;
}

//fusion deux paths consécutifs
path.prototype.fusion=function(path2,colle){
    var res={};
    var path1=this;
    var seq1=path1.seq().seq;
    var seq2=path2.seq().seq;
    seq2[0]=seq2[0].replace(/^M/i,"L");
    seq1.push(seq2);
    res["d"]=seq1.join(" ");
    if (colle){
        this.attr("d",res["d"]);
    }
    return res;
}

//DOM
path.prototype.attr=function(name,value){
    if(value) {
        if(name=="d")this.d=value;
        return $(this.elm).attr(name,value);
    }else {
        return $(this.elm).attr(name);
    }
}

//construction et desctuction[3].analyse()
path.prototype.del=function(){
    this.elm.remove();
    return true;
}

path.prototype.make=function(after){
    this.elm.insertBefore(after);
    return true;
}

path.prototype.restore=function(){
    this.attr("d",this.org);
    this.attr("class",this.class);
    return true;
}

///////////////////////////////////////////////////////////
//Définition class seq
function seq(path){
    this.content=(path)?path.seq().seq:[];
    this.z=(path)?path.seq().z:null;
    this.length=(path)?path.length:0;
    this.points=(path)?path.points:[];
    return this;
}

seq.prototype.m=function(index){
    var seqq=this.content[index],trans;
    trans=seqq;
    seqq=seqq.replace(/^l/ig,"M");
    if(seqq.match(/^c/ig)){
        trans=trans.analyse();
        seqq="M "+trans.point;
    }
    return seqq;
}