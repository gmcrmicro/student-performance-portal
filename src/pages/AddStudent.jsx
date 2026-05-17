import { useState } from "react";

export default function AddStudent() {

  const [student, setStudent] = useState({
    name: "",
    dob: "",
    regno: "",
    department: ""
  });

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = () => {
    console.log(student);
    alert("Student Added");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Add Student
        </h1>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
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

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Date of Birth
          </label>

          <input
            type="date"
            name="dob"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

        </div>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
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

        <div className="mb-8">

          <label className="block mb-2 font-semibold">
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

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl text-lg font-semibold"
        >
          Save Student
        </button>

      </div>

    </div>
  );
}