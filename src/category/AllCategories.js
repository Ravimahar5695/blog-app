import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {useState, useEffect} from "react";
import {getAllCategories} from "./helper/categoryapicalls";
import {Link} from "react-router-dom";

const AllCategories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setCategories(data);
            }
        })
    }, [])

    return (
        <div>
            <Menu/>
            <div className="container">
                <h1 className="text-center mb-4">All Categories</h1>
                <ul>
                    {categories &&
                        categories.map((category, index) => {
                            return <Link className="list-group-item text-primary" to={`/category/${category._id}/posts`}>{category.name}</Link>
                        })
                    }
                </ul>
            </div>
            <Footer/>
        </div>
    );
}

export default AllCategories;