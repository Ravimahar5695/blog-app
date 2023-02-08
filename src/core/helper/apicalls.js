import {API} from "../../backend";

export const contact = (contact) => {
    return fetch(`${API}/contact`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const getAllContactsRequests = (userId, token) => {
    return fetch(`${API}/user/${userId}/contacts`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

export const deleteContactRequest = (userId, token, contactRequestId) => {
    return fetch(`${API}/user/${userId}/contact/${contactRequestId}/delete`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}