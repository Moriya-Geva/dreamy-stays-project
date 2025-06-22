import axios from "axios";

const baseUrl = "http://localhost:3001";

// Get all apartments
export const getApartment = () => {
    return axios.get(`${baseUrl}/apartment`);
}

// Get apartments filtered by parameters (expects an object)
export const getByFilters = (filters) => {
    return axios.get(`${baseUrl}/apartment/getByFilters/`, { params: filters });
}

// Get all cities
export const getCities = () => {
    return axios.get(`${baseUrl}/city`);
}

// Get all categories
export const getCategories = () => {
    return axios.get(`${baseUrl}/category`);
}

// Update an apartment by id
export const updateApartment = (id, data) => {
    return axios.put(`${baseUrl}/apartment/${id}`, data);
}

// Get apartment details by id
export const getByIdAp = (id) => {
    return axios.get(`${baseUrl}/apartment/${id}`);
}

// Register a new advertiser (user)
export const registerAdvertiser = (advertiserData) => {
    return axios.post(`${baseUrl}/advertiser/register`, advertiserData);
}

// Login for advertiser (user)
export const login = (credentials) => {
    return axios.post(`${baseUrl}/advertiser/login`, credentials);
}

// Add a new apartment, requires auth token
export const addApartment = (data, token) => {
    return axios.post(`${baseUrl}/apartment`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// Add a new category
export const addCategory = (category) => {
    return axios.post(`${baseUrl}/category`, category);
}

// Add a new city
export const addCity = (city) => {
    return axios.post(`${baseUrl}/city`, city);
}

// Get apartments added by the logged-in advertiser, needs auth token
export const getApartmentByAdvertiser = (token) => {
    return axios.get(`${baseUrl}/apartment/getByAdvertiser`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// Remove an apartment by id, uses token from localStorage
export const removeApartment = (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${baseUrl}/apartment/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
