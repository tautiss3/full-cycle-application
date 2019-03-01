var fs = require('fs');
var Profile = require('../models/User').User;

profileController = {};


//Profile main page
profileController.profile = (req, res) => {
    res.render('profile/profile', {user: req.user});
};

//Profile post data
profileController.createProfile = (req, res, next) => {
    
    //Sukuriam objeta kuri saugosim i mongo DB
    let newProfile = Profile({
      //modelName: req.body.htmlInputName  
        nickname: req.body.nickname,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        photo: '/images/' + req.file.filename,
        agree: req.body.check,
        goal: req.body.goal,
        problemArea: req.body.problemArea,
        alcohol: req.body.alcohol,
        smoke: req.body.smoke,
        traumas: req.body.traumas,
    })
    //Cia saugo i mongo DB
    newProfile.save((err, profile) => {
        if (err) throw err;
        console.log(profile);
        res.redirect('/profileEnd/');
    })

}

//Profile cheked page
profileController.profileEnd = (req, res) => {
    Profile.findById(req.user.id, (err, profile) => {
        if (err) throw err;
        res.render('profile/profileEnd', {userProfile: profile, user: req.user} );
    })
}

//Profile edit page
profileController.profileEdit = (req, res) => {
    Profile.findById(req.user.id, (err, userFromDB) =>{
        if (err) throw err;
        res.render('profile/profileEdit', {editProfile: userFromDB, user: req.user});
    })
}

//Profile edit post data
profileController.onEdit = (req, res) => {
    Profile.findById(req.user.id, (err, userFromDB) => {
        userFromDB.nickname = req.body.nickname,
        userFromDB.year = req.body.year,
        userFromDB.month = req.body.month,
        userFromDB.day = req.body.day,
        userFromDB.gender = req.body.gender,
        userFromDB.height = req.body.height,
        userFromDB.weight = req.body.weight,
        userFromDB.agree = req.body.check,
        userFromDB.goal = req.body.goal,
        userFromDB.problemArea = req.body.problemArea,
        userFromDB.alcohol = req.body.alcohol,
        userFromDB.smoke = req.body.smoke,
        userFromDB.traumas = req.body.traumas;
        if(req.file){
            userFromDB.photo = '/images/' + req.file.filename;
        }
        userFromDB.save( (err, editProfile) => {
            if (err) throw err;
            res.render('profile/profileEnd' , {userProfile: editProfile, user: req.user})
        })
    })

}

//Change password page
profileController.changePassword = (req, res) => {
    res.render('profile/newPassword');
};




module.exports = profileController;