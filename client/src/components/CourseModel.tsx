import axios from "axios"
import { useState } from "react";
import Model from 'react-modal'

const API_BASE_URL = "api/v1";

function CourseModel() {

  const [visible, setVisible] = useState(false);
  const [courseName, setCourseName] = useState(false);
  
  const addCourse = async () => {
    const response = await axios.post(`${API_BASE_URL}/courses`) 
    console.log(response)
  }

  const createCourse = async () => {
    const response = await axios.post(`${API_BASE_URL}/courses`, {name: courseName})
  }
    
  return (
    <>
    <div className='mt-1 border-2 rounded-2xl p-2'>
        <label>Add a Course</label>
        <button className='ml-2' onClick={() => setVisible(true)}>+</button>
    </div>
    <Model isOpen={true}>
      <h1 className='text-2xl'>Create a Course</h1>
      <form>
        <label>Course Name</label>
        <input type='text' className='ml-0.5 border-2 rounded' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)}/><br></br>
        <button className='mt-1 border-2 rounded-2xl p-2'>Create Course</button>
      </form>
    </Model>
    </>
  )
}

export default CourseModel