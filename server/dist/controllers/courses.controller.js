"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourse = exports.createCourse = exports.getAllCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const async_1 = __importDefault(require("../middleware/async"));
const getAllCourses = (0, async_1.default)(async (req, res) => {
    const courses = await Course_1.default.find({}).exec();
    res.status(200).json({ courses });
});
exports.getAllCourses = getAllCourses;
const createCourse = (0, async_1.default)(async (req, res, next) => {
    const course = await Course_1.default.create(req.body);
    res.status(201).json({ course });
});
exports.createCourse = createCourse;
const getCourse = (0, async_1.default)(async (req, res, next) => {
    const courseID = req.params.id.trim();
    const course = await Course_1.default.findById(courseID).exec();
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    res.status(200).json({ course });
});
exports.getCourse = getCourse;
const updateCourse = (0, async_1.default)(async (req, res, next) => {
    const courseID = req.params.id.trim();
    const course = await Course_1.default.findByIdAndUpdate(courseID, req.body, {
        new: true,
        runValidators: true,
    }).exec();
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    res.status(200).json({ course });
});
exports.updateCourse = updateCourse;
const deleteCourse = (0, async_1.default)(async (req, res, next) => {
    const courseID = req.params.id.trim();
    const course = await Course_1.default.findByIdAndDelete(courseID).exec();
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    res.status(200).json({ course });
});
exports.deleteCourse = deleteCourse;
