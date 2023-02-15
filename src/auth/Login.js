import {isAuthenticated, login} from "./helper/authapicalls";
import {useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const Login = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        buttonText: "Login",
        cursor: "pointer",
        submitButtonClass: "btn text-light btn-dark w-100",
        spinnerClass: ""
    });

    const {email, password, error, success, buttonText, cursor, submitButtonClass, spinnerClass} = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, [name]: event.target.value});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading...", cursor: "progress", spinnerClass: "spinner-border spinner-border-sm"});
        login({email, password}).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Login", error: data.error, submitButtonClass: "btn text-light btn-danger w-100"});
            } else{
                setValues({...values, buttonText: "Login", error: "", success: true, email: "", password: "", submitButtonClass: "btn text-light btn-success w-100"});
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user._id);
                secureLocalStorage.setItem("role", data.user.role);
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
                <Navigate to="/"/>
            );
        }
    }

    const loginForm = () => {
        return (
            <form>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={email} onChange={handleChange("email")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={handleChange("password")}/>
                </div>
                <button type="button" className={submitButtonClass} style={{border: "none", cursor: `${cursor}`}} onClick={handleSubmit}>{buttonText} <span className={spinnerClass} role="status" aria-hidden="true"></span></button>
            </form>
        );
    }

    if(isAuthenticated()){
        return <Navigate to="/"/>
    } else{
        return (
            <div>
                <div className="shadow p-5 login-container">
                    <button className="btn btn-dark rounded-circle" onClick={() => {navigate(-1)}}><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 className="text-center mb-4">Login</h2>
                    {handleError()}
                    {handleSuccess()}
                    {loginForm()}
                    <p>Don't have account? <Link to="/register" className="text-decoration-none">Register now</Link></p>
                </div>
            </div>
        );
    }
}

export default Login;