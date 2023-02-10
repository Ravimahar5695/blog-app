import Menu from "../core/Menu";
import Footer from "../core/Footer";
import { isAuthenticated } from "../auth/helper/authapicalls";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {createCategory} from "./helper/adminapicalls";

const CreateCategory = () => {

    const role = secureLocalStorage.getItem("role");

    const {userId, token} = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false,
        buttonText: "Create Category",
        cursor: "pointer"
    });

    const {name, error, success, buttonText, cursor} = values;

    const handleChange = (event) => {
        setValues({...values, name: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading...", cursor: "progress"});
        createCategory(userId, token, {name}).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Create Category", error: data.error});
            } else{
                setValues({...values, buttonText: "Create Category", error: "", success: true, name: ""});
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
                    Category created successfully
                </div>
            );
        }
    }
    
    const createCategoryForm = () => {
        return (
            <form>
                <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange}/>
                </div>
                <button className="btn text-light bg-dark" style={{border: "none", cursor: `${cursor}`}} onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    if(isAuthenticated() && role === 1){
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-6 offset-lg-3">
                            <h1 className="text-center mb-4">Create Category</h1>
                            {handleError()}
                            {handleSuccess()}
                            {createCategoryForm()}
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

export default CreateCategory;