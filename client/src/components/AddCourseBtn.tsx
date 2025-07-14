import axios from "axios"

const API_BASE_URL = "api/v1";

function AddCourseBtn() {
  
  const addCourse = async () => {
    const response = await axios.post(`${API_BASE_URL}/courses`) 
    console.log(response)
  }
    
  return (
    <>
    <div className='mt-1 border-2 rounded-2xl p-2'>
        <label>Add a Course</label>
        <button className='ml-2' onClick={addCourse}>+</button>
    </div>
    </>
  )
}

export default AddCourseBtn