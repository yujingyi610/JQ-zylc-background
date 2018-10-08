//用户登录页面
$(function(){
	//清空用户登录信息
	window.localStorage.setItem('token', '');
	//当前页变量
	var sourceType = getQueryString('sourceType');
	var reallyToken = window.localStorage.getItem('token');
	
	//用户登录
	$('#loginButton').bind('click',function(){
		var account = $("#log_un").val();
		var passWord = $("#log_pd").val();
		$.ajax({
			type:'POST',
			url: ajaxUrl + '/ManagerLogin',
			data:{
				jobId : getTimeMs(),
				account : account,
				passWord : passWord,
			},
			dataType:'JSON',
			success: function(result) {
				if(result.code== '0'){// 接口请求成功，正确返回
					//保存用户登录信息
					var token = result.token;
					//加载用户首页
					location.href = homeIndex+ '?token=' + token;
				}else if(result.code == '99'){// 用户登录过期，token无效
					tokenFail();
				}else if(result.code== '9999'){// 服务内部错误，异常返回
					// 显示提示信息
					showMessage(3,result.msg);
				}else {// 接口请求失败，直接返回
					showMessage(2,result.msg);
				} 
			}
		});
	});
});