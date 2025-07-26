import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import asyncWrapper from '../middleware/async';
import fs from 'fs';
import path from 'path';

// Get all course files
const getResources = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const courseID: string = req.params.id.trim();
    const course = await Course.findById(courseID);
    if(!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    res.status(200).json({ resources: course.resources })

})



// Get a file from a course
const getResource = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const {courseId, resourceName} = req.params;
    const course = await Course.findById(courseId);
    if(!course) {
        res.status(404).json({ message: 'Course not found' });
        return
    }

    const file = course.resources.find(resource => resource.name === resourceName);
    if(!file) {
        res.status(404).json({ message: 'File not found '});
    }
    
})

// Delete a file from a course
const deleteResource = asyncWrapper(async (req: Request, res: Response) : Promise<void> => {
    const {courseId, filename} = req.params;

    const course = await Course.findById(courseId);
    if(!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    const fileIndex = course.resources.findIndex(resource => resource.name === filename);
    if(fileIndex === -1) {
        res.status(404).json({ message: 'File not found'});
        return
    }

    const file = course.resources[fileIndex];
})