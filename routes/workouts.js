const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/WorkoutController');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET workouts listing. */
router.get('/', workoutController.showAll);
router.post('/', workoutController.onCreate);
router.post('/edit', workoutController.onEdit);
router.post('/delete', workoutController.delete);


module.exports = router;