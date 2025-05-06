import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/X.png";
import home from "../assets/icons/home.png";
import post from "../assets/icons/post.png";
import likes from "../assets/icons/likes.png";
import profile from "../assets/icons/profile.png";
import logout from "../assets/icons/logout.png";
import login from "../assets/icons/login.png";
import signup from "../assets/icons/signup.png";
import axios from "axios";
import { useEffect, useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3030/profile", {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, []);
  
  return (
    <nav className="navbar pb-4 pt-2 d-flex flex-column justify-content-between position-fixed">
      <div>
        <div className="logo mb-0">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="X_icon" className="logo-icon" />
          </Link>
        </div>
        <div className="links d-flex flex-column align-items-start gap-3">
          <div className="home d-flex align-items-center gap-3 icon-hover">
            <img src={home} className="home-icon ms-3" alt="" width={25} height={25} />
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>
          {token ? (
            <>
              <div className="home d-flex align-items-center gap-3 icon-hover">
                <img src={post} alt="" className="ms-3" width={25} height={25} />
                <Link to="/my-posts" className="nav-link">
                  My Posts
                </Link>
              </div>
              <div className="home d-flex align-items-center gap-3 icon-hover">
                <img src={likes} alt="" className="ms-3" width={25} height={25} />
                <Link to="/my-likes" className="nav-link">
                  My Likes
                </Link>
              </div>
              <div className="home d-flex align-items-center gap-3 icon-hover">
                <img src={logout} alt="" className="ms-3" width={25} height={25} />
                <button onClick={handleLogout} className="nav-link">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="home d-flex align-items-center gap-3 icon-hover">
                <img src={login} alt="" className="ms-3" width={35} height={35} />
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </div>
              <div className="home d-flex align-items-center gap-3 icon-hover">
                <img src={signup} alt="" className="ms-3" width={25} height={25} />
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="user d-flex align-items-center gap-3">
        {user && (
          <img src={`http://localhost:3030${user.profile_picture}`} 
          className="rounded-5" alt="User img" width={60} height={60} 
          style={{width: "50px", height: "50px", border: "1px solid white"}} />
        )}
        <div className="user-name ">
          {user && <h4>{user.name}</h4>}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
