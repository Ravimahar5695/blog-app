import Menu from "../core/Menu";
import Footer from "../core/Footer";
import { API } from "../backend";
import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import { editProfile, getUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper/authapicalls";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";



const EditProfile = () => {

    const [user, setUser] = useState({});
    const [values, setValues] = useState({
        picture: "",
        bio: "",
        mobile: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        youtube: "",
        website: "",
        error: "",
        success: false,
        buttonText: "Save",
        cursor: "pointer",
        formData: new FormData(),
        buttonClass: "btn btn-dark w-50",
        checkBoxClass: "d-none",
        xmarkClass: "d-none",
        spinnerClass: ""
    });

    const {picture, bio, mobile, facebook, instagram, twitter, linkedin, youtube, website, error, success, buttonText, cursor, formData, buttonClass, checkBoxClass, xmarkClass, spinnerClass} = values;

    const {userId} = useParams();
    const {token} = isAuthenticated();

    useEffect(() => {
        getUser(userId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                if(data.profile){
                    setValues({
                        ...values,
                        bio: data.profile.bio,
                        mobile: data.profile.mobile,
                    });
                }
                if(data.profile){
                    if(data.profile.social){
                        setValues({
                            ...values,
                            bio: data.profile.bio,
                            mobile: data.profile.mobile,
                            facebook: data.profile.social.facebook,
                            instagram: data.profile.social.instagram,
                            twitter: data.profile.social.twitter,
                            linkedin: data.profile.social.linkedin,
                            youtube: data.profile.social.youtube,
                            website: data.profile.social.website
                        })
                    }
                }
                setUser(data);
            }
        });
    }, []);

    const handleChange = (name) => (event) => {
        let value;
        if(name === "picture"){
            value = event.target.files[0];
        } else{
            value = event.target.value;
        }
        setValues({...values, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading...", cursor: "progress", spinnerClass: "spinner-border spinner-border-sm"});
        formData.set("picture", picture);
        formData.set("bio", bio);
        formData.set("mobile", mobile);
        formData.set("facebook", facebook);
        formData.set("instagram", instagram);
        formData.set("twitter", twitter);
        formData.set("linkedin", linkedin);
        formData.set("youtube", youtube);
        formData.set("website", website);
        editProfile(userId, token, formData).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Save", buttonClass: "btn btn-danger w-50", checkBoxClass: "d-none", xmarkClass: "d-inline text-danger px-3", error: data.error});
            } else{
                setValues({...values, buttonText: "Saved", buttonClass: "btn btn-success w-50", checkBoxClass: "d-inline text-success px-3", xmarkClass: "d-none", error: "", success: true, bio: "", mobile: "", picture: "", facebook: "", instagram: "", twitter: "", linkedin: "", youtube: "", website: ""});
            }
        })
    }

    const handleError = () => {
        if(error){
            return (
                <div className="alert alert-danger">
                    {error}
                </div>
            );
        }
    }

    const handleSuccess = () => {
        if(success){
            return (
                <div className="alert alert-success">
                    Data saved successfully
                </div>
            );
        }
    }

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

    const updateProfileForm = () => {
        return (
            <form>
                <img src={pictureUrl} className="rounded-circle m-auto d-block" style={{width: "200px", height: "200px"}}/>
                <div className="mb-3">
                    <label className="form-label">Picture</label>
                    <input type="file" name="picture" className="form-control" onChange={handleChange("picture")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea rows="3" name="bio" className="form-control" value={bio} onChange={handleChange("bio")}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="tel" name="mobile" className="form-control" value={mobile} onChange={handleChange("mobile")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Facebook</label>
                    <input type="url" name="facebook" className="form-control" value={facebook} onChange={handleChange("facebook")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Instagram</label>
                    <input type="url" name="instagram" className="form-control" value={instagram} onChange={handleChange("instagram")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Twitter</label>
                    <input type="url" name="twitter" className="form-control" value={twitter} onChange={handleChange("twitter")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Linkedin</label>
                    <input type="url" name="linkedin" className="form-control" value={linkedin} onChange={handleChange("linkedin")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Youtube</label>
                    <input type="url" name="youtube" className="form-control" value={youtube} onChange={handleChange("youtube")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Website</label>
                    <input type="url" name="website" className="form-control" value={website} onChange={handleChange("website")}/>
                </div>
                <button className={buttonClass} style={{cursor: `${cursor}`}} onClick={handleSubmit}>{buttonText} <span className={spinnerClass} role="status" aria-hidden="true"></span></button>
                <span className={checkBoxClass}><i class="fa-solid fa-check"></i></span>
                <span className={xmarkClass}><i class="fa-solid fa-xmark"></i></span>
            </form>
        );
    }

    if(isAuthenticated() && jwt_decode(isAuthenticated().token)._id == userId){
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-6 m-auto">
                            {handleError()}
                            {handleSuccess()}
                            {updateProfileForm()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    } else{
        return <Navigate to="/"/>
    }
}

export default EditProfile;