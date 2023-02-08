import Home from "./core/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Post from "./post/Post";
import AllPostsByCategory from "./post/AllPostsByCategory";
import AllPostsByUser from "./post/AllPostsByUser";
import Register from "./auth/Register";
import Login from "./auth/Login";
import CreatePost from "./user/CreatePost";
import ViewPosts from "./user/ViewPosts";
import UpdatePost from "./user/UpdatePost";
import CreateCategory from "./admin/CreateCategory";
import AdminViewPosts from "./admin/AdminViewPosts";
import AllCategories from "./category/AllCategories";
import AllUsers from "./user/AllUsers";
import ContactRequests from "./core/ContactRequests";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/post/:postId" element={<Post/>}/>
        <Route path="/category/:categoryId/posts" element={<AllPostsByCategory/>}/>
        <Route path="/user/:userId/posts" element={<AllPostsByUser/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/post/create" element={<CreatePost/>}/>
        <Route path="/posts/view" element={<ViewPosts/>}/>
        <Route path="/user/:userId/post/:postId/update" element={<UpdatePost/>}/>
        <Route path="/admin/category/create" element={<CreateCategory/>}/>
        <Route path="/admin/posts/view" element={<AdminViewPosts/>}/>
        <Route path="/categories" element={<AllCategories/>}/>
        <Route path="/authors" element={<AllUsers/>}/>
        <Route path="/admin/contact-requests" element={<ContactRequests/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;