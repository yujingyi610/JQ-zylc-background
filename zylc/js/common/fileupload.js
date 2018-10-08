var currentToken="";
//图片上传
function fileupload(pic,id){
	var formData = new FormData(); 
	formData.append('upfile', $('#'+id)[0].files[0]);  //添加图片信息的参数
	formData.append('jobId', getTimeMs());  //请求ID
	formData.append('token', currentToken);  //用户登录标识
	
	$.ajax({
		type:'POST',
		url: serverUrl + '/file/upload/api',
		cache: false, //上传文件不需要缓存
	    data: formData,
		dataType:'JSON',
	    processData: false, // 告诉jQuery不要去处理发送的数据
	    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		success: function(result) {
			if(result.code== '0'){// 接口请求成功，正确返回
				$("#"+pic).attr("src",result.data);
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
}