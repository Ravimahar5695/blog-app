import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { getPostsByCategory } from "./helper/postapicalls";
import {API} from "../backend";
import PostCard from "./PostCard";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {getCategory} from "../category/helper/categoryapicalls";

const AllPostsByCategory = () => {

    const {categoryId} = useParams();

    const [categoryName, setCategoryName] = useState();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostsByCategory(categoryId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setPosts(data);
            }
        });
        getCategory(categoryId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setCategoryName(data.name);
            }
        })
    }, []);

    return (
        <div>
            <Menu/>
            <h1 className="text-center">Posts in {categoryName} category</h1>
            <button type="button" className="btn btn-warning d-block mx-auto mb-4">
                Posts <span className="badge bg-secondary">{posts.length}</span>
            </button>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {posts.map((post, index) => {
                    const imageurl = post.picture ? `${API}/post/${post._id}/picture` : "https://cdn.pixabay.com/photo/2022/12/01/00/13/antique-7627999_960_720.jpg";
                    return (
                        <PostCard imageurl={imageurl} post={post} index={index} url={`/post/${post._id}`}/>
                    );
                })}
            </div>
            <Footer/>
        </div>
    );
}

export default AllPostsByCategory;