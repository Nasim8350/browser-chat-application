import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/index.js";


dotenv.config();


const app = express();



// ================================
// CORS CONFIGURATION
// ================================


const corsOptions = {


    origin: [

        "http://localhost:3000",

        "http://localhost:5173"

    ],


    methods: [

        "GET",

        "POST",

        "PUT",

        "PATCH",

        "DELETE"

    ],


    allowedHeaders: [

        "Content-Type",

        "Authorization"

    ],


    credentials: true


};



app.use(cors(corsOptions));




// ================================
// BODY PARSER
// ================================


app.use(express.json());


app.use(
    express.urlencoded({

        extended: true

    })
);




// ================================
// HEALTH CHECK
// ================================


app.get(
    "/api/health",

    (req, res) => {


        res.status(200).json({

            success: true,

            status: "ok",

            message:
                "Chat application API is running"

        });


    }

);




// ================================
// API ROUTES
// ================================


app.use(

    "/api",

    routes

);




// ================================
// 404 HANDLER
// ================================


app.use(

    (req, res) => {


        res.status(404).json({

            success: false,

            message:
                "Route not found"

        });


    }

);




// ================================
// GLOBAL ERROR HANDLER
// ================================


app.use(

    (err, req, res, next) => {


        console.error(

            "ERROR:",

            err

        );



        res.status(

            err.status || 500

        )
            .json({

                success: false,

                message:

                    err.message ||

                    "Internal server error"

            });



    }

);



export default app;