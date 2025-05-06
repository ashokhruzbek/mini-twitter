import { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "./PostItem";

function PostList({ url }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(url, {
        headers: token ? { Authorization: token } : {},
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onLike={fetchPosts} onComment={fetchPosts} />
      ))}
    </div>
  );
}

export default PostList;