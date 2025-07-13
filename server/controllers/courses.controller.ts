import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import asyncWrapper from '../middleware/async';

// Get all courses
const getAllCourses = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.find({}).exec();
  res.status(200).json({ courses });
});
  
// Create a new course
const createCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
});

// Get course by ID
const getCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const courseID: string = req.params.id.trim();
  const course = await Course.findById(courseID).exec();

  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }
  res.status(200).json({ course });
});
  
// Update a course
const updateCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const courseID: string = req.params.id.trim();
  const course = await Course.findByIdAndUpdate(
      courseID,
      req.body,
      {
          new: true,
          runValidators: true,
      }
  ).exec();

  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }

  res.status(200).json({ course });
});
  
// Delete a course
const deleteCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const courseID: string = req.params.id.trim();
  const course = await Course.findByIdAndDelete(courseID).exec()

  if(!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }
  res.status(200).json({ course });
});
  
export {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse
};