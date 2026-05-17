import {
  useContext,
  useState
} from "react";

import {
  StudentContext
} from "../context/StudentContext";

import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import tnLogo from "../assets/tn-logo.png";
import ramnadLogo from "../assets/ramnad-logo.png";
import dmeLogo from "../assets/dme-logo.png";

export default function FacultyDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    alert("Logged Out Successfully");

    navigate("/");

  };

  const {
    students
  } = useContext(StudentContext);

  const [search, setSearch] =
    useState("");

  const [selectedStudents,
    setSelectedStudents] =
      useState([]);

  // SEARCH FILTER

  const filteredStudents =
    students.filter((student) =>

      student.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      student.regno
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  // CHECKBOX

  const handleCheckboxChange =
    (student) => {

      const exists =
        selectedStudents.find(

          (s) =>
            s.regno ===
            student.regno

        );

      if (exists) {

        setSelectedStudents(

          selectedStudents.filter(

            (s) =>
              s.regno !==
              student.regno

          )

        );

      }

      else {

        setSelectedStudents([

          ...selectedStudents,
          student

        ]);

      }

    };

  // SELECT ALL

  const handleSelectAll = () => {

    setSelectedStudents(
      filteredStudents
    );

  };

  // CUMULATIVE THEORY %

  const calculateTheoryAttendance =
    (student) => {

      if (!student.attendance)
        return 0;

      let taken = 0;
      let attended = 0;

      Object.values(
        student.attendance
      ).forEach((data) => {

        taken +=
          data.theoryTaken || 0;

        attended +=
          data.theoryAttended || 0;

      });

      return taken > 0

        ? Math.round(
            (attended / taken) * 100
          )

        : 0;

    };

  // CUMULATIVE PRACTICAL %

  const calculatePracticalAttendance =
    (student) => {

      if (!student.attendance)
        return 0;

      let taken = 0;
      let attended = 0;

      Object.values(
        student.attendance
      ).forEach((data) => {

        taken +=
          data.practicalTaken || 0;

        attended +=
          data.practicalAttended || 0;

      });

      return taken > 0

        ? Math.round(
            (attended / taken) * 100
          )

        : 0;

    };

  // OVERALL ATTENDANCE

  const calculateOverallAttendance =
    (student) => {

      const theory =
        calculateTheoryAttendance(
          student
        );

      const practical =
        calculatePracticalAttendance(
          student
        );

      return Math.round(
        (theory + practical) / 2
      );

    };

  // FA AVERAGE

  const calculateFAAverage =
    (student) => {

      const total =

        (student.fa1 || 0) +
        (student.fa2 || 0) +
        (student.fa3 || 0) +
        (student.fa4 || 0) +
        (student.fa5 || 0) +
        (student.fa6 || 0) +
        (student.fa7 || 0) +
        (student.fa8 || 0);

      return Math.round(
        total / 8
      );

    };

  // PCT AVERAGE

  const calculatePCTAverage =
    (student) => {

      const total =

        (student.pct1Theory || 0) +
        (student.pct1Practical || 0) +
        (student.pct2Theory || 0) +
        (student.pct2Practical || 0);

      return Math.round(
        total / 4
      );

    };

  // OVERALL SCORE

  const calculateOverallScore =
    (student) => {

      const attendance =
        calculateOverallAttendance(
          student
        );

      const fa =
        calculateFAAverage(
          student
        );

      const pct =
        calculatePCTAverage(
          student
        );

      return Math.round(

        (
          attendance +
          fa +
          pct
        ) / 3

      );

    };

  // ANALYTICS

  const totalStudents =
    students.length;

  const averageAttendance =
    totalStudents > 0

      ? Math.round(

          students.reduce(

            (total, student) =>

              total +
              calculateOverallAttendance(
                student
              ),

            0

          ) / totalStudents

        )

      : 0;

  const averageFA =
    totalStudents > 0

      ? Math.round(

          students.reduce(

            (total, student) =>

              total +
              calculateFAAverage(
                student
              ),

            0

          ) / totalStudents

        )

      : 0;

  const averagePCT =
    totalStudents > 0

      ? Math.round(

          students.reduce(

            (total, student) =>

              total +
              calculatePCTAverage(
                student
              ),

            0

          ) / totalStudents

        )

      : 0;

  const lowAttendanceStudents =
    students.filter(

      (student) =>

        calculateOverallAttendance(
          student
        ) < 75

    ).length;

  // PDF DOWNLOAD

  const downloadPDF = () => {

  const doc = new jsPDF();

  // HEADER

  doc.setFontSize(20);

  doc.setTextColor(0, 51, 153);

  doc.text(
    "DEPARTMENT OF MICROBIOLOGY",
    105,
    15,
    { align: "center" }
  );

  doc.setFontSize(12);

  doc.text(
    "GOVERNMENT MEDICAL COLLEGE & HOSPITAL, RAMANATHAPURAM, TAMIL NADU, INDIA.",
    105,
    23,
    { align: "center" }
  );

  doc.setFontSize(16);

  doc.setTextColor(0, 0, 0);

  doc.text(
    "STUDENT PERFORMANCE REPORT",
    105,
    33,
    { align: "center" }
  );

  // DATE

  doc.setFontSize(10);

  doc.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    14,
    42
  );

  // TABLE

  autoTable(doc, {

    startY: 50,

    styles: {

      fontSize: 8,

      halign: "center",
      valign: "middle"

    },

    headStyles: {

      fillColor: [0, 51, 153],

      textColor: 255,

      fontStyle: "bold"

    },

    head: [[

      "Name",

      "Reg No",

      "Theory %",

      "Practical %",

      "Overall Attendance %",

      "FA Avg %",

      "PCT Avg %",

      "Overall Score %"

    ]],

    body:

      selectedStudents.map(

        (student) => [

          student.name,

          student.regno,

          calculateTheoryAttendance(
            student
          ) + "%",

          calculatePracticalAttendance(
            student
          ) + "%",

          calculateOverallAttendance(
            student
          ) + "%",

          calculateFAAverage(
            student
          ) + "%",

          calculatePCTAverage(
            student
          ) + "%",

          calculateOverallScore(
            student
          ) + "%"

        ]

      )

  });

  // FOOTER

  const finalY =
    doc.lastAutoTable.finalY + 20;

  doc.setFontSize(10);

  doc.text(
    "Faculty Signature",
    14,
    finalY
  );

  doc.text(
    "Head of Department",
    150,
    finalY
  );

  // SAVE

  doc.save(
    "Student_Performance_Report.pdf"
  );

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
          RAMANATHAPURAM,
          TAMIL NADU, INDIA.
        </h2>

        <h3 className="text-4xl font-bold text-blue-700">
          FACULTY DASHBOARD
        </h3>

      </div>

      {/* Analytics */}

      <div className="grid grid-cols-5 gap-6 mb-8">

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-lg font-bold text-gray-600">
            Students
          </h2>

          <p className="text-5xl font-bold text-blue-700 mt-3">
            {totalStudents}
          </p>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-lg font-bold text-gray-600">
            Attendance
          </h2>

          <p className="text-5xl font-bold text-green-700 mt-3">
            {averageAttendance}%
          </p>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-lg font-bold text-gray-600">
            FA Avg
          </h2>

          <p className="text-5xl font-bold text-purple-700 mt-3">
            {averageFA}%
          </p>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-lg font-bold text-gray-600">
            PCT Avg
          </h2>

          <p className="text-5xl font-bold text-orange-700 mt-3">
            {averagePCT}%
          </p>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

          <h2 className="text-lg font-bold text-gray-600">
            Low Attendance
          </h2>

          <p className="text-5xl font-bold text-red-700 mt-3">
            {lowAttendanceStudents}
          </p>

        </div>

      </div>

      {/* Action Buttons */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <button
          onClick={() =>
            navigate(
              "/faculty-add-student"
            )
          }
          className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Add Student
        </button>

        <button
          onClick={() =>
            navigate(
              "/faculty-attendance"
            )
          }
          className="bg-green-700 hover:bg-green-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Attendance Entry
        </button>

        <button
          onClick={() =>
            navigate(
              "/faculty-fa-marks"
            )
          }
          className="bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          FA Marks Entry
        </button>

        <button
          onClick={() =>
            navigate(
              "/faculty-pct-marks"
            )
          }
          className="bg-orange-700 hover:bg-orange-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          PCT Marks Entry
        </button>

      </div>

      {/* Search */}

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">

        <input
          type="text"
          placeholder="Search Student"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border p-4 rounded-xl"
        />

      </div>

      {/* Student Table */}

      <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">

        <div className="flex justify-between mb-6">

          <button
            onClick={handleSelectAll}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl"
          >
            Select All
          </button>

          <button
            onClick={downloadPDF}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl"
          >
            Download PDF
          </button>

        </div>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-800 text-white">

              <th className="p-3 border">
                Select
              </th>

              <th className="p-3 border">
                Name
              </th>

              <th className="p-3 border">
                Reg No
              </th>

              <th className="p-3 border">
                Theory %
              </th>

              <th className="p-3 border">
                Practical %
              </th>

              <th className="p-3 border">
                Overall Attendance
              </th>

              <th className="p-3 border">
                FA Avg
              </th>

              <th className="p-3 border">
                PCT Avg
              </th>

              <th className="p-3 border">
                Overall Score
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map(
              (student, index) => (

                <tr key={index}>

                  <td className="p-3 border text-center">

                    <input
                      type="checkbox"
                      checked={
                        selectedStudents.find(

                          (s) =>
                            s.regno ===
                            student.regno

                        )

                          ? true
                          : false
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          student
                        )
                      }
                    />

                  </td>

                  <td className="p-3 border">
                    {student.name}
                  </td>

                  <td className="p-3 border">
                    {student.regno}
                  </td>

                  <td className="p-3 border text-center font-bold text-blue-700">

                    {
                      calculateTheoryAttendance(
                        student
                      )
                    }%

                  </td>

                  <td className="p-3 border text-center font-bold text-green-700">

                    {
                      calculatePracticalAttendance(
                        student
                      )
                    }%

                  </td>

                  <td className="p-3 border text-center font-bold text-purple-700">

                    {
                      calculateOverallAttendance(
                        student
                      )
                    }%

                  </td>

                  <td className="p-3 border text-center">

                    {
                      calculateFAAverage(
                        student
                      )
                    }%

                  </td>

                  <td className="p-3 border text-center">

                    {
                      calculatePCTAverage(
                        student
                      )
                    }%

                  </td>

                  <td className="p-3 border text-center font-bold text-red-700">

                    {
                      calculateOverallScore(
                        student
                      )
                    }%

                  </td>

                </tr>

              )

            )}

          </tbody>

        </table>

      </div>

      {/* Logout */}

      <div className="mt-8">

        <button
          onClick={handleLogout}
          className="w-full bg-red-700 hover:bg-red-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Logout
        </button>

      </div>

    </div>

  );

}