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
            <div>
                <Menu/>
                <div className="container" style={{overflowX: "auto"}}>
                    <h1 className="text-center mb-4">Posts</h1>
                    <table className="table table-bordered text-center table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.map((post, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{post.title}</td>
                                        <td>{post.category.name}</td>
                                        <td>{post.user.name}</td>
                                        <td>
                                            {post.user._id === userId &&
                                                <Link className="text-dark" to={`/user/${userId}/post/${post._id}/update`}><i class="fa-solid fa-pen-to-square" style={{cursor: "pointer"}}></i></Link>
                                            }
                                        </td>
                                        <td>
                                            <i class="fa-solid fa-trash" style={{cursor: "pointer"}} onClick={() => {
                                                adminDeletePost(userId, token, post._id);
                                                window.location.reload();
                                            }}></i>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </div>
        );
    } else{
        return <Navigate to="/"/>
    }
}

export default AdminViewPosts;