$(document).ready(function () {


	var PlayerId = 0;

	var AmmoCount = 5;
	$("#AmmoCount").text(AmmoCount);


	Joingame();

	function Joingame()
	{
		$.ajax({
		  type: "GET",
		  url: '/join',
		  dataType: "json",
		  success: function (msg) {
		  	PlayerId = msg.PlayerId;
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

		if(AmmoCount > 0)
		{
			PostData(sendInfo,'/fireEvent');
			AmmoCount--;
			$("#AmmoCount").text(AmmoCount);
		}


	});

	$("#ReloadBtn").click(function(){
		AmmoCount = 5;
		$("#AmmoCount").text(AmmoCount);
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

