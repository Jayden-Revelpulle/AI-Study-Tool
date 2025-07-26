import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import asyncWrapper from '../middleware/async';
import fs from 'fs';
import path from 'path';

// Get all course files
const getAllResources = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const courseID: string = req.params.id.trim();
    const course = await Course.findById(courseID);
    if(!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    res.status(200).json({ resources: course.resources })

})

// Upload (create) a resource
const uploadResource = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params; // grab course id from params

    interface GridFSFile extends Express.Multer.File {
        id: any;
    }
    const file = req.file as GridFSFile; // grab file from params

    if(!file) {// check file
        res.status(400).json({ message: 'No file uploaded'})
        return;
    }

    const course = await Course.findById(courseId); // get course from database
    if(!course) { // check course
        res.status(404).json({ message: 'Course not found'})
        return;
    }

    // Add file refernce to course.resources
    course.resources.push({
        name: file.originalname,
        fileId: file.id, // GridFs file id
        contentType: file.mimetype,
        uploadDate: new Date(),
    });

    await course.save()
    res.status(201).json({ message: 'File uploaded successfully', file });
});

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

export {
    getAllResources,
    uploadResource,
    getResource,
    deleteResource
};