import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Navbar from "../components/Sidebar";

function MyPosts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div style={{ height: "100%" }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-2">
            <Navbar />
          </div>
          <div className="col-xl-7">
            <h1 className="text-center text-white my-3">My Posts</h1>
            <PostList url={`http://localhost:3030/my-posts?token=${token}`} />
          </div>
          <div className="col-xl-3">
            <div className="position-fixed">
              {token && <PostForm onPostCreated={() => window.location.reload()} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPosts;