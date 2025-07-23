import { useLocation, useParams } from "react-router-dom"
import API_BASE_URL from "../assets/URL";
import axios from "axios";

export default function Course() {
    const location = useLocation();
    const courseName = location.state?.name;
    const { id } = useParams();

    const deleteCourse = async (id: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/courses/${id}`);
        } catch(err) {
            console.error("Error deleting course:", err);
        }
    }
    

  return (
    <>
        <h1 className="text-center text-4xl mt-1">API Study Tool</h1>
        <h3 className="text-center text-2xl">{courseName}</h3>
        <button className='text-red-500 border-2 rounded-full p-2'
        onClick={() => id && deleteCourse(id)}>Delete</button>
    </>
  )
}
