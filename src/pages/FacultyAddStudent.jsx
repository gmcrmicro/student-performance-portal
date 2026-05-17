import { useNavigate } from "react-router-dom";
import {
  useContext
} from "react";

import {
  StudentContext
} from "../context/StudentContext";
import { useState } from "react";

import tnLogo from "../assets/tn-logo.png";
import ramnadLogo from "../assets/ramnad-logo.png";
import dmeLogo from "../assets/dme-logo.png";

export default function FacultyAddStudent() {
    const navigate = useNavigate();

const handleLogout = () => {

  alert("Logged Out Successfully");

  navigate("/");

};

  const {
    students,
    setStudents
  } = useContext(StudentContext);

  const [student, setStudent] = useState({

    name: "",
    dob: "",
    regno: "",
    department: "",
    parentname: "",
    parentmobile: ""

  });

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

 const handleSubmit = () => {

  setStudents([
    ...students,
    student
  ]);

  alert("Student Added Successfully");

};

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* Logos */}

      <div className="w-full flex justify-between items-start mb-4">

        <img
          src={ramnadLogo}
          alt="Ramnad Logo"
          className="w-28 h-28 object-contain"
        />

        <img
          src={tnLogo}
          alt="TN Logo"
          className="w-32 h-32 object-contain"
        />

        <img
          src={dmeLogo}
          alt="DME Logo"
          className="w-28 h-28 object-contain"
        />

      </div>

      {/* Heading */}

      <div className="text-center mb-10">

        <h1 className="text-5xl font-extrabold text-blue-900 mb-3">
          DEPARTMENT OF MICROBIOLOGY
        </h1>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          GOVERNMENT MEDICAL COLLEGE & HOSPITAL,
          RAMANATHAPURAM, TAMIL NADU, INDIA.
        </h2>

        <h3 className="text-4xl font-bold text-blue-700">
          FACULTY - ADD STUDENT
        </h3>

      </div>

      {/* Form */}

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10">

        <div className="grid grid-cols-2 gap-8">

          {/* Student Name */}

          <div>

            <label className="block mb-2 font-semibold text-lg">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Student Name"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

          {/* DOB */}

          <div>

            <label className="block mb-2 font-semibold text-lg">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

          {/* Register Number */}

          <div>

            <label className="block mb-2 font-semibold text-lg">
              University Register Number
            </label>

            <input
              type="text"
              name="regno"
              placeholder="Enter Register Number"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

          {/* Department */}

          <div>

            <label className="block mb-2 font-semibold text-lg">
              Department
            </label>

            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

          {/* Parent Name */}

          <div>

            <label className="block mb-2 font-semibold text-lg">
              Parent Name
            </label>

            <input
              type="text"
              name="parentname"
              placeholder="Enter Parent Name"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

          {/* Parent Mobile */}

          <div>

            <label className="block mb-2 font-semibold text-lg">
              Parent Mobile Number
            </label>

            <input
              type="text"
              name="parentmobile"
              placeholder="Enter Parent Mobile Number"
              className="w-full border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Buttons */}

<div className="mt-10 grid grid-cols-2 gap-6">

  {/* Save Student */}

  <button
    onClick={handleSubmit}
    className="
      bg-blue-700
      hover:bg-blue-800
      text-white
      p-4
      rounded-xl
      text-xl
      font-semibold
    "
  >
    Save Student
  </button>

  {/* Back Button */}

  <button
    onClick={() => navigate("/faculty")}
    className="
      bg-gray-700
      hover:bg-gray-800
      text-white
      p-4
      rounded-xl
      text-xl
      font-semibold
    "
  >
    Back to Dashboard
  </button>

</div>

      </div>

    </div>
  );
}