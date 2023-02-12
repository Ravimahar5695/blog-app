import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { isAuthenticated } from "../auth/helper/authapicalls";
import { deleteContactRequest, getAllContactsRequests } from "./helper/apicalls";
import {useState, useEffect} from "react";
import Menu from "../core/Menu";
import Footer from "../core/Footer";

const ContactRequests = () => {

    const [contactRequests, setContactRequests] = useState([]);

    const role = secureLocalStorage.getItem("role");

    const {userId, token} = isAuthenticated();

    useEffect(() => {
        getAllContactsRequests(userId, token).then((data) => {
            setContactRequests(data);
        });
    });

    if(isAuthenticated() && role === 1){
        return (
            <div>
                <Menu/>
                <div className="container">
                    {contactRequests.map((cr, index) => {
                        return (
                            <ul className="list-group mb-3" key={index}>
                                <li className="list-group-item"><b>Name</b> {cr.name}</li>
                                <li className="list-group-item"><b>Email Address </b><a className="text-decoration-none" href={`mailto: ${cr.email}?subject=Reply from Blog App`}>{cr.email}</a></li>
                                <li className="list-group-item"><b>Message</b> {cr.message}</li>
                                <li className="list-group-item"><button className="btn btn-dark text-white" onClick={() => {
                                    deleteContactRequest(userId, token, cr._id);
                                }}>Delete</button></li>
                            </ul>
                        );
                    })}
                </div>
                <Footer/>
            </div>
        );
    } else{
        return <Navigate to="/"/>
    }
}

export default ContactRequests;