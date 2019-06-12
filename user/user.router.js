const express = require('express') 
const { me, updateMe } = require('./user.controllers')

const router = express.Router()

router.get('/', me)
router.put('/', updateMe)

module.exports = router 
