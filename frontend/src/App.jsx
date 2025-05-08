import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import MyLikes from "./pages/MyLikes";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/my-likes" element={<MyLikes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
