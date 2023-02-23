import {useState, useEffect} from "react";
import { getAllPosts } from "./helper/postapicalls";
import {API} from "../backend";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";

const AllPosts = () => {

    var [pageNumber, setPageNumber] = useState(1);

    const [posts, setPosts] = useState([]);

    const loadPosts = () => {
        getAllPosts(pageNumber, 9).then((data) => {
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
            <div className="container mt-4 mb-4">
                <h1 className="text-center">No more posts</h1>
                {pageNumber > 1 &&
                    <div>
                        <button className="btn btn-secondary px-4 py-2 rounded-0" style={{border: "none"}} onClick={
                                () => {
                                    pageNumber--;
                                    setPageNumber(pageNumber);
                                }
                            }>
                                <i class="fa-solid fa-angle-left"></i> Back
                        </button>
                        &nbsp;
                        <button className="btn btn-primary px-4 py-2 rounded-0" style={{border: "none"}} onClick={
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
            <div className="mb-5">
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                    {posts.map((post, index) => {
                        const imageurl = post.picture ? `${API}/post/${post._id}/picture` : "https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543_960_720.png";
                        return (
                            <PostCard imageurl={imageurl} post={post} index={index} url={`post/${post._id}`}/>
                        );
                    })}
                </div>

                <div className="d-flex justify-content-center">
                    {pageNumber > 1 && 
                        <div>
                            <button className="btn text-light btn-secondary px-4 py-2 rounded-0" style={{border: "none"}} onClick={
                                    () => {
                                        pageNumber--;
                                        setPageNumber(pageNumber);
                                    }
                                }>
                                    <i class="fa-solid fa-angle-left"></i> Back
                            </button>
                            &nbsp;
                            <button className="btn text-light btn-primary px-4 py-2 rounded-0" style={{border: "none"}} onClick={
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
                    <button className="btn text-light bg-primary rounded-0 px-3 py-2 d-inline-block" style={{border: "none", alignItems: "center"}} onClick={
                            () => {
                                pageNumber++;
                                setPageNumber(pageNumber)
                            }
                        }>
                            More posts <i class="fa-solid fa-angle-right"></i>
                    </button>
                    }
                </div>
            </div>
        );
    }

    
}

export default AllPosts;