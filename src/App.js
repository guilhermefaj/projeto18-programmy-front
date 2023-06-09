import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassesPage from "./pages/ClassesPage";
import RegisterPage from "./pages/RegisterPage";
import StudentsByClassPage from "./pages/StudentsByClassPage";
import SingleStudentPage from "./pages/SingleStudentPage";
import ProjectsPage from "./pages/ProjectsPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import SendProjectPage from "./pages/SendProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students/register" element={<RegisterPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:classId" element={<StudentsByClassPage />} />
        <Route path="/students/:studentId" element={<SingleStudentPage />} />
        <Route path="/submit" element={<SendProjectPage />} />
        <Route path="/projects/:id/:classId" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
