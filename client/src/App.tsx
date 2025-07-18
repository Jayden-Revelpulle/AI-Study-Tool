import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Course from "./components/Course";
import AddCourseBtn from "./components/AddCourseBtn";

interface Course {
  _id: string;
  name: string;
  color: string;
}

const API_BASE_URL = "http://localhost:3000/api/v1";

function App() {
  const [courses, setCourses] = useState<Course[]>([])

  const fetchCourses = async () => {
    console.log("fetchCourses")
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`)
      console.log(response.data.courses);
      setCourses(response.data.courses);
      console.log(courses)

    } catch(err) {
      console.error("Error fetching courses:", err)
    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  return (
    <>
      <h1 className="text-center text-4xl mt-1">API Study Tool</h1>
      <div className="flex flex-col items-center justify-center mt-1">
        <h3 className="text-2xl">My Courses</h3>
        <AddCourseBtn/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <Course name="Calculus" color="red"></Course>
          <Course name="Programming" color="blue"></Course>
          <Course name="Linear Algebra" color="green"></Course>
        </div>
      </div>
    </>
  );
}

export default App;
