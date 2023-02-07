import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { getPostsByUser } from "./helper/postapicalls";
import {API} from "../backend";
import PostCard from "./PostCard";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {getUser} from "../user/helper/userapicalls";

const AllPostsByUser = () => {

    const {userId} = useParams();

    const [posts, setPosts] = useState([]);

    const [userName, setUserName] = useState();

    useEffect(() => {
        getPostsByUser(userId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setPosts(data);
            }
        });
        getUser(userId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setUserName(data.name);
            }
        })
    }, []);

    

    return (
        <div>
            <Menu/>
            <h1 className="text-center mb-4">Posts by {userName}</h1>
            {posts.map((post, index) => {
                const imageurl = post.picture ? `${API}/post/${post._id}/picture` : "https://cdn.pixabay.com/photo/2022/12/01/00/13/antique-7627999_960_720.jpg";
                return (
                    <div className="container">
                        <PostCard imageurl={imageurl} post={post} index={index} url={`/post/${post._id}`}/>
                    </div>
                );
            })}
            <Footer/>
        </div>
    );
}

export default AllPostsByUser;