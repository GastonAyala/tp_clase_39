const express = require('express');
const router = express.Router();

const ActorsController = require('../controllers/actorsController');
const actorsController = require('../controllers/actorsController');
const { actorsValidation } = require('../middleware/validations');

router.get('/actors', ActorsController.list);
router.get('/actors/detail/:id', ActorsController.detail)

router.get('/actors/add', actorsController.add);
router.post('/actors/create', actorsValidation, actorsController.create);

router.get('/actors/edit/:id', actorsController.edit);
router.put('/actors/update/:id', actorsValidation, actorsController.update);

router.get('/actors/delete/:id', actorsController.delete);
router.delete('/actors/delete/:id', actorsController.destroy);

module.exports = router;