// client/src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Course from "./pages/Course";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course/:id" element={<Course />} />
    </Routes>
  );
}

export default App;