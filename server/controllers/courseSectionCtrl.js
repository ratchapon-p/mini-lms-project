const  mongoose  = require('mongoose')
const CourseSection = require('../models/CourseSection')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const Course = require('../models/Course')

const courseSectionCtrl = {
    create: asyncHandler(async(req, res) =>{
        //!Find user
        const userFound = await User.findById(req.user)

        if (!userFound) {
            res.status(404);
            throw new Error("User not found")
        }

        //!Get section name
        const {sectionName} = req.body;
        const {courseId} = req.params

        if(!mongoose.isValidObjectId(courseId)){
            throw new Error("Invalid course ID")
        }
        

        const course = await Course.findById(courseId)
        if(!course){
            throw new Error("Course not found")
        }

        if(!sectionName){
            throw new Error("Please provide section name")
        }

        const sectionCreated = await CourseSection.create({
            sectionName,
            user: req.user

        })
        course.sections.push(sectionCreated._id)

        await course.save()

        res.json({
            message: "Section Created",
            data: sectionCreated,
            status: "success"
        })


    })
}


module.exports = courseSectionCtrl