import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import white_like from '../assets/icons/like-white.png';
import red_like from '../assets/icons/like-red.png';

function PostItem({ post, onLike, onComment }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/posts/${post.id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [like, setLike] = useState(post.like_count > 0);

  useEffect(() => {
    fetchComments();
  }, []);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3030/posts/${post.id}/like`,
        {},
        { headers: { Authorization: token } }
      );
      onLike();
      setLike(!like);
    } catch (err) {
      alert(err.response?.data || "Xato yuz berdi!");
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3030/posts/${post.id}/comments`,
        { text: commentText },
        { headers: { Authorization: token } }
      );
      setCommentText("");
      fetchComments();
      onComment();
    } catch (err) {
      alert(err.response?.data || "Xato yuz berdi!");
    }
  };

  return (
    <div className="post-item">
      <h3 className="text-white text-uppercase">{post.name}</h3>
      <h5 className="text-white mt-3">{post.text}</h5>
      {post.image && <img src={`http://localhost:3030${post.image}`} alt="Post" width="560" className="my-3" style={{borderRadius: '20px'}} />}

      <div className="d-flex align-items-center justify-content-between">
        <h5 className="text-white">Likes: {post.like_count}</h5>
        <img src={like ? red_like : white_like} onClick={handleLike} alt="like" width={25} />
      </div>
      
      <div className="comments">
        <h4 className="text-white">Izohlar :</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="text-white  m-0 p-0">
                <strong>{comment.name}</strong> : {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">Hozircha izoh yo'q</p>
        )}
      <form onSubmit={handleCommentSubmit} className="d-flex flex-row align-items-center ">
        <input
          className="form-control fw-medium bg-black text-white w-100 me-0 commentInput"
          type="text"
          placeholder="Fikringi yaz..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit" className="commentBtn btn text-white ms-0">Yubor</button>
      </form>
      </div>
    </div>
  );
}

export default PostItem;