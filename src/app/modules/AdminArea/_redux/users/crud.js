import axios from "axios";

export const URL = "/api/admin";

// CREATE =>  POST: add a new user to the server
export function createUser(user) {
    if (!(user.id > ' '))
        delete user.id
    return axios.post(URL, user);
}

// CREATE =>  POST: add a new user to the server
export function generateToken(params) {
    return axios.get("/api/Client/GenerateToken", {params});
}

// make admin
export function changeUserRole(params) {
    return axios.get("/api/admin/changerole", {params});
}


// READ
export function getAllUsers() {
    return axios.get(URL);
}

export function getUserById(userId) {
    debugger
    return axios.get(`${URL}/user/${userId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUsers(queryParams) {
    return axios.get(`${URL}/users`, {params:queryParams?.filter ||{}});
}

// UPDATE => PUT: update the user on the server
export function updateUser(user) {
    return axios.put(`${URL}`, user);
}

// UPDATE Status
export function updateStatusForUsers(ids, status) {
    return axios.post(`${URL}/updateStatusForUsers`, {
        ids,
        status
    });
}

// DELETE => delete the user from the server
export function deleteUser(userId) {
    return axios.delete(`${URL}/${userId}`);
}

// DELETE Users by ids
export function deleteUsers(ids) {
    return axios.post(`${URL}/deleteUsers`, {ids});
}
