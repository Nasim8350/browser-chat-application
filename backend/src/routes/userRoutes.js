// backend/src/routes/userRoutes.js


import express from "express";


import auth from "../middleware/auth.js";


import {


    getUsers,

    getProfile,

    updateProfile



} from "../controllers/userController.js";



const router = express.Router();









// ================================
// GET CURRENT USER PROFILE
// ================================


router.get(

    "/me",

    auth,

    getProfile

);









// ================================
// GET PROFILE
// ================================


router.get(

    "/profile",

    auth,

    getProfile

);









// ================================
// UPDATE PROFILE
// ================================


router.put(

    "/profile",

    auth,

    updateProfile

);









// ================================
// GET ALL USERS
// ================================


router.get(

    "/",

    auth,

    getUsers

);







router.get(
    "/test",
    (req, res) => {

        res.json({

            success: true,

            message: "User route working"

        });

    }
);
export default router;