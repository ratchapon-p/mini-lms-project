const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Course = require("../models/Course");

const courseCtrl = {
  //* Create course
  create: asyncHandler(async (req, res) => {
    const {title, description, difficulty, duration} = req.body
    //! Find the user
    const userFound = await User.findById(req.user)
    if(!userFound){
        res.status(404)
        throw new Error('user not found')
    }
    // if(userFound !== 'instructor'){
    //     res.status(401)
    //     throw new Error('You are not allowed to create course instructor only.')
    // }
    //!Validate the user input
    if(!title || !description || !difficulty || !duration){
        throw new Error("Please provide all fields");
    }
    //!Check if course is already exists
    const courseFound = await Course.findOne({title})
    if(courseFound){
        throw new Error("Course already exists")
    }
    //!Create the course
    const courseCreated = await Course.create({
        title,
        description,
        difficulty,
        duration,
        user: req.user
    })

    //!Push the course
    userFound.coursesCreated.push(courseCreated._id);

    //! Resave user
    await userFound.save()
    //!Send the response
    res.json(courseCreated)
  }),

  //* Get all courses
  lists: asyncHandler(async(req, res) =>{
    const courses = await Course.find().populate('sections').populate({
      path: 'user',
      model: 'User',
      select: 'username email'
    });
    res.json(courses)
  }),

  //* Get single courses
  getCourseById: asyncHandler(async(req, res) =>{
    const course = await Course.findById(req.params.courseId).populate('sections').populate({
      path: 'user',
      model: 'User',
      select: 'username email'
    });
    res.json(course)
  }),

};

module.exports = courseCtrl;
