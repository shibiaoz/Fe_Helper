
var timerzzz = null;
var chromelen = 0;
_login();
timeCheck();
// setTimeout(function() {
// 	fillIn();
// }, 4000);
// fillIn();
function _logout () {
	var version_bd = 0;
    var user_name_leave;
    try {
        PageData.user ? (user_name_leave = PageData.user.name) : (user_name_leave = PageData.user_info.name);
    } catch (e) {
        user_name_leave = "";
    }
    try {
        version_bd = "baidubrowser.tieba" == window.external.GetVersion('version') ? true : null;
    } catch (e) {
        version_bd = null;
    }
    if (!$.cookie('baidu_broswer_setup_' + user_name_leave) && !version_bd || $.cookie('baidu_broswer_setup_' + user_name_leave) === "NaN") {
        $.cookie('baidu_broswer_setup_' + user_name_leave, 0);
    }
    TbCom.process('User', 'logout');
	_login();
}
function _login () {
	_.Module.use('pcommon/component/LoginDialog', ['', '']);
}
function fillIn () {
	//debugger;
	var name = 'maling';
	var pwd = 'aaaa';
    // form body attrbute id is changing,but rules i do not know,so ....
	var $dialog = $('#passport-login-pop').find('.tang-foreground');//login dialog form
	$dialog.find('input[name="userName"]').val(name);
	$dialog.find('input[name="password"]').val(pwd);
    // sometimes trigger click ,it will show checking code
    setTimeout(function() {
       $dialog.find('input[type="submit"]').trigger('click');
    }, 1000);
	//$dialog.find('input[type="submit"]').trigger('click');
	
}
// 这里为啥没有clear掉，待会好好研究下,擦，逗比了，函数里面用到变量我在这赋值，然后在函数里第二次覆盖
//timer的时候，实际上在挖补已经把timer赋值为null，所以clearInterval清楚不掉
function timeCheck () {
    // setTimeout(function() {
    //     fillIn();
    // }, 2000);
    timerzzz = setInterval(function  () {
        console.log('--------------');
        chromelen = $('#passport-login-pop').size();
        if(chromelen>0){
            clearInterval(timerzzz);
            fillIn();
        }
    },1000)
}