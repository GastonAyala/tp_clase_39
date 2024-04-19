const { body } = require('express-validator');

const fieldFirstName = body('first_name')
.notEmpty()
.withMessage('El campo First Name es obligatorio')
.bail()
.isLength({min: 5, max: 100})
.withMessage('Debe tener un minimo de 5 y maxímo 100 caracteres');

const fieldLastName = body('last_name')
.notEmpty()
.withMessage('El campo Last Name es obligatorio')
.bail()
.isLength({min: 5, max: 100})
.withMessage('Debe tener un minimo de 5 y maxímo 100 caracteres');

const fieldRating = body('rating')
.notEmpty()
.withMessage('El campo Rating es requerido')
.bail()
.isDecimal()
.withMessage('El valor debe ser decimal');

const fieldAwards = body('awards')
.notEmpty()
.withMessage('El campo Awards es requerido')
.bail()
.isNumeric()
.withMessage('El valor debe ser numérico');



module.exports = {
    actorsValidation: [fieldFirstName, fieldLastName, fieldRating, fieldAwards]
};