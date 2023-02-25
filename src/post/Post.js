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

    const imageurl = post.picture ? post.picture.url : "https://cdn.pixabay.com/photo/2015/02/18/10/48/social-media-640543_960_720.png";

    const profilePictureUrl = () => {
        if(user.profile){
            if(user.profile.picture){
                return user.profile.picture.url;
            } else{
                return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
        } else{
            return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        }
    }

    let pictureUrl = profilePictureUrl();

    return (
        <div>
            <Menu/>
            <div className="container">
            <img src={imageurl} className="mb-5" style={{height: "400px", width: "100%"}}/>
            <div>
                <Link to={`/category/${category._id}/posts`}><small className="text-muted badge bg-light">{category.name}</small></Link>&nbsp;
                <Link to={`/user/${user._id}/posts`}><small className="text-muted badge bg-light">{user.name}</small></Link>
                <br/><p className="badge text-secondary">Created on : {post.date}</p>
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
                <div className="card rounded-0" >
                    <div className="card-header bg-light text-dark rounded-0">
                        <b>Author Profile</b>
                    </div>
                    <div className="card-body">
                        <img src={pictureUrl} className="rounded-circle" width="50px" height="50px"/>
                        <h5>{user.name}</h5>
                        {
                            user.profile && user.profile.bio && <p className="card-text">{user.profile.bio}</p>
                        }
                        <Link to={`/user/${user._id}/profile`} className="btn btn-primary rounded-0">View Profile</Link>
                    </div>
                </div>
            

            <Comment post={post}/>
            {
                post.comments &&  post.comments.length > 0 &&
                <ul className="list-group list-group-flush mt-5">
                    <h4>Comments</h4>
                    {
                        post.comments.map((value, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <div className="row">
                                        <div className="col-md-1 d-flex justify-content-start align-items-center">
                                            <img src={commentImg} width="40px" height="40px" className="rounded-circle" />
                                        </div>
                                        <div className="col-md-10">
                                            <h5 className="text-dark">{_.capitalize(value.name)}</h5>
                                            <small><a href={`mailto:${value.email}`} className="text-primary text-decoration-none">{value.email}</a></small>
                                            <p>{value.comment}</p>
                                            <small className="text-secondary">{value.date}</small>
                                        </div>
                                        <div className="col-md-1 d-flex justify-content-start align-items-center">
                                            {
                                                isAuthenticated() && role === 1 &&
                                                <button className="btn btn-danger rounded-0" onClick={() => {
                                                    adminDeleteComment(userId, token, post._id, value.uniqId);
                                                }}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            }
            </div>
            <Footer/>
        </div>
    );
}

export default Post;