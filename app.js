// 初期設定
var express = require('express');
app = express();

var session = require('express-session');
var cookieParser = require('cookie-parser')

require('./config/passport');
require('./config/facebook');

// ビュー設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
	secret: 'secretkey',
	resave: false,
  	saveUninitialized: true
}));

// routing
app.get('/', function(req, res) {
	res.render('index');
});
app.get('/auth/facebook', passport.authenticate('facebook'));

// ユーザー認証が完了したらアクセストークン発行してログイン処理
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/top/',
                                      failureRedirect: '/login' }));

app.listen(3000);
