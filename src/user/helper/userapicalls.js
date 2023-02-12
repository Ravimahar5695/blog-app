import {API} from "../../backend";

export const getAllUsers = () => {
    return fetch(`${API}/users`, {
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

export const getUser = (userId) => {
    return fetch(`${API}/user/${userId}`, {
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

export const createPost = (userId, token, formData) => {
    return fetch(`${API}/user/${userId}/post/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formData
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const deletePost = (userId, token, postId) => {
    return fetch(`${API}/user/${userId}/post/${postId}/delete`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const updatePost = (userId, token, postId, formData) => {
    return fetch(`${API}/user/${userId}/post/${postId}/update`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formData
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const editProfile = (userId, token, formData) => {
    return fetch(`${API}/user/${userId}/profile/edit`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formData
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}