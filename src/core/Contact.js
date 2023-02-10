import {useState} from "react";
import {contact} from "./helper/apicalls";

const Contact = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
        error: "",
        success: false,
        buttonText: "Submit",
        cursor: "pointer"
    });

    const {name, email, message, error, success, buttonText, cursor} = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, [name]: event.target.value});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading...", cursor: "progress"});
        contact({name, email, message}).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Submit", error: data.error});
            } else{
                setValues({...values, buttonText: "Submit", error: "", success: true, name: "", email: "", message: ""});
            }
        });
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
                    Your response is submitted successfully. We will contact you soon.
                </div>
            );
        }
    }

    const contactForm = () => {
        return (
            <form>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Name*" value={name} onChange={handleChange("name")}/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email Address*" value={email} onChange={handleChange("email")}/>
                </div>
                <div className="mb-3">
                    <textarea className="form-control" placeholder="Message*" value={message} onChange={handleChange("message")}></textarea>
                </div>
                <button class="btn btn-warning text-light w-100" style={{cursor: `${cursor}`}} type="submit" onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    return(
        <div style={{marginBottom: "20px", textAlign: "left"}}>
            {handleError()}
            {handleSuccess()}
            {contactForm()}
        </div>
    );
}
export default Contact;