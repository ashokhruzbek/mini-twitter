import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "./Sidebar";
import logo_x from '../assets/logo-x.png'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3030/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Xato yuz berdi!");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex align-items-center flex-row">
        <div className="col-xl-4">
            <img src={logo_x} alt="" className="logo-x" width={1000}/>
        </div>
        <div className="col-xl-8 bg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-white text-center">Login</h1>
            <input
              className="inp-username form-control fw-medium"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="inp-parol form-control fw-medium my-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: "red", margin: "0 auto" }}>{error}</p>}

            <button
              type="submit"
              className="button btn btn-outline-light btn-lg fw-bold"
            >
              Login
            </button>
           <Link to="/signup">Sign Up</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
