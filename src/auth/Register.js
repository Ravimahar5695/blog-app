import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "./helper/authapicalls";

const Register = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        buttonText: "Register",
        cursor: "pointer",
        submitButtonClass: "btn text-light btn-dark w-100",
        spinnerClass: ""
    });

    const {name, email, password, error, success, buttonText, cursor, submitButtonClass, spinnerClass} = values;

    const handleChange = (name) => {
        return (event) => {
            setValues({...values, [name]: event.target.value});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading...", cursor: "progress", spinnerClass: "spinner-border spinner-border-sm"});
        register({name, email, password}).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Register", error: data.error, submitButtonClass: "btn text-light btn-danger w-100"});
            } else{
                setValues({...values, buttonText: "Register", error: "", success: true, name: "", email: "", password: "", submitButtonClass: "btn text-light btn-success w-100"});
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
                <button type="button" className={submitButtonClass} style={{border: "none", cursor: `${cursor}`}} onClick={handleSubmit}>{buttonText} <span className={spinnerClass} role="status" aria-hidden="true"></span></button>
            </form>
        );
    }

    return (
        <div>
            <div className="shadow p-5 register-container">
                <button className="btn btn-dark rounded-circle" onClick={() => {navigate(-1)}}><i class="fa-solid fa-arrow-left"></i></button>
                <h2 className="text-center mb-4">Register</h2>
                {handleError()}
                {handleSuccess()}
                {registerForm()}
                <p>Already registered? <Link to="/login" className="text-decoration-none">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;