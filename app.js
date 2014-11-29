
// expressオブジェクト作成
var express = require('express');
app = express();

// 環境設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: 610851339026827,
		clientSecret: '9f33feb4721e704ccd71eb396dfafb6b',
		callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	// アクセストークン、プロフィール情報を受け取る
	function(accessToken, refreshToken, profile, done) {
		// ユーザー登録
	}
));

// routing
app.get('/', function(req, res) {
	res.render('index');
});
app.get('/auth/facebook', passport.authenticate('facebook'));

// ユーザー認証が完了したらアクセストークン発行してログイン処理
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(3000);
