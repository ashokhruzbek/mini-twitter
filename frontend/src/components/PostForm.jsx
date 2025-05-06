import { useState } from "react";
import axios from "axios";
import "../App.css";

function PostForm({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3030/posts", formData, {
        headers: { Authorization: token },
      });
      setText("");
      setImage(null);
      onPostCreated();
    } catch (err) {
      alert(err.response?.data || "Xatolik yuz berdi!");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-black dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-md space-y-4 w-full"
>
  <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">
    Yangi post
  </h3>

  <textarea
    className="w-full h-32 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-black dark:bg-black-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
    placeholder="Fikringizni yozing..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    required
  />

  <input
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
    className="block w-full border border-white rounded-lg text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-black file:text-white
      hover:file:bg-gray-800"
  />

  <button
    type="submit"
    className="bg-black text-white py-2 px-6 rounded-lg border-white border hover:bg-gray-800 transition w-full sm:w-1/2"
  >
    Yuborish
  </button>
</form>

  );
}

export default PostForm;