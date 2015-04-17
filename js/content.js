
// chrome.runtime.sendMessage({error:"content 第一次访问"});

// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
// 	console.log('=================content script =============');
// 	console.dir(sender);
// });
// get message from background 
// chrome.runtime.onMessage.addListener(  function(request, sender, sendResponse) { 
// console.log(sender.tab ?  "from a content script:" + sender.tab.url:"from the extension");
//  if (request.cmd== "mycmd") 
//       sendResponse( "ok"); 
//   });
var _nb = {}
_nb.isEmptyObject = function(obj) {
    for(var prop in obj){
        return false;
    }
    return true;
}
chrome.storage.onChanged.addListener(function(changes, areaName) {
    // Do whatever you want with the changes.
    //keyName
    // chrome.storage.local.get('keyName', function(items) {
    //     console.log(items,"============");
    // });

    chrome.storage.local.get('toLogin', function(items) {
        if(!_nb.isEmptyObject(items) && !_nb.isEmptyObject(items['toLogin'])){
            if(!_nb.isEmptyObject(items['toLogin']) && items['toLogin']['name']){
                localStorage.setItem('_knight_user',items['toLogin']['name']);
                localStorage.setItem('_knight_user_pwd',items['toLogin']['pwd']);
            }
        }
        extensionInsertInto()
    });
});
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


