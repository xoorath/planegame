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
var RoomNumber = 1;

StartSession();


function StartSession()
{
	Users = [];
	Users.push({speed: 5, ammoSpeed: 5});
	Users.push({speed: 5, ammoSpeed: 5});
}

app.get('/reset', function (req, res) {
  StartSession();
  res.send('true');
});


app.get('/getInfo', function (req, res) {
  res.send(Users);
});


app.post('/setInfo',function(req,res){

	Users[req.body.id].speed += parseInt(req.body.speed);
	if(Users[req.body.id].speed <= 0) Users[req.body.id].speed = 0;

	Users[req.body.id].ammoSpeed += parseInt(req.body.ammoSpeed);
	if(Users[req.body.id].ammoSpeed <= 0) Users[req.body.id].ammoSpeed = 0;

	res.json(Users);

});

app.listen(3000, function () {
  console.log('Server Started On Port 3000');
});
