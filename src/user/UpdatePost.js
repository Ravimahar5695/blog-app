import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/authapicalls";
import {useState, useEffect} from "react";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
import { getAllCategories } from "../category/helper/categoryapicalls";
import { updatePost } from "./helper/userapicalls";
import { useParams } from "react-router-dom";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {getPost} from "../post/helper/postapicalls";

const UpdatePost = () => {

    const editorRef = useRef(null);

    const {userId, token} = isAuthenticated();

    const {postId} = useParams();

    const [categories, setCategories] = useState([]);

    const [values, setValues] = useState({
        picture: "",
        category: "",
        title: "",
        description: "",
        error: "",
        success: false,
        buttonText: "Update Post",
        formData: ""
    });

    const {picture, category, title, description, error, success, buttonText, formData} = values;

    useEffect(() => {
        getAllCategories().then((data) => {
            if(data.error){
                console.log(data.error)
            } else{
                setCategories(data);
            }
        });
    }, []);

    useEffect(() => {
        getPost(postId).then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setValues({...values, category: data.category._id, title: data.title, description: data.description, formData: new FormData()});
            }
        });
    }, []);

    const handleChange = (name) => (event) => {
        let value;
        if(name === "picture"){
            value = event.target.files[0];
        } else if(name === "description"){
            value = editorRef.current.getContent();
        } else{
            value = event.target.value;
        }
        setValues({...values, [name]: value});
        formData.set(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: "Loading..."});
        updatePost(userId, token, postId, formData).then((data) => {
            if(data.error){
                setValues({...values, buttonText: "Update Post", error: data.error});
            } else{
                setValues({...values, error: "", buttonText: "Update Post", success: true, title: "", description: ""});
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
                    Post updated successfully
                </div>
            );
        }
    }

    const updatePostForm = () => {
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
                        {categories && categories.map((cat, index) => {
                            return (
                                <option key={index} value={cat._id}>{cat.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange("title")}/>
                </div>
                <div className="mb-3">
                    <Editor 
                        onChange={handleChange("description")} 
                        apiKey='p4rie46oezhoagg1yviq9am8bcea705jtcpzq3az03gnmkeh'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={description}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}/>
                </div>
                <button className="btn text-light bg-dark w-25 mb-5" style={{border: "none"}} onClick={handleSubmit}>{buttonText}</button>
            </form>
        );
    }

    if(!isAuthenticated()){
        return <Navigate to="/login"/>
    } else{
        return (
            <div className="container">
                <Menu/>
                <h1 className="text-center">Update Post</h1>
                {handleError()}
                {handleSuccess()}
                {updatePostForm()}
                <Footer/>
            </div>
        )
    }
}

export default UpdatePost;