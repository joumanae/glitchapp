const {crudControllers } = require('../utils/crud')
const  Shift = require('./shift.model') 

module.exports = crudControllers(Shift)