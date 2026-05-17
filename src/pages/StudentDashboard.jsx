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

export default function StudentDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    alert("Logged Out Successfully");

    navigate("/");

  };

  const {
    students
  } = useContext(StudentContext);

  // TEMPORARY:
  // FIRST STUDENT LOGIN

  const student = students[0];

  if (!student) {

    return (

      <div className="p-10 text-3xl font-bold">
        No Student Data Found
      </div>

    );

  }

  // CUMULATIVE THEORY ATTENDANCE

const calculateTheoryAttendance =
  () => {

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

// CUMULATIVE PRACTICAL ATTENDANCE

const calculatePracticalAttendance =
  () => {

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

// FINAL %

const theoryAttendance =
  calculateTheoryAttendance();

const practicalAttendance =
  calculatePracticalAttendance();
  
  // FA Average

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

  // PCT Average

  const pctAverage = Math.round(

    (

      (student.pct1Theory || 0) +
      (student.pct1Practical || 0) +
      (student.pct2Theory || 0) +
      (student.pct2Practical || 0)

    ) / 4

  );

  // Overall

  const overall = Math.round(

    (
      theoryAttendance +
      practicalAttendance +
      faAverage +
      pctAverage
    ) / 4

  );

  // Performance Status

  let status = "GOOD";

  if (overall >= 75) {

    status = "EXCELLENT";

  }

  else if (overall < 50) {

    status = "AT RISK";

  }

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
          STUDENT DASHBOARD
        </h3>

      </div>

      {/* Profile */}

      <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8">

        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Student Profile
        </h2>

        <div className="grid grid-cols-2 gap-6 text-xl">

          <p>
            <span className="font-bold">
              Name:
            </span>{" "}
            {student.name}
          </p>

          <p>
            <span className="font-bold">
              Register No:
            </span>{" "}
            {student.regno}
          </p>

          <p>
            <span className="font-bold">
              Department:
            </span>{" "}
            {student.department}
          </p>

          <p>
            <span className="font-bold">
              Parent Name:
            </span>{" "}
            {student.parentname}
          </p>

        </div>

      </div>

{/* Month Wise Attendance */}

<div className="bg-white shadow-2xl rounded-2xl p-6 mb-8 overflow-x-auto">

  <h2 className="text-3xl font-bold text-blue-800 mb-6">
    Month Wise Attendance
  </h2>

  <table className="w-full border-collapse">

    <thead>

      <tr className="bg-blue-800 text-white">

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

      {/* Analytics Cards */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow-2xl rounded-2xl p-6">

          <h2 className="text-gray-500 text-lg">
            Theory Attendance
          </h2>

          <p className="text-5xl font-bold text-blue-700 mt-4">
            {theoryAttendance}%
          </p>

        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6">

          <h2 className="text-gray-500 text-lg">
            Practical Attendance
          </h2>

          <p className="text-5xl font-bold text-green-700 mt-4">
            {practicalAttendance}%
          </p>

        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6">

          <h2 className="text-gray-500 text-lg">
            FA Average
          </h2>

          <p className="text-5xl font-bold text-purple-700 mt-4">
            {faAverage}%
          </p>

        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6">

          <h2 className="text-gray-500 text-lg">
            PCT Average
          </h2>

          <p className="text-5xl font-bold text-orange-700 mt-4">
            {pctAverage}%
          </p>

        </div>

      </div>

      {/* Marks Table */}

      <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8 overflow-x-auto">

        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Formative Assessment Marks
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-800 text-white">

              <th className="p-4 border">
                FA1
              </th>

              <th className="p-4 border">
                FA2
              </th>

              <th className="p-4 border">
                FA3
              </th>

              <th className="p-4 border">
                FA4
              </th>

              <th className="p-4 border">
                FA5
              </th>

              <th className="p-4 border">
                FA6
              </th>

              <th className="p-4 border">
                FA7
              </th>

              <th className="p-4 border">
                FA8
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="text-center font-bold text-xl">

              <td className="p-4 border">
                {student.fa1 || 0}
              </td>

              <td className="p-4 border">
                {student.fa2 || 0}
              </td>

              <td className="p-4 border">
                {student.fa3 || 0}
              </td>

              <td className="p-4 border">
                {student.fa4 || 0}
              </td>

              <td className="p-4 border">
                {student.fa5 || 0}
              </td>

              <td className="p-4 border">
                {student.fa6 || 0}
              </td>

              <td className="p-4 border">
                {student.fa7 || 0}
              </td>

              <td className="p-4 border">
                {student.fa8 || 0}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* PCT */}

      <div className="bg-white shadow-2xl rounded-2xl p-6 mb-8 overflow-x-auto">

        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Part Completion Test Marks
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-800 text-white">

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

            </tr>

          </tbody>

        </table>

      </div>

      {/* Overall Performance */}

      <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8 text-center">

        <h2 className="text-4xl font-bold text-blue-800 mb-6">
          Overall Academic Performance
        </h2>

        <p className="text-7xl font-extrabold text-green-700 mb-6">
          {overall}%
        </p>

        <div
          className={`inline-block px-8 py-4 rounded-2xl text-2xl font-bold text-white ${
            status === "EXCELLENT"
              ? "bg-green-700"
              : status === "AT RISK"
              ? "bg-red-700"
              : "bg-blue-700"
          }`}
        >

          {status}

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