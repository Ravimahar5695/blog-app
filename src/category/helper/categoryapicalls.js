import {API} from "../../backend";

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}