import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassesPage from "./pages/ClassesPage";
import RegisterPage from "./pages/RegisterPage";
import StudentsByClassPage from "./pages/StudentsByClassPage";
import SingleStudentPage from "./pages/SingleStudentPage";
import SendProjectForm from "./pages/SendProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students/register" element={<RegisterPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:classId" element={<StudentsByClassPage />} />
        <Route path="/students/:studentId" element={<SingleStudentPage />} />
        <Route path="/submit" element={<SendProjectForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
