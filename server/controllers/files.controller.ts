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
    const file = req.file;

    if(!file) {
        res.status(400).json({ message: 'No file uploaded'});
        return;
    }

    const course = await Course.findById(courseId);
    if(!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    // Check if file with existing name already exists
    const existingResource = course.resources.find(resource => resource.name === file.originalname);
    if(existingResource) {
        res.status(409).json({ message: 'A file with this name already exists'});
        return;
    }

    // Create new resource metedata
    const newResource = {
        name: file.originalname,
        contentType: file.mimetype,
        uploadDate: new Date()
    };

    // Add to coures resources array
    course.resources.push(newResource);
    await course.save();

    res.status(201).json({
        message: 'Resource uploaded successfully',
        resource: newResource
    });
    
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
    res.status(200).json({ resource: file });
    
})

// Update the name of a file
const updateResourceName = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { courseId, oldName } = req.params;
    const { newName } = req.body;

    if (!newName) {
        res.status(400).json({ message: 'New name is required' });
        return;
    }

    const course = await Course.findById(courseId);
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    const resource = course.resources.find(resource => resource.name === oldName);
    if (!resource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
    }

    resource.name = newName;
    await course.save();

    res.status(200).json({ message: 'Resource name updated successfully', resource });
});

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
        return;
    }

    course.resources.splice(fileIndex, 1);
    await course.save();
    res.status(200).json({ message: 'Resource deleted successfully' });
})

export {
    getAllResources,
    uploadResource,
    getResource,
    updateResourceName,
    deleteResource
};