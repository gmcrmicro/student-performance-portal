import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useState } from "react";

import tnLogo from "../assets/tn-logo.png";
import ramnadLogo from "../assets/ramnad-logo.png";
import dmeLogo from "../assets/dme-logo.png";

export default function Login() {

  const [role, setRole] = useState("student");
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful");

    if (role === "student") {
      navigate("/student");
    }

    else if (role === "faculty") {
      navigate("/faculty");
    }

    else {
      navigate("/parent");
    }

  }

  catch (error) {
    alert(error.message);
  }

};
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 flex flex-col items-center px-4 py-6">

      {/* Logos */}

      <div className="w-full flex justify-between items-start mb-4">

        <img
          src={ramnadLogo}
          alt="Ramnad Logo"
          className="w-32 h-32 object-contain"
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

      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold text-blue-900 mb-3">
          DEPARTMENT OF MICROBIOLOGY
        </h1>

        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          GOVERNMENT MEDICAL COLLEGE & HOSPITAL,
          RAMANATHAPURAM, TAMIL NADU, INDIA.
        </h2>

        <h3 className="text-4xl font-bold text-blue-700">
          STUDENTS ACADEMIC PERFORMANCE
          MANAGEMENT PORTAL
        </h3>

      </div>

      {/* Login Card */}

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">

        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Student Performance Portal
        </h2>

        {/* Role */}

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Select Role
          </label>

          <select
            className="w-full border p-3 rounded-xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="faculty">Faculty</option>
          </select>

        </div>

        {/* Email */}

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}

        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Button */}

        <button
  onClick={handleLogin}
  className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl text-lg font-semibold"
>
  Login
</button>
      </div>

    </div>
  );
}