import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassesPage from "./pages/ClassesPage";
import RegisterPage from "./pages/RegisterPage";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students/register" element={<RegisterPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/students/:classId" element={<StudentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
