import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Sidebar";
import PostForm from "../components/PostForm";
import "../pages/page_css/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3030/profile", {
          headers: { Authorization: token },
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        alert(err.response?.data || "Xato yuz berdi!");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div className="my-5 fs-1 text-white mx-auto">Loading...</div>;

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row">
        <div className="col-xl-2">
          <Navbar />
        </div>
        <div className="col-xl-7">
          <h1 className="text-center text-white my-3">Profile</h1>
          <div className="d-flex align-items-center gap-3">
            {user.profile_picture && (
              <img src={`http://localhost:3030${user.profile_picture}`} alt="Profile" className="profile-image" width="200" />
            )}
            <h2 className="text-white">{user.name} ({user.username})</h2>
          </div>
            <div className="line my-4"/>
        </div>
        <div className="col-xl-3">
          <div className="position-fixed">
            {token && (<PostForm onPostCreated={() => window.location.reload()} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
