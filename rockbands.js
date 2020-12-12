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
            
            if(band==undefined && singer==undefined){
                addContent("select","option",0,body);
            }
            else if(band!=undefined && singer==undefined){
                var singerNames = [];
                for(var singer in body[band]){
                    singerNames.push(singer.name);
                }
                    
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
    for(var itm in data){
        var tag = document.createElement(elemType);
        tag.nodeValue = itm;
        tag.textContent= itm;
        document.querySelectorAll(selType)[ind].appendChild(tag);
    }
}

function checkSelection(selType, ind){
    var lst = document.querySelectorAll(selType)[ind].children;
    for(var i in NodeList){
        if(i.selected == true){
            return i;
        }
    }
}

function addOnChange(selType, ind){
    document.querySelectorAll(selType)[ind].onchange = function(){
        request.open("GET","./rockbands.json");
        request.send('');
    }
}

