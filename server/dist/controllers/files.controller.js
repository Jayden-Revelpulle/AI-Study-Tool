"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../models/Course"));
const async_1 = __importDefault(require("../middleware/async"));
// Get all course files
const getCourseFiles = (0, async_1.default)(async (req, res) => {
    const courseID = req.params.id.trim();
    const course = await Course_1.default.findById(courseID);
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    res.status(200).json({ resources: course.resources });
});
// Get a file from a course
const getCourseFile = (0, async_1.default)(async (req, res) => {
    const { courseId, filename } = req.params;
    const course = await Course_1.default.findById(courseId);
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    const file = course.resources.find(resource => resource.filename === filename);
    if (!file) {
        res.status(404).json({ message: 'File not found ' });
    }
});
// Delete a file from a course
const deleteFile = (0, async_1.default)(async (req, res) => {
    const { courseId, filename } = req.params;
    const course = await Course_1.default.findById(courseId);
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    const fileIndex = course.resources.findIndex(resource => resource.filename === filename);
    if (fileIndex === -1) {
        res.status(404).json({ message: 'File not found' });
        return;
    }
    const file = course.resources[fileIndex];
});
