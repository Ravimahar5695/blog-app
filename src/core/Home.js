import Menu from "./Menu";
import Footer from "./Footer";
import AllPosts from "../post/AllPosts";
import {getAllCategories} from "../category/helper/categoryapicalls";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../user/helper/userapicalls";


const Home = () => {

    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setUsers(data);
            }
        });
        getAllCategories().then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setCategories(data);
            }
        });
    }, []);

    const showCategories = () => {
        return (
            categories.map((category, index) => {
                if(index < 5){
                    return <Link className="list-group-item" to={`/category/${category._id}/posts`} key={index}>{category.name}</Link>
                }
            })
        );
    }

    const showUsers = () => {
        return (
            users.map((user, index) => {
                if(index < 5){
                    return <Link className="list-group-item" to={`/user/${user._id}/posts`} key={index}>{user.name}</Link>
                }
            })
        );
    }

    return (
        <div className="fluid-container">
            <Menu/>
            <AllPosts/>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header text-light bg-danger rounded-0">
                            <b>Categories</b>
                        </div>
                        <ul className="list-group list-group-flush">
                            {showCategories()}
                            <Link className="list-group-item" to="/categories">More Categories...</Link>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header text-light bg-danger rounded-0">
                            <b>Authors</b>
                        </div>
                        <ul className="list-group list-group-flush">
                            {showUsers()}
                            <Link className="list-group-item" to="/authors">More Authors...</Link>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header text-light bg-danger rounded-0">
                            <b>Authors</b>
                        </div>
                        <ul className="list-group list-group-flush">
                            {showUsers()}
                            <Link className="list-group-item" to="/authors">More Authors...</Link>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;