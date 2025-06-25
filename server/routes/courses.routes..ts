import express from 'express';
import { 
    getAllCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
 } from '../controllers/courses.controller';

const router = express.Router();

router.route('/')
    .get(getAllCourses)
    .post(createCourse)

router.route('/:id')
    .get(getCourse)
    .patch(updateCourse)
    .delete(deleteCourse);

export default router;