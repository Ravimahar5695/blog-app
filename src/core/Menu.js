import {Link, Navigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {isAuthenticated, logout} from "../auth/helper/authapicalls";

const Menu = () => {

    const {userId} = isAuthenticated();

    const role = secureLocalStorage.getItem("role")
    
    return (
        <nav className="navbar navbar-expand-lg pt-5 pb-5 mb-5 bg-success shadow-sm" style={{backgroundColor: "#FF5733"}}>
            <div className="container">
                <Link className="navbar-brand text-light" to="/">
                    <img src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg" alt="Logo" width="35" height="30" className="d-inline-block align-text-top"/>
                    &nbsp;&nbsp;Blog App
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/">Home</Link>
                    </li>
                    {!isAuthenticated() &&
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/login">Login</Link>
                    </li>}
                    {!isAuthenticated() &&
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/register">Register</Link>
                    </li>}
                    {isAuthenticated() &&
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/post/create">Create Post</Link>
                    </li>}
                    {isAuthenticated() && role === 2 &&
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/posts/view">View Posts</Link>
                    </li>}
                    {isAuthenticated() && role === 1 &&
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/admin/posts/view">View Posts</Link>
                    </li>}
                    {isAuthenticated() && role === 1 &&
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/admin/category/create">Create Category</Link>
                        </li>
                    }
                    {isAuthenticated() && role === 1 &&
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/admin/contact-requests">Contact Requests</Link>
                        </li>
                    }
                    {isAuthenticated() &&
                        <li className="nav-link">
                            <div className="dropdown">
                                <button className="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-user"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={`/user/${userId}/profile`}>Profile</Link></li>
                                    <li>
                                        <button className="dropdown-item" style={{cursor: "pointer"}} onClick={
                                            () => {
                                                logout();
                                                window.location.reload();
                                            }}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                             </div>
                        </li>
                    }
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;