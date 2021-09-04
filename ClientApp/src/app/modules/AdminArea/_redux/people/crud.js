import axios from "axios";

export const URL = "/api/admin";

// CREATE =>  POST: add a new person to the server
export function createPerson(person) {
    if (!(person.id > ' '))
        delete person.id
    return axios.post(URL, person);
}

// CREATE =>  POST: add a new person to the server
export function generateToken(params) {
    return axios.get("/api/Client/GenerateToken", {params});
}

// make admin
export function changePersonRole(params) {
    return axios.get("/api/admin/changerole", {params});
}


// READ
export function getAllPeople() {
    return axios.get(URL);
}

export function getPersonById(personId) {

    return axios.get(`${URL}/person/${personId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPeople(queryParams) {
    return axios.get(`${URL}/people`, {params:queryParams?.filter ||{}});
}

// UPDATE => PUT: update the person on the server
export function updatePerson(person) {
    return axios.put(`${URL}`, person);
}

// UPDATE Status
export function updateStatusForPeople(ids, status) {
    return axios.post(`${URL}/updateStatusForPeople`, {
        ids,
        status
    });
}

// DELETE => delete the person from the server
export function deletePerson(personId) {
    return axios.delete(`${URL}/${personId}`);
}

// DELETE People by ids
export function deletePeople(ids) {
    return axios.post(`${URL}/deletePeople`, {ids});
}
