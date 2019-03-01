var User = require('../models/User').User;
var passport = require('passport');
authController = {};


authController.home = function(req, res){
    console.log(req.user)
   res.render('index', {user: req.user, title: 'nextweek'});
}
//jeigu neras tokio gmail => ismes error message
authController.login = function(req, res){
   res.render('auth/login', {error: null});
}
///////////////////////////////////////////////////////////////slaptiko keitimas

 authController.forgotPassword = function(req, res){
    res.render('auth/forgot');
 }
 authController.doForgot = (req, res)=>{
     //veliau nurodysiu puslapi
    res.redirect('/');
}

//////////////////////////////////////////////////////////////slaptiko keitimas
authController.register = (req, res) =>{
    res.render('auth/register', {error: null});
}

authController.doRegister = (req, res)=>{
    User.register(new User(
        {
            username: req.body.username, //vatotojo el. pastas
            nickname: req.body.name //vartotojo vardas
        }), req.body.password, (error, user)=>{
            if(error){
                return res.render('auth/register', {error: error})
            } 
            //uzsiregini ir permeta i sita puslapi
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/login')
            })
        }
    )
}
//kai prisilogini permeta i puslapi =>
authController.doLogin = (req, res)=>{
    passport.authenticate('local')(req, res, ()=>{
        res.redirect('/profile'); 
      });
    }
//atsijungus permes i pagr puslapi
authController.doLogout = (req, res)=>{
    req.logout();
    res.redirect('/');
}


module.exports = authController;