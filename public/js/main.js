$(document).ready(function () {
 

	$("#speedBtnMinus,#speedBtnPlus").click(function(){

		var speed = 0;
		if(this.value == 'Minus')
			speed = -1;
		else
			speed = 1;

		var sendInfo = {
			id: 0,
			speed: speed,
			ammoSpeed: 0
		};

		PostData(sendInfo);
	});

	function PostData(data)
	{
		$.ajax({
		  type: "POST",
		  url: '/setInfo',
		  dataType: "json",
		  data: data,
		  success: function (msg) {
               console.log(msg);
               $("#Output").text(JSON.stringify(msg));
           }
		});
	}

 });

