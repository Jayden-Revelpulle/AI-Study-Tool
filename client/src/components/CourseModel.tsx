import axios from "axios";
import { useState } from "react";
import Model from "react-modal";

const API_BASE_URL = "http://localhost:3000/api/v1";;

function CourseModel({ onCourseCreated } : { onCourseCreated: () => void}) {
  const [visible, setVisible] = useState(false);
  const [courseName, setCourseName] = useState("");

  const createCourse = async () => {
    await axios.post(`${API_BASE_URL}/courses`, {name: courseName})  // run POST request to create course
    onCourseCreated(); // fetch updates courses
    setVisible(false); //close modal
  };

  return (
    <>
      <div className="mt-1 border-2 rounded-2xl p-2 flex items-center">
        <label>Add a Course</label>
        <button
          className="ml-2 bg-gray-50 hover:bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => setVisible(true)}
        >
          +
        </button>
      </div>
      <Model
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        className="relative bg-white rounded-2xl p-8 flex flex-col items-center justify-center w-full max-w-md mx-auto"
      >
        <h1 className="text-2xl mb-4">Create a Course</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCourse();
          }}
          className="flex flex-col items-center w-full"
        >
          <label className="mb-2">Course Name</label>
          <input
            type="text"
            required={true}
            className="mb-4 border-2 rounded px-2 py-1 w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourseName(e.target.value)
            }
          />
          <button
            type="submit"
            className="border-2 rounded-2xl p-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Create Course
          </button>
        </form>
      </Model>
    </>
  );
}

export default CourseModel;
