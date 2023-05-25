import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
