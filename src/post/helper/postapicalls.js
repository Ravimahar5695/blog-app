import {API} from "../../backend";

export const getAllPosts = (pageNumber, limit) => {
    return fetch(`${API}/posts/${pageNumber}/${limit}`, {
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

export const getPost = (postId) => {
    return fetch(`${API}/post/${postId}`, {
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

export const getPostsByCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}/posts`, {
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

export const getPostsByUser = (userId) => {
    return fetch(`${API}/user/${userId}/posts`, {
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

export const addComment = (postId, comment) => {
    return fetch(`${API}/post/${postId}/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}