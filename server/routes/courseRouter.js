const express = require('express')
const courseCtrl = require('../controllers/course')
const isAuthenticated = require('../middlewares/isAuth')
const courseRouter = express.Router()

courseRouter.post('/api/v1/course/create', isAuthenticated,courseCtrl.create)
courseRouter.get('/api/v1/course/lists',courseCtrl.lists)
courseRouter.get('/api/v1/course/:courseId',courseCtrl.getCourseById)


module.exports = courseRouter