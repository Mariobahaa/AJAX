addOnChange("select", 0);
addOnChange("select", 1);

var request = new XMLHttpRequest();
request.open("GET", "./rockbands.json");

var status = 0;

request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var body = JSON.parse(request.responseText);
            var band = checkSelection("select", 0);
            var singer = checkSelection("select", 1);
            //console.log(band,singer);
            if (band == undefined && singer == undefined) {
                addContent("select", "option", 0, body, false);
            } else if (band != undefined && singer == undefined) {
                var singerNames = [];
                //console.log(body[band]);
                for (var s = 0; s < body[band].length; s++) {
                    //console.log((body[band][singer]).name);
                    singerNames.push(body[band][s]["name"]);
                }
                //console.log(singerNames);
                addContent("select", "option", 1, singerNames, true);
            } else if (band != undefined && singer != undefined) {
                for (var s = 0; s < body[band].length; s++) {
                    console.log(s);
                    if (body[band][s]["name"] == singer) {
                        try {
                            location.assign(body[band][s]["value"]);
                        } catch {
                            console.error("Singer has no link!");
                        }
                    }
                }
            }
        }
    }
}

request.send('');

function addContent(selType, elemType, ind, data, val) {
    if(val){
        var tag = document.createElement(elemType);
        tag.nodeValue = "Please Select";
        tag.textContent = "Please Select";
        document.querySelectorAll(selType)[ind].appendChild(tag);
    }
    //console.log(data);
    for (var itm in data) {
        //console.log(itm.val);
        var tag = document.createElement(elemType);
        //console.log("itm= "+itm);
        //console.log("data[itm] ="+data[itm]);
        tag.nodeValue = !val ? itm : data[itm];
        tag.textContent = !val ? itm : data[itm];
        document.querySelectorAll(selType)[ind].appendChild(tag);
        if (selType == "select") {
            try {
                document.querySelectorAll(selType)[ind].firstElementChild.selected = true;
            } catch {
                console.error("selector tag has no children!");
            }
        }
    }
}

function checkSelection(selType, ind) {

    for (var i = 0; i < document.querySelectorAll(selType)[ind].children.length; i++) {
        if (document.querySelectorAll(selType)[ind].children[i].selected == true) {
            //console.log(document.querySelectorAll(selType)[ind].children[i].value);
            return document.querySelectorAll(selType)[ind].children[i].value;
        }
    }
}

function addOnChange(selType, ind) {

    document.querySelectorAll(selType)[ind].onchange = function () {
        //clear second ddl
        if (ind == 0) {
            for (var i = document.querySelectorAll(selType)[ind + 1].children.length - 1; i >= 0; i--) {
                document.querySelectorAll(selType)[ind + 1].options[i] = null;
            }
        }
        
        //send a new request
        request.open("GET", "./rockbands.json");
        request.send('');
    }
}
