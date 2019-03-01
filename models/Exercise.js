const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String, // Bench Press
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, //from schema
    muscle: { type: Schema.Types.ObjectId, ref: 'Muscle' }, //from schema
    equipment: { type: Schema.Types.ObjectId, ref: 'Equipment' }, //from schema
    image: String, //url
    status: Boolean, //true - active, false - deleted
    description: String,
    // date_created: Date,
    // date_updated: Date,
    // date_deleted: Date,
    // user_created: String,
    // user_updated: String,
    // user_deleted: String,
});

const ExerciseCategorySchema = new Schema({
    name: String, // Cardio, Streching, Lifting Weights
    status: Boolean,
});

const ExerciseMuscleSchema = new Schema({
    name: String, // Chest, Legs, Back, Shoulders
    status: Boolean,
});

const ExerciseEquipmentSchema = new Schema({
    name: String, // Dumbells, Barbell, Bodyweight
    status: Boolean,
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);
const Category = mongoose.model('Category', ExerciseCategorySchema);
const Muscle = mongoose.model('Muscle', ExerciseMuscleSchema);
const Equipment = mongoose.model('Equipment', ExerciseEquipmentSchema);

module.exports = {
    Exercise,
    Category,
    Muscle,
    Equipment
};