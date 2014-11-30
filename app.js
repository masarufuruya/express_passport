// require
var express = require('express');

app = express();

// 初期設定
require('./config/bootstrap');
require('./config/passport');
require('./config/facebook');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routing
app.get('/', function(req, res) {
	res.render('index');
});
app.get('/auth/facebook', passport.authenticate('facebook'));

// ユーザー認証が完了したらアクセストークン発行してログイン処理
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/auth/facebook/callback_check',
                                      failureRedirect: '/login' }));

// セッションにユーザーが保存されていればログインへ
app.get('/auth/facebook/callback_check', function(req, res) {
	// ユーザー情報がpassportのセッションに保存されていればログイン
	if (req.session.passport.user) {
		res.render('top');
	} else {
		res.render('index');
	}
});

app.get('/top', function(req, res) {
	if (req.session.passport.user) {
		res.render('top');
	} else {
		res.render('index');
	}
});

app.listen(3000);
