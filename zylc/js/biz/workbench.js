$(function(){
	//用户登录
	$('#loginButton').bind('click',function(){
		var account = $("#log_un").val();
		$.ajax({
			type:'POST',
			url: ajaxUrl + '/ManagerLogin',
			data:{
				jobId : getTimeMs(),
				account : account,
			},
			dataType:'JSON',
			success: function(result) {
				if(result.code== '0'){// 接口请求成功，正确返回
					
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