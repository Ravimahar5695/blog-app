import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {getAllPosts} from "../post/helper/postapicalls";
import secureLocalStorage from "react-secure-storage";
import { isAuthenticated } from "../auth/helper/authapicalls";
import { Navigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {adminDeletePost} from "./helper/adminapicalls";
import {Link} from "react-router-dom";

const AdminViewPosts = () => {

    const {userId, token} = isAuthenticated();

    const role = secureLocalStorage.getItem("role");
    console.log(role)

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts(1, 0).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setPosts(data);
            }
        });
    }, []);

    if(isAuthenticated() && role === 1){
        return (
            <div className="container">
                <Menu/>
                <h1 className="text-center mb-4">Posts</h1>
                <div className='row text-center'>
                    <div className="col-6 border py-2">
                        <b>Title</b>
                    </div>
                    <div className="col-2 border py-2">
                        <b>Category</b>
                    </div>
                    <div className="col-2 border py-2">
                        <b>Author</b>
                    </div>
                    <div className="col-1 border py-2">
                        <b>Update</b>
                    </div>
                    <div className="col-1 border py-2">
                        <b>Delete</b>
                    </div>
                </div>
                {posts && posts.map((post, index) => {
                        return (
                            <div key={index} className='row text-center'>
                                <div className="col-6 border py-2">
                                    {post.title}
                                </div>
                                <div className="col-2 border py-2">
                                    {post.category.name}
                                </div>
                                <div className="col-2 border py-2">
                                    {post.user.name}
                                </div>
                                <div className="col-1 border py-2">
                                    {post.user._id === userId &&
                                        <Link className="text-dark" to={`/user/${userId}/post/${post._id}/update`}><i class="fa-solid fa-pen-to-square" style={{cursor: "pointer"}}></i></Link>
                                    }
                                </div>
                                <div className="col-1 border py-2">
                                    <i class="fa-solid fa-trash" style={{cursor: "pointer"}} onClick={() => {
                                        adminDeletePost(userId, token, post._id);
                                        window.location.reload();
                                    }}></i>
                                </div>
                            </div>
                        );
                    })}
                <Footer/>
            </div>
        );
    } else{
        return <Navigate to="/login"/>
    }
}

export default AdminViewPosts;