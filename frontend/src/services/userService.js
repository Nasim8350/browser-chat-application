// frontend/src/services/userService.js


import API from "./api";









// ===============================
// GET ALL USERS
// ===============================


export const getUsers = () => {


    return API.get(

        "/users"

    );


};











// ===============================
// GET MY PROFILE
// ===============================


export const getProfile = () => {


    return API.get(

        "/users/profile"

    );


};











// ===============================
// UPDATE PROFILE
// ===============================


export const updateProfile = (data) => {


    return API.put(

        "/users/profile",

        data

    );


};