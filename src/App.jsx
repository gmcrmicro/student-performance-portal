import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import FacultyAddStudent from "./pages/FacultyAddStudent";
import FacultyAttendance from "./pages/FacultyAttendance";
import FacultyFAMarks from "./pages/FacultyFAMarks";
import FacultyPCTMarks from "./pages/FacultyPCTMarks";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        <Route
          path="/faculty-add-student"
          element={<FacultyAddStudent />}
        />

        <Route
  path="/faculty-attendance"
  element={<FacultyAttendance />}
/>

<Route
  path="/faculty-fa-marks"
  element={<FacultyFAMarks />}
/>

<Route
  path="/faculty-pct-marks"
  element={<FacultyPCTMarks />}
/>
        <Route
          path="/parent"
          element={<ParentDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}