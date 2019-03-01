/* Controller includes Exercise, Muscle, Equipment, Category */

const {
    Exercise,
    Muscle,
    Category,
    Equipment
} = require('../models/Exercise');
let exerciseController = {};
let muscleController = {};
let categoryController = {};
let equipmentController = {};

/* saving new exercise*/
exerciseController.onCreate = (req, res, next) => {
    console.log("onCreate");
    console.log(req.body);

    let newExercise = Exercise({
        name: req.body.name,
        muscle: req.body.muscle,
        category: req.body.category,
        equipment: req.body.equipment,
        description: req.body.description,
        status: true,
    })

    newExercise.save((err, exercise) => {
        if (err) throw err;
        console.log(exercise);
        next();
    })

}
/* on Edit */
exerciseController.onEdit = (req, res) => {
    console.log("onEdit");
    console.log(req.body);
    
    Exercise.findOneAndUpdate({
        _id: req.body._id
    }, {
        name: req.body.name,
        muscle: req.body.muscle,
        category: req.body.category,
        equipment: req.body.equipment,
        description: req.body.description,
        status: true,
    }, (err, exercise)=>{
        if (err) throw err;
        console.log(exercise);
    });

    res.redirect('/exercises');
}

exerciseController.findAll = (req, res) => {
    console.log("findAll");
    Exercise.find()
    .exec((err, exercises)=>{
        if (err) throw err;
        res.send(exercises);
    })
    
}

/* showing all exercises on exercises/exercises */
exerciseController.showAll = function (req, res) {
    console.log("showAll");    

    Exercise.find({status: true})
        .populate('muscle', 'name')
        .populate('category', 'name')
        .populate('equipment', 'name')
        .exec((err, exercises) => {
            if (err) throw err;


            res.render('exercise/exercise', {
                exerciseList: exercises,
               
            });

        })
}

exerciseController.delete = (req, res) => {
    console.log("delete");

    Exercise.findOneAndUpdate({
        _id: req.body._id
    }, {
        status: false,
       
    }, (err, exercise)=>{
        if (err) throw err;
        console.log(exercise);
    });
}

/* saving new muscle*/
muscleController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newMuscle = Muscle({
        name: req.body.name,
        status: true,
    })

    newMuscle.save((err, muscle) => {
        if (err) throw err;
        console.log(muscle);
        next();
    })

}

/* on Edit */
muscleController.onEdit = (req, res) => {
    console.log("onEdit");
    console.log(req.body);
    
    Muscle.findOneAndUpdate({
        _id: req.body._id
    }, {
        name: req.body.name,
       
    }, (err, muscle)=>{
        if (err) throw err;
        console.log(muscle);
    });

    res.redirect('/exercises/muscles');
}

/* showing all muscles on exercises/muscles */
muscleController.showAll = (req, res) => {
    console.log("showAll");
    Muscle.find({status: true}, (err, muscles) => {
        if (err) throw err;
        res.render('exercise/muscle', {
            muscleList: muscles
        });
    })
}

muscleController.findAll = (req, res) => {
    console.log("findAll");
    Muscle.find()
    .exec((err, muscles)=>{
        if (err) throw err;
        res.send(muscles);
    })
    
}

muscleController.delete = (req, res) => {
    console.log("delete");

    Muscle.findOneAndUpdate({
        _id: req.body._id
    }, {
        status: false,
       
    }, (err, muscle)=>{
        if (err) throw err;
        console.log(muscle);
    });
}
    


/* saving new equipment*/
equipmentController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newEquipment = Equipment({
        name: req.body.name,
        status: true,
    })

    newEquipment.save((err, equipment) => {
        if (err) throw err;
        console.log(equipment);
        next();
    })

}

/* on Edit */
equipmentController.onEdit = (req, res) => {
    console.log("onEdit");
    console.log(req.body);
    
    Equipment.findOneAndUpdate({
        _id: req.body._id
    }, {
        name: req.body.name,
       
    }, (err, equipment)=>{
        if (err) throw err;
        console.log(equipment);
    });

    res.redirect('/exercises/equipments');
}

equipmentController.findAll = (req, res) => {
    console.log("findAll");
    Equipment.find()
    .exec((err, equipments)=>{
        if (err) throw err;
        res.send(equipments);
    })
    
}

/* showing all equipments on exercises/equipments */
equipmentController.showAll = (req, res) => {
    console.log("showAll");
    Equipment.find({status: true}, (err, equipments) => {
        if (err) throw err;
        console.log("equipments: " + equipments);
        res.render('exercise/equipment', {
            equipmentList: equipments
        });
    })
}

equipmentController.delete = (req, res) => {
    console.log("delete");

    Equipment.findOneAndUpdate({
        _id: req.body._id
    }, {
        status: false,
       
    }, (err, equipments)=>{
        if (err) throw err;
        console.log(equipments);
    });
}


/* saving new category*/
categoryController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newCategory = Category({
        name: req.body.name,
        status: true,
    })

    newCategory.save((err, category) => {
        if (err) throw err;
        console.log(category);
        next();
    })

}

/* on Edit */
categoryController.onEdit = (req, res) => {
    console.log("onEdit");
    console.log(req.body);
    
    Category.findOneAndUpdate({
        _id: req.body._id
    }, {
        name: req.body.name,
       
    }, (err, category)=>{
        if (err) throw err;
        console.log(category);
    });

    res.redirect('/exercises/categories');
}

categoryController.findAll = (req, res) => {
    console.log("findAll");
    Category.find()
    .exec((err, categories)=>{
        if (err) throw err;
        res.send(categories);
    })
    
}

/* showing all categories on exercises/categories */
categoryController.showAll = (req, res) => {
    console.log("showAll");
    Category.find({status: true}, (err, categories) => {
        if (err) throw err;
        res.render('exercise/category', {
            categoryList: categories
        });
    })
}

categoryController.delete = (req, res) => {
    console.log("delete");

    Category.findOneAndUpdate({
        _id: req.body._id
    }, {
        status: false,
       
    }, (err, category)=>{
        if (err) throw err;
        console.log(category);
    });
}



module.exports = {
    exerciseController,
    muscleController,
    categoryController,
    equipmentController
};