$(document).ready(function () {


	var PlayerId = 0;
	Joingame();

	function Joingame()
	{
		$.ajax({
		  type: "GET",
		  url: '/join',
		  dataType: "json",
		  success: function (msg) {
		  	PlayerId = msg;
            $("#Output").text(JSON.stringify(msg));
           }
		});
	}



	setTimeout(getData, 250);

	function getData()
	{
		$.ajax({
		  type: "GET",
		  url: '/getInfo',
		  dataType: "json",
		  success: function (msg) {
               $("#Output").text(JSON.stringify(msg));
           }
		});

		setTimeout(getData, 250);
	}
 

	$("#FireBtn").click(function(){

		var sendInfo = {
			PlayerId: PlayerId,
			Fired: 1
		};

		PostData(sendInfo,'/fireEvent');
	});

	function PostData(data, url)
	{
		$.ajax({
		  type: "POST",
		  url: url,
		  dataType: "json",
		  data: data,
		  success: function (msg) {
               console.log(msg);
           }
		});
	}

 });

