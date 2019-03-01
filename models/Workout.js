const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String, // Bench Press
  status: Boolean,
  exercises: [
    
      {_id: { type: Schema.Types.ObjectId, ref: "Exercise" },
     
      
      sets: [
        {
          _id: false,
          reps: Number,
          weight: Number
        }
      ]
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
