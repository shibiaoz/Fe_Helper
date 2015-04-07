/*window.onmouseup = function(){
    var selection = window.getSelection();
    if(selection.anchorOffset != selection.extentOffset){
        chrome.runtime.sendMessage(selection.toString());
    }
}*/
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
var num = 1;
chrome.storage.onChanged.addListener(function(changes, areaName) {
    // Do whatever you want with the changes.
    console.log('============');
    //keyName
    chrome.storage.local.get('keyName', function(items) {
        console.log(items,"============")
    });
    test();
});
// Initialization of the popup (print initial information?)
// chrome.storage.local.get({keyName: 'defaultValue'}, function(items) {
//     // Do something with items.keyName
// });

function test () {
	var  e = document.createElement("script");
    e.type = "text/javascript";
    e.src = chrome.extension.getURL('/js/'+'test.js');
    document.head.appendChild(e);
}


