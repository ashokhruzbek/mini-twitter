import Navbar from "../components/Sidebar";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

function MyLikes() {
  const token = localStorage.getItem("token");

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-2">
          <Navbar />
        </div>
        <div className="col-xl-7">
          <h1 className="text-center text-white my-3">My Likes</h1>
          <PostList url="http://localhost:3030/my-likes" />
        </div>
        <div className="col-xl-3">
          <div className="position-fixed">
            {token && <PostForm onPostCreated={() => window.location.reload()} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLikes;
