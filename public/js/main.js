$(document).ready(function () {


	var PlayerId = 0;
	var PlayerTeam = 0;

	var AmmoCount = 5;
	$("#AmmoCount").text(AmmoCount);

	$("#username").val("Chris Z");


	Joingame();

	function Joingame()
	{
		console.log($("#username").val());
		var sendInfo = {
			Name: $("#username").val()
		};

		$.ajax({
		  type: "POST",
		  url: '/join',
		  dataType: "json",
		  data: sendInfo,
		  success: function (msg) {
               PlayerId = msg.Id;
               PlayerTeam = msg.Team;
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
			Id: PlayerId,
			Team: PlayerTeam,
			Name: $("#username").val(),
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

