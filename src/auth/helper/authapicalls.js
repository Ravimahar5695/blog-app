import {API} from "../../backend";
import secureLocalStorage from "react-secure-storage";

export const register = (user) => {
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}


export const login = (user) => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const isAuthenticated = () => {
    if(localStorage.getItem("token")){
        const user = {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        }
        return user;
    } else{
        return false;
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    secureLocalStorage.removeItem("role");
    
}