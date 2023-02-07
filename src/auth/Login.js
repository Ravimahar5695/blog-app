import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {isAuthenticated, login} from "./helper/authapicalls";
import {useState} from "react";
import { Navigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        buttonText: "Login"
    });

    const {email, password, error, success, buttonText} = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, [name]: event.target.value});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading..."});
        login({email, password}).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Login", error: data.error});
            } else{
                setValues({...values, buttonText: "Login", error: "", success: true, email: "", password: ""});
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
                <button type="button" className="btn text-light bg-dark w-100" style={{border: "none"}} onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    if(isAuthenticated()){
        return <Navigate to="/"/>
    } else{
        return (
            <div className="container">
                <Menu/>
                <div className="row mb-5">
                    <div className="col-lg-6 offset-lg-3">
                        <h1 className="text-center mb-4">Login</h1>
                        {handleError()}
                        {handleSuccess()}
                        {loginForm()}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Login;