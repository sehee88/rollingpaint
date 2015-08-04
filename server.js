var express = require('express'),
    app = express();

var scores = require('./routes/scores');
var users = require('./routes/users');
var chats = require('./routes/chats');
var rooms = require('./routes/rooms');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rollingpaint')

var UserSchema = mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', UserSchema);
var ddang = new User({
  username: 'ddang',
  password: '1234'
});

console.log(ddang.username);

ddang.save(function(err, ddang){
  if(err) return console.console.error(err);
  console.log(ddang.password);
});

app.use(express.static('www'));
app.use('/scores', scores);
app.use('/users', users);
app.use('/chats', chats);
app.use('/rooms', rooms);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API Routes
// app.get('/blah', routeHandler);

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
