import express from 'express';
import {
    getAllResources,
    uploadResource,
    getResource,
    updateResourceName,
    deleteResource
} from '../controllers/files.controller';

import upload from '../middleware/upload';

const router = express.Router();

// Get all resources from a course
router.get('/:id/resources', getAllResources); 

// Upload a resource to a course
router.post('/:courseId/resources', upload.single('file'), uploadResource);

// Get a specific resource by name
router.get('/:courseId/resources/:resourceName', getResource);

// Update a resource's name
router.patch('/:courseId/resources/:oldName', updateResourceName);

// Delete a resource by name
router.delete('/:courseId/resources/:resourceName', deleteResource);

export default router;