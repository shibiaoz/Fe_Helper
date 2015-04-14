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
var userList = [
	{name:'maling',pwd:'aaaa'},
	{name:'小波波',pwd:'aaaa'}
]; 
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

var getUserList = function(){
	var tmpUserList = [];
	var oSel = _$('#sel');
	var str = '';
	chrome.storage.local.get('userList',function(items){
		console.log(items,"===============",items['userList']);
		items && items['userList'] && (items['userList'].length >0) && (tmpUserList = items['userList']);
		console.log(tmpUserList)
		if(tmpUserList.length < 1 ){
			tmpUserList =[
				{name:'maling2',pwd:'aaaa'},
				{name:'小波波',pwd:'aaaa'}
			]; 
		}
		tmpUserList.forEach(function(value,index){
			str += '<option value="'+value['name']+'____'+value['pwd']+'">'+value['name']+'</option>';
		});
		oSel.innerHTML = str;
	});
}
// read all users then push new user to userlist ,then to set 
var storeUserInfo = function(){

	var addBtn = _$('.j_add_btn');
	var oUser = null,
	    oPwd = null;
	var user = '',
	    pwd = '';
	var oldUserList = [];
	addBtn.addEventListener('click',function(){
		oUser = _$('#userName');
		oPwd = _$('#userPwd');
		user = oUser.value;
		pwd = oPwd.value;
		var userList = [];
		chrome.storage.local.get('userList',function(items){
			items && items['userList'] && (oldUserList=items['userList']);
			oldUserList.push({name:user,pwd:pwd});
			chrome.storage.local.set({'userList':oldUserList},function(){
				console.log('set storage success');
				// call getUserList 
	   			getUserList();      
			});
		});
	});
	
}
var removeUserInfo = function(){
	var odelBtn = _$('.j_remove_btn');
	var removeFun = function(){
		chrome.storage.local.remove('userList',function() {
	    console.log('清除成功');
		    // call getUserList 
		    getUserList();       
		});
	}
	odelBtn.addEventListener('click',removeFun,false);
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
	toLogin['time'] = new Date().getTime();
	if(name && pwd){
		chrome.storage.local.set(toLogin,function(){
			console.log('set storage success');
		});
	}
	
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
	var btn  =  document.querySelector('.j_Loginbtn');
	var toLogin = false;
	btn.addEventListener('click',function  () {
		toLogin =  getToLoginInfo();
		toLoginAction(toLogin);
		// if (toLogin) {
		// 	getNowloginInfo();
		// 	chrome.storage.local.set(toLogin);
		// }
		//chrome.storage.local.set({'keyName': new Date().getTime()});
	},false);
	getUserList();
	storeUserInfo();
	removeUserInfo();
},false);
