import express from "express";


import authRoutes from "./authRoutes.js";

import messageRoutes from "./messageRoutes.js";

import userRoutes from "./userRoutes.js";

import conversationRoutes from "./conversationRoutes.js";



const router = express.Router();




// ================================
// AUTH ROUTES
// ================================


router.use(

    "/auth",

    authRoutes

);





// ================================
// MESSAGE ROUTES
// ================================


router.use(

    "/messages",

    messageRoutes

);





// ================================
// USER ROUTES
// ================================


router.use(

    "/users",

    userRoutes

);





// ================================
// CONVERSATION ROUTES
// ================================


router.use(

    "/conversations",

    conversationRoutes

);


router.get(
    "/route-test",
    (req, res) => {

        res.json({

            success: true,

            message: "Index route working"

        });

    }
);


export default router;