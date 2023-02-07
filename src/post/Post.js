import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import { getPost } from "./helper/postapicalls";
import {API} from "../backend";
import Footer from "../core/Footer";
import Menu from "../core/Menu";
import parse from 'html-react-parser';
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon} from "react-share";
import Comment from "./Comment";
import _ from "lodash";
import commentImg from "../comment.png";
import { adminDeleteComment } from "../admin/helper/adminapicalls";
import { isAuthenticated } from "../auth/helper/authapicalls";
import secureLocalStorage from "react-secure-storage"

const Post = () => {

    let {postId} = useParams();
    const {userId, token} = isAuthenticated();
    const role = secureLocalStorage.getItem("role");

    const [post, setPost] = useState({});
    const [category, setCategory] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        getPost(postId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setPost(data);
                setCategory(data.category);
                setUser(data.user);
            }
        });
    });
    const imageurl = post.picture ? `${API}/post/${post._id}/picture` : "https://cdn.pixabay.com/photo/2022/12/01/00/13/antique-7627999_960_720.jpg";
    return (
        <div className="container">
            <Menu/>
            <img src={imageurl} className="mb-5" style={{height: "400px", width: "100%"}}/>
            <div>
                <Link to={`/category/${category._id}/posts`} target="_blank"><small className="text-muted badge bg-light">{category.name}</small></Link>&nbsp;
                <Link to={`/user/${user._id}/posts`} target="_blank"><small className="text-muted badge bg-light">{user.name}</small></Link>
            </div>
            <h1 className="mt-3 mb-4 text-dark">{post.title}</h1>
            {parse(`<div>${post.description}</div>`)}
            <div className="mb-3">
                <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={36} />
                </FacebookShareButton>
                <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={36} />
                </WhatsappShareButton>
                <TelegramShareButton url={window.location.href}>
                    <TelegramIcon size={36} />
                </TelegramShareButton>
                <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon size={36}/>
                </LinkedinShareButton>
                <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={36}/>
                </TwitterShareButton>
            </div>
            <Comment post={post}/>
            {
                post.comments && 
                <ul className="list-group list-group-flush mt-5">
                    <h4>Comments</h4>
                    {
                        post.comments.map((value, index) => {
                            return (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-1">
                                            <img src={commentImg} width="50px" height="50px" className="rounded-circle" style={{position: "relative", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}/>
                                        </div>
                                        <div className="col-lg-10">
                                            <h5 className="text-dark">{_.capitalize(value.name)}</h5>
                                            <small><a href={`mailto:${value.email}`} style={{color: "#333333", textDecoration: "none"}}>{value.email}</a></small>
                                            <p>{value.comment}</p>
                                        </div>
                                        <div className="col-lg-1">
                                            {
                                                isAuthenticated() && role === 1 &&
                                                <i className="fa-solid fa-trash text-dark" style={{cursor: "pointer"}} onClick={() => {
                                                    adminDeleteComment(userId, token, post._id, value.uniqId);
                                                }}></i>
                                            }
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            }
            <Footer/>
        </div>
    );
}

export default Post;