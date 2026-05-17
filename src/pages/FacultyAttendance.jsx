import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  useContext,
  useState
} from "react";

import {
  StudentContext
} from "../context/StudentContext";

import { useNavigate } from "react-router-dom";

import tnLogo from "../assets/tn-logo.png";
import ramnadLogo from "../assets/ramnad-logo.png";
import dmeLogo from "../assets/dme-logo.png";

export default function FacultyAttendance() {

  const navigate = useNavigate();

  const handleLogout = () => {

    alert("Logged Out Successfully");

    navigate("/");

  };

  const {
    students,
    setStudents
  } = useContext(StudentContext);

  const [month, setMonth] =
    useState("January");

  // UPDATE ATTENDANCE

  const handleAttendanceChange = (
    index,
    field,
    value
  ) => {

    const updatedStudents = [...students];

    if (
      !updatedStudents[index].attendance
    ) {

      updatedStudents[index]
        .attendance = {};

    }

    if (
      !updatedStudents[index]
        .attendance[month]
    ) {

      updatedStudents[index]
        .attendance[month] = {

        theoryTaken: 0,
        theoryAttended: 0,
        practicalTaken: 0,
        practicalAttended: 0

      };

    }

    updatedStudents[index]
      .attendance[month][field] =
      Number(value);

    setStudents(updatedStudents);

  };

  // THEORY %

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

  // PRACTICAL %

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

  // SAVE

  const handleSave = () => {

    console.log(students);

    alert(
      "Attendance Saved Successfully"
    );

  };

  // PDF DOWNLOAD

  const downloadAttendancePDF =
    () => {

      const doc =
        new jsPDF("landscape");

      // HEADER

      doc.setFontSize(20);

      doc.setTextColor(
        0,
        51,
        153
      );

      doc.text(

        "DEPARTMENT OF MICROBIOLOGY",

        148,

        15,

        {
          align: "center"
        }

      );

      doc.setFontSize(12);

      doc.text(

        "GOVERNMENT MEDICAL COLLEGE & HOSPITAL, RAMANATHAPURAM, TAMIL NADU, INDIA.",

        148,

        23,

        {
          align: "center"
        }

      );

      doc.setFontSize(16);

      doc.setTextColor(
        0,
        0,
        0
      );

      doc.text(

        "MONTH WISE ATTENDANCE REPORT",

        148,

        33,

        {
          align: "center"
        }

      );

      // TABLE

      autoTable(doc, {

        startY: 45,

        styles: {

          fontSize: 7,

          halign: "center"

        },

        headStyles: {

          fillColor: [
            0,
            51,
            153
          ],

          textColor: 255

        },

        head: [[

          "Student",

          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"

        ]],

        body:

          students.map(

            (student) => [

              student.name,

              ...[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
              ].map(

                (monthName) => {

                  const data =
                    student.attendance?.[
                      monthName
                    ];

                  if (!data)
                    return "-";

                  const theory =
                    data.theoryTaken > 0

                      ? Math.round(

                          (
                            data.theoryAttended /
                            data.theoryTaken
                          ) * 100

                        )

                      : 0;

                  const practical =
                    data.practicalTaken > 0

                      ? Math.round(

                          (
                            data.practicalAttended /
                            data.practicalTaken
                          ) * 100

                        )

                      : 0;

                  return `T:${theory}% P:${practical}%`;

                }

              )

            ]

          )

      });

      doc.save(
        "Attendance_Report.pdf"
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
          TAMIL NADU,
          INDIA.
        </h2>

        <h3 className="text-4xl font-bold text-blue-700">
          FACULTY ATTENDANCE ENTRY
        </h3>

      </div>

      {/* Month Selection */}

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">

        <label className="block mb-3 text-xl font-bold">
          Select Month
        </label>

        <select
          value={month}
          onChange={(e) =>
            setMonth(
              e.target.value
            )
          }
          className="border p-4 rounded-xl w-72 text-lg"
        >

          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>

        </select>

      </div>

      {/* Attendance Table */}

      <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-800 text-white">

              <th className="p-4 border">
                Student Name
              </th>

              <th className="p-4 border">
                Theory Taken
              </th>

              <th className="p-4 border">
                Theory Attended
              </th>

              <th className="p-4 border">
                Practical Taken
              </th>

              <th className="p-4 border">
                Practical Attended
              </th>

              <th className="p-4 border">
                Cumulative Theory %
              </th>

              <th className="p-4 border">
                Cumulative Practical %
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map(
              (student, index) => {

                const monthData =
                  student.attendance?.[
                    month
                  ] || {};

                return (

                  <tr key={index}>

                    <td className="p-4 border font-bold">

                      {student.name}

                    </td>

                    <td className="p-4 border">

                      <input
                        type="number"
                        value={
                          monthData.theoryTaken || ""
                        }
                        onChange={(e) =>
                          handleAttendanceChange(
                            index,
                            "theoryTaken",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded-lg w-24"
                      />

                    </td>

                    <td className="p-4 border">

                      <input
                        type="number"
                        value={
                          monthData.theoryAttended || ""
                        }
                        onChange={(e) =>
                          handleAttendanceChange(
                            index,
                            "theoryAttended",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded-lg w-24"
                      />

                    </td>

                    <td className="p-4 border">

                      <input
                        type="number"
                        value={
                          monthData.practicalTaken || ""
                        }
                        onChange={(e) =>
                          handleAttendanceChange(
                            index,
                            "practicalTaken",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded-lg w-24"
                      />

                    </td>

                    <td className="p-4 border">

                      <input
                        type="number"
                        value={
                          monthData.practicalAttended || ""
                        }
                        onChange={(e) =>
                          handleAttendanceChange(
                            index,
                            "practicalAttended",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded-lg w-24"
                      />

                    </td>

                    <td className="p-4 border text-center font-bold text-blue-700">

                      {
                        calculateTheoryAttendance(
                          student
                        )
                      }%

                    </td>

                    <td className="p-4 border text-center font-bold text-green-700">

                      {
                        calculatePracticalAttendance(
                          student
                        )
                      }%

                    </td>

                  </tr>

                );

              }

            )}

          </tbody>

        </table>

      </div>

      {/* Month Wise Overview */}

      <div className="bg-white shadow-2xl rounded-2xl p-6 mt-10 overflow-x-auto">

        <h2 className="text-3xl font-bold text-blue-800 mb-8">
          Student Month Wise Attendance Overview
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-900 text-white">

              <th className="p-4 border">
                Student
              </th>

              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
              ].map((monthName) => (

                <th
                  key={monthName}
                  className="p-4 border"
                >
                  {monthName}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {students.map(
              (student, index) => (

                <tr key={index}>

                  <td className="p-4 border font-bold bg-gray-100">

                    {student.name}

                  </td>

                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  ].map((monthName) => {

                    const data =
                      student.attendance?.[
                        monthName
                      ];

                    if (!data) {

                      return (

                        <td
                          key={monthName}
                          className="p-4 border text-center text-gray-400"
                        >
                          -
                        </td>

                      );

                    }

                    const theoryPercentage =
                      data.theoryTaken > 0

                        ? Math.round(

                            (
                              data.theoryAttended /
                              data.theoryTaken
                            ) * 100

                          )

                        : 0;

                    const practicalPercentage =
                      data.practicalTaken > 0

                        ? Math.round(

                            (
                              data.practicalAttended /
                              data.practicalTaken
                            ) * 100

                          )

                        : 0;

                    return (

                      <td
                        key={monthName}
                        className="p-4 border text-center"
                      >

                        <div className="text-blue-700 font-bold">
                          T:
                          {" "}
                          {theoryPercentage}%
                        </div>

                        <div className="text-green-700 font-bold">
                          P:
                          {" "}
                          {practicalPercentage}%
                        </div>

                      </td>

                    );

                  })}

                </tr>

              )

            )}

          </tbody>

        </table>

      </div>

      {/* PDF BUTTON */}

      <div className="mt-8">

        <button
          onClick={downloadAttendancePDF}
          className="bg-red-700 hover:bg-red-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Download Attendance PDF
        </button>

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-6 mt-8">

        <button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Save Attendance
        </button>

        <button
          onClick={() =>
            navigate("/faculty")
          }
          className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-xl text-xl font-semibold"
        >
          Back to Dashboard
        </button>

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