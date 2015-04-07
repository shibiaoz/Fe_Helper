// var Test = {};
// window.addEventListener('load',function  () {
// 	var _$ = function  (selector) {
// 		return document.querySelector(selector);
// 	}
// 	var _$s = function  (selector) {
// 		return document.querySelectorAll(selector);
// 	}
// 	var btn  =  document.querySelector('.btn');

// 	btn.addEventListener('click',function  () {
// 		var value = _$('#sel').value;
// 		var name = value && value.split('-')[0];
// 		var pwd = value && value.split('-')[1];
// 		console.log(name,'=======',pwd);
// 		Test['name'] = name;
// 		//chrome.runtime.sendMessage
// 		chrome.runtime.sendMessage({name:name,pwd:pwd, error:"获取文章信息失败."});
// 	},false);

// 	//btn.addEventListener('click',function(){console.log(name,'------')},false);
// 	// import jquery
// 	// in page_action html if import js
// 	//js code can run  why ?
// 	// $('.btn').on('click',function  () {
// 	// 	var value = $('#sel').val();
// 	// 	var name = value && value.split('-')[0];
// 	// 	var pwd = value && value.split('-')[1];
// 	// });
// },false)

// some function utils 
var _$ = function  (selector) {
		return document.querySelector(selector);
	}
var _$s = function  (selector) {
	return document.querySelectorAll(selector);
}

var getToLoginInfo = function(){
	var oSel = _$('#sel');
	if(oSel){
		var value = oSel.value;
		var name = value && value.split('____')[0];
		var pwd = value && value.split('____')[1];
		if(!name || !value){
			return false;
		}
		return {
			toLogin:{
				name:name,
				pwd:pwd
			}
		}
	}
}

var getNowloginInfo = function (){
	chrome.storage.local.get('toLogin', function(items) {
    // Do something with items.keyName
    console.log('___________________--');
    	console.log(items);
	});
}

var toLoginAction = function (toLogin) {
	if(!toLogin){
		return;
	}
	var name = toLogin && toLogin['toLogin']['name'];
	var pwd = toLogin && toLogin['toLogin']['pwd'];
	chrome.storage.local.get('toLogin',function(items){
		var nowName = items && items['toLogin']['name'];
		var nowPwd = items && items['toLogin']['pwd'];
		if(name!=nowName){
				console.log(toLogin['toLogin']['name'],"设置的值")
			chrome.storage.local.set(toLogin,function(){
				console.log('set storage success');
			});
		}
	});
	
}

// Get notified of changes (in the popup?)
chrome.storage.onChanged.addListener(function(changes, areaName) {
    // Do whatever you want with the changes.
   // console.log('======sfdsdfds======');
});
// Initialization of the popup (print initial information?)
chrome.storage.local.get({keyName: 'defaultValue'}, function(items) {
    // Do something with items.keyName
});

// Content script, storage (remember document title?)
//chrome.storage .local.set({keyName: document.title});

window.addEventListener('load',function  () {
	
	var btn  =  document.querySelector('.btn');
	var toLogin = false;
	btn.addEventListener('click',function  () {
		toLogin =  getToLoginInfo();
		console.log(toLogin['toLogin']['name'],'====name')
		toLoginAction(toLogin);
		// if (toLogin) {
		// 	getNowloginInfo();
		// 	chrome.storage.local.set(toLogin);
		// }
		//chrome.storage.local.set({'keyName': new Date().getTime()});
	},false);
},false)