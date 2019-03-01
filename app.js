var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pagesRouter = require('./routes/pages');
var exercisesRouter = require('./routes/exercises');
var calendarRouter = require('./routes/calendar');
var workoutsRouter = require('./routes/workouts');
var pagesRouter = require('./routes/pages');

var app = express();



app.use(passport.initialize());
app.use(passport.session());


app.use(session({
  secret: 'ManoSecretas',
  resave: false,
  saveUninitialized: false
}));

mongoose.Promise = global.Promise;

//http:// -> mysql:// ->
mongoose.connect('mongodb://localhost/nextweek-db', { useNewUrlParser: true })
.then(() => console.log('Success connect to Database'))
.catch((error)=> console.log(error));



app.use(session({
  secret: 'SitasTekstasPadedaUzblokuotiVartotojuSlaptazodziusNesAsTaipNusprendziauIDB',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
var User = require('./models/User').User;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap-material-design/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));


app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', pagesRouter);
app.use('/exercises', exercisesRouter);
app.use('/calendar', calendarRouter);
app.use('/workouts', workoutsRouter);

app.use('/', pagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;