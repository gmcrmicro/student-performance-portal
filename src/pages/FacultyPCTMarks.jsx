import {
  useContext
} from "react";

import {
  StudentContext
} from "../context/StudentContext";

import { useNavigate } from "react-router-dom";

import tnLogo from "../assets/tn-logo.png";
import ramnadLogo from "../assets/ramnad-logo.png";
import dmeLogo from "../assets/dme-logo.png";

export default function FacultyPCTMarks() {

  const navigate = useNavigate();

  const handleLogout = () => {

    alert("Logged Out Successfully");

    navigate("/");

  };

  const {
    students,
    setStudents
  } = useContext(StudentContext);

  // Update PCT Marks

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updatedStudents = [...students];

    updatedStudents[index][field] =
      Number(value);

    setStudents(updatedStudents);

  };

  // Calculate Average

  const calculateAverage = (student) => {

    const total =

      (student.pct1Theory || 0) +
      (student.pct1Practical || 0) +
      (student.pct2Theory || 0) +
      (student.pct2Practical || 0);

    return Math.round(total / 4);

  };

  // Save

  const handleSave = () => {

    console.log(students);

    alert("PCT Marks Saved Successfully");

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

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
          FACULTY PCT MARKS ENTRY
        </h3>

      </div>

      {/* Table */}

      <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-800 text-white">

              <th className="p-3 border">
                S.No
              </th>

              <th className="p-3 border">
                Student Name
              </th>

              <th className="p-3 border">
                PCT1 Theory
              </th>

              <th className="p-3 border">
                PCT1 Practical
              </th>

              <th className="p-3 border">
                PCT2 Theory
              </th>

              <th className="p-3 border">
                PCT2 Practical
              </th>

              <th className="p-3 border">
                Average
              </th>

              <th className="p-3 border">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student, index) => {

              const average =
                calculateAverage(student);

              return (

                <tr
                  key={index}
                  className={
                    average < 50
                      ? "bg-red-100"
                      : "bg-white"
                  }
                >

                  <td className="p-3 border text-center">
                    {index + 1}
                  </td>

                  <td className="p-3 border font-semibold">
                    {student.name}
                  </td>

                  {/* PCT Inputs */}

                  {[
                    "pct1Theory",
                    "pct1Practical",
                    "pct2Theory",
                    "pct2Practical"
                  ].map((field) => (

                    <td
                      key={field}
                      className="p-3 border text-center"
                    >

                      <input
                        type="number"
                        value={
                          student[field] || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            index,
                            field,
                            e.target.value
                          )
                        }
                        className="w-24 border p-2 rounded-lg text-center"
                      />

                    </td>

                  ))}

                  {/* Average */}

                  <td className="p-3 border text-center font-bold text-xl">

                    {average}

                  </td>

                  {/* Status */}

                  <td className="p-3 border text-center">

                    {average < 50 ? (

                      <span className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold">
                        LOW
                      </span>

                    ) : (

                      <span className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold">
                        GOOD
                      </span>

                    )}

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-6 mt-8">

        <button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Save PCT Marks
        </button>

        <button
          onClick={() => navigate("/faculty")}
          className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Back to Dashboard
        </button>

      </div>

    </div>

  );
}