import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import { getUser } from "./helper/userapicalls";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
import { isAuthenticated } from "../auth/helper/authapicalls";
import { API } from "../backend";
import jwt_decode from "jwt-decode";
import { getPostsByUser } from "../post/helper/postapicalls";

const Profile = () => {

    const [user, setUser] = useState({});
    const [postCount, setPostCount] = useState();

    const {userId} = useParams();

    useEffect(() => {
        getUser(userId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setUser(data);
            }
        });
        getPostsByUser(userId).then((data) => {
            setPostCount(data.length)
        })
    }, []);

    const profilePictureUrl = () => {
        if(user.profile){
            if(user.profile.profile_picture){
                return `${API}/user/${userId}/picture`
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
                <div className="row">
                    <div className="col-md-4 p-3">
                        <img className="img-fluid" src={pictureUrl}/>
                    </div>
                    <div className="col-md-6 p-3">
                        <h3>{user.name}</h3>
                        {
                            user.profile && user.profile.bio && <p>{user.profile.bio}</p>
                        }
                        <button type="button" class="btn btn-primary">
                            Posts <span class="badge text-bg-secondary">{postCount}</span>
                        </button><br/><br/>
                        <span className="btn btn-sm btn-success"><a href={`mailto:${user.email}`} className="text-light text-decoration-none">{user.email} <span class="badge text-bg-secondary"><i class="fa-solid fa-envelope"></i></span></a></span><br/><br/>
                        {
                            user.profile && user.profile.mobile && <span className="badge bg-success"><a href={`tel:${user.profile.mobile}`} className="text-light text-decoration-none">{user.profile.mobile} <span class="badge text-bg-secondary"><i class="fa-solid fa-phone"></i></span></a></span>
                        }
                        <br/>
                        <br/>
                        {
                            user.profile && user.profile.social && user.profile.social.facebook && <a href={user.profile.social.facebook} className="text-primary p-2"><i className="fa-brands fa-facebook"></i></a>
                        }
                        {
                            user.profile && user.profile.social && user.profile.social.instagram && <a href={user.profile.social.instagram} className="text-danger p-2"><i className="fa-brands fa-square-instagram"></i></a>
                        }
                        {
                            user.profile && user.profile.social && user.profile.social.twitter && <a href={user.profile.social.twitter} className="text-info p-2"><i className="fa-brands fa-twitter"></i></a>
                        }
                        {
                            user.profile && user.profile.social && user.profile.social.linkedin && <a href={user.profile.social.linkedin} className="text-primary p-2"><i className="fa-brands fa-linkedin"></i></a>
                        }
                        {
                            user.profile && user.profile.social && user.profile.social.youtube && <a href={user.profile.social.youtube} className="text-danger p-2"><i className="fa-brands fa-youtube"></i></a>
                        }
                        {
                            user.profile && user.profile.social && user.profile.social.website && <a href={user.profile.social.website} className="text-secondary p-2"><i className="fa-solid fa-globe"></i></a>
                        }
                    </div>
                    {isAuthenticated() && jwt_decode(isAuthenticated().token)._id == userId &&
                        <div className="col-md-2 p-3">
                            <Link to={`/user/${isAuthenticated().userId}/profile/edit`} className="btn btn-dark px-3">Edit</Link>
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;