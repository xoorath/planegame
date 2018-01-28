var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    app = express();

app.engine('dust', cons.dust);


app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function (req, res) {
  res.render('index');
});

var Users = [];
var CurrentID = 0;

function JoinRoom()
{
	Users.push({PlayerId: CurrentID, Fired: 0});
	CurrentID++;
}

app.get('/join', function (req, res) {
  JoinRoom();
  res.json({PlayerId: CurrentID-1});
});


app.get('/getInfo', function (req, res) {
  res.send(Users);

	for(var i = 0; i < Users.length; i++)
	{
		Users[i].Fired = 0;
	}
});


app.post('/fireEvent',function(req,res){
	Users[parseInt(req.body.PlayerId)].Fired = parseInt(req.body.Fired)

	res.end('true');

});

app.listen(3000, function () {
  console.log('Server Started On Port 3000');
});
