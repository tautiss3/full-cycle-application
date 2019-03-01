var express = require('express');
var router = express.Router();
var users = require('../controllers/UserController');

var authGuard = require('../guards/auth-guard');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var ProfileController = require('../controllers/ProfileController');
var ResultController = require('../controllers/ResultController');

var multer = require('multer');
var sharp = require('sharp');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
      let filename = file.filename + '-' + Date.now() + '.jpg';
      console.log(file)
      sharp().resize(200, 200).toFile('images/new.jpg');
      
      sharp('public/images/' + filename)
      .resize(200)
      .toBuffer()
      .then( data => console.log(data))

      cb(null, filename)
      
    }
});
var upload = multer({storage: storage});


router.get('/createProfile', ProfileController.profile );
router.post('/createProfile', upload.single('photo'), ProfileController.createProfile );

router.get('/profileEdit', ProfileController.profileEdit)
router.post('/profileEdit', upload.single('photo'), ProfileController.onEdit )

router.get('/profileEnd', ProfileController.profileEnd)
router.get('/newPassword', ProfileController.changePassword)

router.get('/resultTracker', authGuard.canActivate, urlencodedParser, ResultController.resultTracker )
router.post('/addWeight', authGuard.canActivate, urlencodedParser, ResultController.addWeight)
router.post('/centimetrsResult', authGuard.canActivate, urlencodedParser, ResultController.addMeasurments )

router.get('/profile/:name?', authGuard.canActivate, users.myProfile );
router.get('/users', authGuard.canActivate , users.allUsers );

router.get('/profile', users.myProfile );
router.get('/users', users.allUsers);


module.exports = router;