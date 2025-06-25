import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import asyncWrapper from '../middleware/async';

const getAllCourses = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.find({}).exec();
  res.status(200).json({ courses });
});
  

const createCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
});


const getCourse = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const courseID: string = req.params.id.trim();
  const course = await Course.findById(courseID).exec();

  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }
  res.status(200).json({ course });
});
  

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