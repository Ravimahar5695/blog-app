import Menu from "../core/Menu";
import Footer from "../core/Footer";
import { isAuthenticated } from "../auth/helper/authapicalls";
import {Navigate, Link} from "react-router-dom";
import {getPostsByUser} from "../post/helper/postapicalls";
import { useEffect, useState } from "react";
import {deletePost} from "./helper/userapicalls";

const ViewPosts = () => {

    const [posts, setPosts] = useState([]);

    const {userId, token} = isAuthenticated();

    useEffect(() => {
        getPostsByUser(userId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setPosts(data);
            }
        });
    }, [posts]);

    if(!isAuthenticated()){
        return <Navigate to="/login"/>
    } else{
        return (
            <div>
                <Menu/>
                <div className="container" style={{overflowX: "auto"}}>
                    <h1 className="text-center">Posts</h1>
                    <table className="table table-bordered text-center table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
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
                                        <td>
                                            <Link className="btn btn-primary rounded-0" to={`/user/${userId}/post/${post._id}/update`}><i class="fa-solid fa-pen-to-square" style={{cursor: "pointer"}}></i></Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger rounded-0 cursor-pointer" onClick={() => {
                                                    deletePost(userId, token, post._id);
                                                }}>
                                                    <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="mb-5"></div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default ViewPosts;