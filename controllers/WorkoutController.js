const Workout = require('../models/Workout');
let workoutController = {};


workoutController.showAll = (req, res) => {
    console.log("showAll");    

    Workout.find({status: true})
        
        .exec((err, workouts) => {
            if (err) throw err;

            // console.log(workouts[13].name);
            res.render('workout/workout', {
                workoutList: workouts,
               
            });

})
}

workoutController.onEdit = (req, res) => {
    console.log("onEdit");
    
    let workoutas = JSON.parse(req.body.data);
    
    
    
    Workout.findOneAndUpdate({
        _id: workoutas._id
    }, {
        name: workoutas.name,
        exercises: workoutas.exercises,
        
    }, (err, workout)=>{
        if (err) throw err;
       
    });

    
    
}

/* saving new workout*/
workoutController.onCreate = (req, res, next) => {
    console.log("onCreate");
    
    
    let workoutas = JSON.parse(req.body.data);
    let newWorkout = new Workout({
        ...workoutas  
    })
    
    
    newWorkout.save((err, workouts) => {
        if (err) throw err;
        
        
    })

   

}

/* delete */
workoutController.delete = (req, res) => {
    console.log("delete");
    
    
    Workout.findOneAndUpdate({
        _id: req.body._id,
    }, {
        status: false,
       
    }, (err, exercise)=>{
        if (err) throw err;
       
    });
    
}

module.exports = workoutController;
