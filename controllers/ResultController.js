var BodyWeight = require('../models/User').BodyWeight;
var Measurments = require('../models/User').Measurments;


resultController = {};

//Result tracker body weight form
resultController.addWeight = (req, res) => {
    
    let newWeight = new BodyWeight({
        user_id: req.user.id,
        weightDay: req.body.weightDay,
        bodyWeight: req.body.bodyWeight,
    })
 
    newWeight.save((err, weight) => {    
            if(err) throw err;
        res.redirect('/resultTracker' )
    })
}

//Result tracker measurmens form
resultController.addMeasurments = (req, res) => {

    let measurments = new Measurments({
        user_id: req.user.id,
        bodyPlace: req.body.bodyPlace,
        measurmentsDay: req.body.measurmentsDay,
        centimetrs: req.body.centimetrs,
    })

    measurments.save((err, centimetrs) => {
        if(err) throw err;
        res.redirect('/resultTracker')
    })
}


//Rezult tracker page
resultController.resultTracker = (req, res) => {
    BodyWeight.find({user_id: req.user.id}, (err, weight ) => {
        if (err) throw err;
        Measurments.find({user_id: req.user.id}, (err, centimetrs) => {
            if (err) throw err;
            res.render('profile/resultTracker', {userMeasurments: centimetrs, userResult: weight, user: req.user});        
        })
    })
   
}

    
module.exports = resultController;