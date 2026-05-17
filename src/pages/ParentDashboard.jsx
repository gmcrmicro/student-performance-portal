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

export default function ParentDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    alert("Logged Out Successfully");

    navigate("/");

  };

  const {
    students
  } = useContext(StudentContext);

  // TEMPORARY:
  // FIRST STUDENT LINKED

  const student = students[0];

  if (!student) {

    return (

      <div className="p-10 text-3xl font-bold">
        No Student Data Found
      </div>

    );

  }

  // THEORY ATTENDANCE

  let totalTheoryTaken = 0;
  let totalTheoryAttended = 0;

  // PRACTICAL ATTENDANCE

  let totalPracticalTaken = 0;
  let totalPracticalAttended = 0;

  if (student.attendance) {

    Object.values(student.attendance)
      .forEach((monthData) => {

        totalTheoryTaken +=
          monthData.theoryTaken || 0;

        totalTheoryAttended +=
          monthData.theoryAttended || 0;

        totalPracticalTaken +=
          monthData.practicalTaken || 0;

        totalPracticalAttended +=
          monthData.practicalAttended || 0;

      });

  }

  const theoryAttendance =
    totalTheoryTaken > 0

      ? Math.round(

          (
            totalTheoryAttended /
            totalTheoryTaken
          ) * 100

        )

      : 0;

  const practicalAttendance =
    totalPracticalTaken > 0

      ? Math.round(

          (
            totalPracticalAttended /
            totalPracticalTaken
          ) * 100

        )

      : 0;

  // FA AVERAGE

  const faAverage = Math.round(

    (

      (student.fa1 || 0) +
      (student.fa2 || 0) +
      (student.fa3 || 0) +
      (student.fa4 || 0) +
      (student.fa5 || 0) +
      (student.fa6 || 0) +
      (student.fa7 || 0) +
      (student.fa8 || 0)

    ) / 8

  );

  // PCT AVERAGE

  const pctAverage = Math.round(

    (

      (student.pct1Theory || 0) +
      (student.pct1Practical || 0) +
      (student.pct2Theory || 0) +
      (student.pct2Practical || 0)

    ) / 4

  );

  // OVERALL

  const overall = Math.round(

    (
      theoryAttendance +
      practicalAttendance +
      faAverage +
      pctAverage
    ) / 4

  );

  // STATUS

  let status = "GOOD";

  if (overall >= 75) {

    status = "EXCELLENT";

  }

  else if (overall < 50) {

    status = "AT RISK";

  }

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* Main Content */}

      <div className="flex-1 p-10">

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

          <h3 className="text-4xl font-bold text-purple-700">
            PARENT DASHBOARD
          </h3>

        </div>

        {/* Overview Cards */}

        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

            <h2 className="text-xl font-bold text-purple-700 mb-3">
              Theory Attendance
            </h2>

            <p className="text-5xl font-bold text-green-600">
              {theoryAttendance}%
            </p>

          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

            <h2 className="text-xl font-bold text-purple-700 mb-3">
              Practical Attendance
            </h2>

            <p className="text-5xl font-bold text-green-600">
              {practicalAttendance}%
            </p>

          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

            <h2 className="text-xl font-bold text-purple-700 mb-3">
              Overall Average
            </h2>

            <p className="text-5xl font-bold text-blue-700">
              {overall}%
            </p>

          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

            <h2 className="text-xl font-bold text-purple-700 mb-3">
              Academic Status
            </h2>

            <p className="text-3xl font-bold text-green-700">
              {status}
            </p>

          </div>

        </div>

        {/* Student Information */}

        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">

          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Student Information
          </h2>

          <div className="grid grid-cols-2 gap-6 text-lg">

            <div>
              <strong>Name:</strong>{" "}
              {student.name}
            </div>

            <div>
              <strong>Register Number:</strong>{" "}
              {student.regno}
            </div>

            <div>
              <strong>Department:</strong>{" "}
              {student.department}
            </div>

            <div>
              <strong>Parent Name:</strong>{" "}
              {student.parentname}
            </div>

          </div>

        </div>

        {/* Month Wise Attendance */}

        <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8 overflow-x-auto">

          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Month Wise Attendance
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-purple-700 text-white">

                <th className="p-4 border">
                  Month
                </th>

                <th className="p-4 border">
                  Theory Taken
                </th>

                <th className="p-4 border">
                  Theory Attended
                </th>

                <th className="p-4 border">
                  Theory %
                </th>

                <th className="p-4 border">
                  Practical Taken
                </th>

                <th className="p-4 border">
                  Practical Attended
                </th>

                <th className="p-4 border">
                  Practical %
                </th>

              </tr>

            </thead>

            <tbody>

              {student.attendance &&

                Object.entries(student.attendance)
                  .map(([month, data]) => {

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

                      <tr key={month}>

                        <td className="p-4 border font-bold">
                          {month}
                        </td>

                        <td className="p-4 border text-center">
                          {data.theoryTaken}
                        </td>

                        <td className="p-4 border text-center">
                          {data.theoryAttended}
                        </td>

                        <td className="p-4 border text-center font-bold text-blue-700">
                          {theoryPercentage}%
                        </td>

                        <td className="p-4 border text-center">
                          {data.practicalTaken}
                        </td>

                        <td className="p-4 border text-center">
                          {data.practicalAttended}
                        </td>

                        <td className="p-4 border text-center font-bold text-green-700">
                          {practicalPercentage}%
                        </td>

                      </tr>

                    );

                  })}

            </tbody>

          </table>

        </div>

        {/* FA Marks */}

        <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8 overflow-x-auto">

          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Formative Assessment Marks
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-purple-700 text-white">

                <th className="p-4 border">FA1</th>
                <th className="p-4 border">FA2</th>
                <th className="p-4 border">FA3</th>
                <th className="p-4 border">FA4</th>
                <th className="p-4 border">FA5</th>
                <th className="p-4 border">FA6</th>
                <th className="p-4 border">FA7</th>
                <th className="p-4 border">FA8</th>
                <th className="p-4 border">Average</th>

              </tr>

            </thead>

            <tbody>

              <tr className="text-center font-bold text-xl">

                <td className="p-4 border">{student.fa1 || 0}</td>
                <td className="p-4 border">{student.fa2 || 0}</td>
                <td className="p-4 border">{student.fa3 || 0}</td>
                <td className="p-4 border">{student.fa4 || 0}</td>
                <td className="p-4 border">{student.fa5 || 0}</td>
                <td className="p-4 border">{student.fa6 || 0}</td>
                <td className="p-4 border">{student.fa7 || 0}</td>
                <td className="p-4 border">{student.fa8 || 0}</td>

                <td className="p-4 border text-blue-700">
                  {faAverage}%
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* PCT Marks */}

        <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8 overflow-x-auto">

          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Part Completion Test Marks
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-purple-700 text-white">

                <th className="p-4 border">
                  PCT1 Theory
                </th>

                <th className="p-4 border">
                  PCT1 Practical
                </th>

                <th className="p-4 border">
                  PCT2 Theory
                </th>

                <th className="p-4 border">
                  PCT2 Practical
                </th>

                <th className="p-4 border">
                  Average
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="text-center font-bold text-xl">

                <td className="p-4 border">
                  {student.pct1Theory || 0}
                </td>

                <td className="p-4 border">
                  {student.pct1Practical || 0}
                </td>

                <td className="p-4 border">
                  {student.pct2Theory || 0}
                </td>

                <td className="p-4 border">
                  {student.pct2Practical || 0}
                </td>

                <td className="p-4 border text-green-700">
                  {pctAverage}%
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

 {/* Logout */}

      <button
        onClick={handleLogout}
        className="w-full bg-red-700 hover:bg-red-800 text-white p-4 rounded-xl text-xl font-semibold"
      >
        Logout
      </button>

    </div>

  );

}