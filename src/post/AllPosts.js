import {useState, useEffect} from "react";
import { getAllPosts } from "./helper/postapicalls";
import {API} from "../backend";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";

const AllPosts = () => {

    var [pageNumber, setPageNumber] = useState(1);

    const [posts, setPosts] = useState([]);

    const loadPosts = () => {
        getAllPosts(pageNumber, 10).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setPosts(data);
            }
        });
    }

    useEffect(() => {
        loadPosts();
    }, [pageNumber]);

    if(posts.length === 0){
        return (
            <div>
                <h1 className="text-center">No more posts</h1>
                {pageNumber > 1 &&
                    <div>
                        <button className="btn text-white" style={{backgroundColor: "#FF5733", border: "none"}} onClick={
                                () => {
                                    pageNumber--;
                                    setPageNumber(pageNumber);
                                }
                            }>
                                Back
                        </button>
                        &nbsp;
                        <button className="btn text-white" style={{backgroundColor: "#FF5733", border: "none"}} onClick={
                                () => {
                                    pageNumber = 1;
                                    setPageNumber(pageNumber);
                                }
                            }>
                                Home
                        </button>
                    </div>
                }
            </div>
        )
        
    } else{
        return (
            <div>
                {posts.map((post, index) => {
                    const imageurl = post.picture ? `${API}/post/${post._id}/picture` : "https://cdn.pixabay.com/photo/2022/12/01/00/13/antique-7627999_960_720.jpg";
                    return (
                        <PostCard imageurl={imageurl} post={post} index={index} url={`post/${post._id}`}/>
                    );
                })}
                <div>
                    {pageNumber > 1 && 
                        <div className="d-inline">
                            <button className="btn text-white" style={{backgroundColor: "#FF5733", border: "none"}} onClick={
                                    () => {
                                        pageNumber--;
                                        setPageNumber(pageNumber);
                                    }
                                }>
                                    Back
                            </button>
                            &nbsp;
                            <button className="btn text-white" style={{backgroundColor: "#FF5733", border: "none"}} onClick={
                                    () => {
                                        pageNumber = 1;
                                        setPageNumber(pageNumber);
                                    }
                                }>
                                    Home
                            </button>
                        </div>
                    }
                    &nbsp;
                    {posts.length > 0 &&
                    <button className="btn text-light bg-dark" style={{border: "none"}} onClick={
                            () => {
                                pageNumber++;
                                setPageNumber(pageNumber)
                            }
                        }>
                            More posts
                    </button>
                    }
                </div>
            </div>
        );
    }

    
}

export default AllPosts;