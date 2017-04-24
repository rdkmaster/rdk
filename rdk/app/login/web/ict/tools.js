var Tools = function() {
	var ict_framework_aes_a1 = "9763853428462486";
	var ict_framework_aes_a2 = "9763853428462486";
	var language = ""

	function getLanguage() {
		if(!language) {
			$.ajax({
		        type: "GET",
		        contentType: "application/json",
		        url: "/web/rest/web-common/common?action=acceptlanguage&_operationType=rpc&_operationName=comm.getAcceptLanguage",
		        async: false,
		        success: function(data) {
		        	language = data;
		        },
		        error: function(XMLHttpRequest, textStatus, errorThrown) {
		            language = "zh-CN"; // 默认值
		        }
		    });
		}

		return language;
	};

	return {
		// ICT加密算法1
		ict_framework_func1: function (word){  
         	var a1 = CryptoJS.enc.Utf8.parse(ict_framework_aes_a1);   
         	var a2  = CryptoJS.enc.Utf8.parse(ict_framework_aes_a2);   
		 	var srcs = CryptoJS.enc.Utf8.parse(word);  
         	var encrypted = CryptoJS.AES.encrypt(srcs, a1, { iv: a2,mode:CryptoJS.mode.CBC});  
         	return encrypted.toString();  
		},

		// ICT加密算法2
		ict_framework_func2: function (word){  
        	var a1 = CryptoJS.enc.Utf8.parse(ict_framework_aes_a1);   
        	var a2  = CryptoJS.enc.Utf8.parse(ict_framework_aes_a2);   
        	var decrypt = CryptoJS.AES.decrypt(word, a1, { iv: a2,mode:CryptoJS.mode.CBC});  
        	return CryptoJS.enc.Utf8.stringify(decrypt).toString();  
		},

		getLanguage: getLanguage
	}
}();
