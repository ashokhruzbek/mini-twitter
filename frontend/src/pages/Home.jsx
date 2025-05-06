import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col xl:flex-row max-w-screen-xl mx-auto px-4">
      {/* Sidebar */}
      <div className="w-full xl:w-2/12 mb-4 xl:mb-0">
        <Sidebar />
      </div>

      {/* Post List */}
      <div className="w-full xl:w-7/12 mb-4 xl:mb-0">
        <PostList url="http://localhost:3030/posts" />
      </div>

      {/* Post Form */}
      <div className="w-full xl:w-3/12">
        {token && (
          <div className="xl:fixed xl:right-4 xl:top-20 w-full xl:w-3/12">
            <PostForm onPostCreated={() => window.location.reload()} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
