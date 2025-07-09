"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_controller_1 = require("../controllers/courses.controller");
const router = express_1.default.Router();
router.route('/')
    .get(courses_controller_1.getAllCourses)
    .post(courses_controller_1.createCourse);
router.route('/:id')
    .get(courses_controller_1.getCourse)
    .patch(courses_controller_1.updateCourse)
    .delete(courses_controller_1.deleteCourse);
exports.default = router;
