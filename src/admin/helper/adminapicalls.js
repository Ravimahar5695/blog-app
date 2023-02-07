import { API } from "../../backend";

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/user/${userId}/category/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const adminDeletePost = (userId, token, postId) => {
    return fetch(`${API}/admin/user/${userId}/post/${postId}/delete`, {
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

export const adminDeleteComment = (userId, token, postId, commentId) => {
    return fetch(`${API}/admin/user/${userId}/post/${postId}/${commentId}/delete`, {
        method: "PUT",
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