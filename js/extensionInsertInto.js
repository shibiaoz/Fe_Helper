var debug = true;
var timer = null;
var chromelen = 0;
var __ex_name = $.getPageData('user.user_name');
var _knight_user = localStorage.getItem('_knight_user');
var _knight_user_pwd = localStorage.getItem('_knight_user_pwd');
var __cookieValue =parseInt(localStorage.getItem('__cookieValue'));
debugger;
if([-1,1,2].indexOf(__cookieValue) > -1){
    // 修改cookie
    if(__cookieValue==-1){
        clearCookie('pub_env');
    }else{
        setCookie('pub_env',__cookieValue);
    }
    setTimeout(function() {
        window.location.reload();
    }, 1000);
    
}else{
    accountSwitch(true);
}


function accountSwitch(debug) {
    if(debug){
         _login();
        timeCheck();
    }else{
        if(__ex_name != _knight_user){    
            _login();
            timeCheck();
        }
    }
}


function _login () {
	_.Module.use('pcommon/component/LoginDialog', ['', '']);
}
function fillIn () {
	//debugger;
	var name = _knight_user;
	var pwd = _knight_user_pwd;
    // form body attrbute id is changing,but rules i do not know,so ....
	var $dialog = $('#passport-login-pop').find('.tang-foreground');//login dialog form
	$dialog.find('input[name="userName"]').val(name);
	$dialog.find('input[name="password"]').val(pwd);
    // sometimes trigger click ,it will show checking code
    setTimeout(function() {
       $dialog.find('input[type="submit"]').trigger('click');
    }, 1000);
    //这个时间如果频繁的切换时间要设置大些
	//$dialog.find('input[type="submit"]').trigger('click');
	
}
// 这里为啥没有clear掉，待会好好研究下,擦，逗比了，函数里面用到变量我在这赋值，然后在函数里第二次覆盖
//timer的时候，实际上在外部已经把timer赋值为null，所以clearInterval清楚不掉
function timeCheck () {
    timer = setInterval(function  () {
        chromelen = $('#passport-login-pop').size();
        if(chromelen>0){
            clearInterval(timer);
            fillIn();
        }
    },100)
}
// cookie copy
var initCookie = function(name){
        var state = document.getElementById(name);
        var url_value = $.tb.getSearch(name);
        if (url_value) {
            if (parseInt(url_value) === 0) {
                clearCookie(name);
            } else {
                setCookie(name,url_value);
            }
            
        }
        state.innerHTML = $.cookie(name) === null ? '空' : $.cookie(name);
    }
function setCookie (name,value) {
    $.cookie(name, value,{'domain':'tieba.baidu.com','path':'/','expires': 1});
   // document.getElementById(name).innerHTML = $.cookie(name) === null ? '空' : $.cookie(name);
    //$(".introduce dd").removeClass().eq(value-1).addClass("currsel");
}
function clearCookie (name) {
    $.cookie(name, '', {'domain':'tieba.baidu.com','path':'/','expires': -1});
   // document.getElementById(name).innerHTML = $.cookie(name) === null ? '空' : $.cookie(name);
    //$(".introduce dd").removeClass("currsel");
}
//initCookie("pub_env");