addOnChange("select",0);
addOnChange("select",1);

var request = new XMLHttpRequest();
request.open("GET","./rockbands.json");

var status=0;

request.onreadystatechange=function(){
    if(request.readyState==4){
        if(request.status==200){
            var body = JSON.parse(request.responseText);
            var band = checkSelection("select",0);
            var singer = checkSelection("select",1);
            console.log(band,singer);
            if(band==undefined && singer==undefined){
                addContent("select","option",0,body);
            }
            else if(band!=undefined && singer==undefined){
                var singerNames = [];
                console.log(body[band]);
                for(var singer=0;singer< body[band].length;singer++){
                    //console.log((body[band][singer]).name);
                    singerNames.push(body[band][singer]["name"]);
                }
                console.log(singerNames);
                addContent("select","option",1,singerNames);
            }
            else if(band!=undefined && singer!=undefined){
                addContent("select","option",1,body[band]);
            }
        }
    }
}

request.send('');

function addContent(selType,elemType, ind,data){
    //console.log(data);
    for(var itm in data){
        //console.log(itm.val);
        var tag = document.createElement(elemType);
        tag.nodeValue = itm;
        tag.textContent= itm;
        document.querySelectorAll(selType)[ind].appendChild(tag);
        if(selType=="select"){
            try{
                document.querySelectorAll(selType)[ind].firstElementChild.selected=true;
            }
            catch{
                console.error("selector tag has no children!");
            }
        }
    }
}

function checkSelection(selType, ind){
    for(var i=0;i< document.querySelectorAll(selType)[ind].children.length;i++){
        if(document.querySelectorAll(selType)[ind].children[i].selected == true){
            console.log(document.querySelectorAll(selType)[ind].children[i].value);
            return document.querySelectorAll(selType)[ind].children[i].value;
        }
    }
}

function addOnChange(selType, ind){
    document.querySelectorAll(selType)[ind].onchange = function(){
        request.open("GET","./rockbands.json");
        request.send('');
    }
}

