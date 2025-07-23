
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Course from "../components/Course";
import CourseModel from "../components/CourseModel";
import API_BASE_URL from "../assets/URL";

interface Course {
  _id: string;
  name: string;
  color: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(response.data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-center text-4xl mt-1">API Study Tool</h1>
      <div className="flex flex-col items-center justify-center mt-1">
        <h3 className="text-2xl">My Courses</h3>
        <CourseModel onCourseCreated={fetchCourses} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {courses.map((course) => (
            <div
                key={course._id}
                onClick={() => navigate(`/course/${course._id}`, { state: { name: course.name }})}
                className="cursor-pointer"
            >
                <Course key={course._id} name={course.name} color={"red"} />
            </div>    
          ))}
        </div>
      </div>
    </>
  );
}