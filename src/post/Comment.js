import { useState } from "react";
import {addComment} from "./helper/postapicalls";

const Comment = ({post}) => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        comment: "",
        error: "",
        success: false,
        buttonText: "Comment",
        cursor: "pointer"
    });

    const {name, email, comment, error, success, buttonText, cursor} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading...", cursor: "progress"});
        addComment(post._id, {name, email, comment}).then((data) => {
            if(data.error){
                setValues({...values, error: data.error, buttonText: "Comment"});
            } else{
                setValues({...values, error: "", buttonText: "Comment", name: "", email: "", comment: "", success: true});
            }
        });
    }

    const handleError = () => {
        if(error){
            return (
                <div className="alert alert-danger rounded-0">
                    {error}
                </div>
            );
        }
    }

    const commentForm = () => {
        return (
            <form>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control rounded-0" value={name} onChange={handleChange("name")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control rounded-0" value={email} onChange={handleChange("email")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea className="form-control rounded-0" rows="3" value={comment} onChange={handleChange("comment")}></textarea>
                </div>
                <button className="btn btn-primary rounded-0" style={{border: "none", cursor: `${cursor}`}} onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    return (
        <div className="row mt-5">
            <div className="col-lg-6">
            <h2>Add Your Comment</h2>
            {handleError()}
            {commentForm()}
            </div>
        </div>
    );
}

export default Comment;