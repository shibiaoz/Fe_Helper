
var _nb = {}
_nb.isEmptyObject = function(obj) {
    for(var prop in obj){
        return false;
    }
    return true;
}
 var alertTips = ['','沙盒','小流量']
if(localStorage.getItem('__cookieValue')=='1' || localStorage.getItem('__cookieValue')=='2'){
    localStorage.setItem('__cookieHasSeted','true');
    alert(alertTips[parseInt(localStorage.getItem('__cookieValue'))]);
}else{
    // -1 
    localStorage.setItem('__cookieValue',undefined);
}
var __init = function () {
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        //debugger;
        if(changes.__cookieValue){
            //cookie changes
            chrome.storage.local.get('__cookieValue', function(items) {
               // console.log(items,"======================s");
                var tmpCookie = '';
                if(!_nb.isEmptyObject(items) && !_nb.isEmptyObject(items['__cookieValue'])){
                    tmpCookie  = items['__cookieValue'].split('___')[1];
                    localStorage.setItem('__cookieValue',tmpCookie);
                    // var alertTips = ['','沙盒','小流量']
                    // if(localStorage.getItem('__cookieValue')!='-1'){
                    //     alert(alertTips[parseInt(localStorage.getItem('__cookieValue'))]);
                    // }
                    /*chrome.storage.local.get('toLogin', function(items) {
                        if(!_nb.isEmptyObject(items) && !_nb.isEmptyObject(items['toLogin'])){
                            if(!_nb.isEmptyObject(items['toLogin']) && items['toLogin']['name']){
                                localStorage.setItem('_knight_user',items['toLogin']['name']);
                                localStorage.setItem('_knight_user_pwd',items['toLogin']['pwd']);
                                extensionInsertInto();
                            }
                        }else{
                            extensionInsertInto();
                        }
                    });*/
                    localStorage.setItem('__cookieHasSeted','false');
                    extensionInsertInto();
                    
                }
            });
            return;
        }

        if(changes.toLogin || changes.time){
            //增加用户引起的
             chrome.storage.local.get('toLogin', function(items) {
                if(!_nb.isEmptyObject(items) && !_nb.isEmptyObject(items['toLogin'])){
                    if(!_nb.isEmptyObject(items['toLogin']) && items['toLogin']['name']){
                        localStorage.setItem('_knight_user',items['toLogin']['name']);
                        localStorage.setItem('_knight_user_pwd',items['toLogin']['pwd']);
                        localStorage.setItem('__cookieHasSeted','true');
                        extensionInsertInto();
                    }
                }
            });
            return;
        }
       
    });
};
__init();
// Initialization of the popup (print initial information?)
// chrome.storage.local.get({keyName: 'defaultValue'}, function(items) {
//     // Do something with items.keyName
// });

function extensionInsertInto () {
	var  e = document.createElement("script");
    e.type = "text/javascript";
    e.src = chrome.extension.getURL('/js/'+'extensionInsertInto.js');
    document.head.appendChild(e);
}


