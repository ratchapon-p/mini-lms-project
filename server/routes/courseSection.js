const express = require('express')
const courseSectionCtrl = require('../controllers/courseSectionCtrl')
const isAuthenticated = require('../middlewares/isAuth')
const courseSectionRouter  = express.Router()

courseSectionRouter.post('/api/v1/course-section/create/:courseId', isAuthenticated,courseSectionCtrl.create)


module.exports = courseSectionRouter 