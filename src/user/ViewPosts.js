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
    }, []);

    if(!isAuthenticated()){
        return <Navigate to="/login"/>
    } else{
        return (
            <div>
                <Menu/>
                <div className="container">
                <h1 className="text-center">Posts</h1>
                <div className='row text-center'>
                <div className="col-1 border py-2">
                        <b>#</b>
                    </div>
                    <div className="col-6 border py-2">
                        <b>Title</b>
                    </div>
                    <div className="col-2 border py-2">
                        <b>Category</b>
                    </div>
                    <div className="col-2 border py-2">
                        <b>Update</b>
                    </div>
                    <div className="col-1 border py-2">
                        <b>Delete</b>
                    </div>
                </div>
                    {posts && posts.map((post, index) => {
                        return (
                            <div key={index} className='row text-center'>
                                <div className="col-1 border py-2">
                                    {index+1}
                                </div>
                                <div className="col-6 border py-2">
                                    {post.title}
                                </div>
                                <div className="col-2 border py-2">
                                    {post.category.name}
                                </div>
                                <div className="col-2 border py-2">
                                    <Link className="text-dark" to={`/user/${userId}/post/${post._id}/update`}><i class="fa-solid fa-pen-to-square" style={{cursor: "pointer"}}></i></Link>
                                </div>
                                <div className="col-1 border py-2">
                                    <i className="fa-solid fa-trash" style={{cursor: "pointer"}} onClick={() => {
                                        deletePost(userId, token, post._id);
                                        window.location.reload();
                                    }}></i>
                                </div>
                            </div>
                        );
                    })}
                    <div className="mb-5"></div>
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default ViewPosts;