import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {useState} from "react";
import {Link} from "react-router-dom";
import {register} from "./helper/authapicalls";

const Register = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        buttonText: "Register"
    });

    const {name, email, password, error, success, buttonText} = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, [name]: event.target.value});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading..."});
        register({name, email, password}).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Register", error: data.error});
            } else{
                setValues({...values, buttonText: "Register", error: "", success: true, name: "", email: "", password: ""});
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
                    Registered Successfully. Click <Link to="/login" className="text-decoration-none">here</Link> to login
                </div>
            );
        }
    }

    const registerForm = () => {
        return (
            <form>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange("name")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={email} onChange={handleChange("email")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={handleChange("password")}/>
                </div>
                <button type="button" className="btn text-light bg-dark w-100" style={{border: "none"}} onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    return (
        <div className="container">
            <Menu/>
            <div className="row mb-5">
                <div className="col-lg-6 offset-lg-3">
                    <h1 className="text-center mb-4">Register</h1>
                    {handleError()}
                    {handleSuccess()}
                    {registerForm()}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Register;