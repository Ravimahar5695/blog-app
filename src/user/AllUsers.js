import Menu from "../core/Menu";
import Footer from "../core/Footer";
import {useState, useEffect} from "react";
import {getAllUsers} from "./helper/userapicalls";
import {Link} from "react-router-dom";

const AllUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((data) => {
            if(data.error){
                console.log(data.error);
            } else{
                setUsers(data);
            }
        })
    }, [])

    return (
        <div>
            <Menu/>
            <div className="container">
                <h1 className="text-center mb-4">All Authors</h1>
                <ul>
                    {users &&
                        users.map((user, index) => {
                            return <Link className="list-group-item text-primary" to={`/user/${user._id}/posts`}>{user.name}</Link>
                        })
                    }
                </ul>
            </div>
            <Footer/>
        </div>
    );
}

export default AllUsers;