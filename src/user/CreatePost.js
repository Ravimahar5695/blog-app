import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/authapicalls";
import {useState, useEffect} from "react";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
import { getAllCategories } from "../category/helper/categoryapicalls";
import { createPost } from "./helper/userapicalls";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CreatePost = () => {

    const editorRef = useRef(null);

    const {userId, token} = isAuthenticated();

    const [values, setValues] = useState({
        picture: "",
        category: "",
        title: "",
        description: "",
        error: "",
        success: false,
        buttonText: "Post",
        categories: "",
        formData: ""
    });

    const {picture, category, title, description, error, success, buttonText, categories, formData} = values;

    useEffect(() => {
        getAllCategories().then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            } else{
                setValues({...values, categories: data, formData: new FormData()});
            }
        });
    }, []);
    const handleChange = (name) => (event) => {
        let value;
        if(name === "picture"){
            value = event.target.files[0];
        } else if(name === "description"){
            value = editorRef.current.getContent()
        } else{
            value = event.target.value;
        }
        setValues({...values, [name]: value});
        formData.set(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading..."});
        createPost(userId, token, formData).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Post", error: data.error});
            } else{
                setValues({...values, buttonText: "Post", error: "", picture: "", category: "", title: "", description: "", success: true});
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
                    Post created successfully
                </div>
            );
        }
    }

    const createPostForm = () => {
        return (
            <form>
                <div className="mb-3">
                    <label className="form-label">Picture</label>
                    <input type="file" className="form-control" onChange={handleChange("picture")}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" onChange={handleChange("category")}>
                        <option>Select</option>
                        {categories && categories.map((category, index) => {
                            return (
                                <option key={index} value={category._id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange("title")}/>
                </div>
                <div className="mb-3">
                    <Editor onChange={handleChange("description")}
                        apiKey='p4rie46oezhoagg1yviq9am8bcea705jtcpzq3az03gnmkeh'
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor removeformat | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'link image table code | fullscreen help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}/>
                </div>
                <button className="btn text-light w-25 bg-dark" style={{border: "none"}} onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    if(!isAuthenticated()){
        return <Navigate to="/login"/>
    } else{
        return (
            <div className="fluid-container">
                <Menu/>
                <div className="container">
                    <h1 className="text-center mb-4">Create Post</h1>
                    {handleError()}
                    {handleSuccess()}
                    {createPostForm()}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default CreatePost;