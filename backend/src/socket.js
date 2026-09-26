// backend/src/socket.js


import { Server } from "socket.io";



let io = null;







// ===============================
// INITIALIZE SOCKET
// ===============================


export const initSocket = (server) => {



    io = new Server(

        server,

        {


            cors: {


                origin:


                    process.env.FRONTEND_URL ||

                    "http://localhost:5173",




                methods: [


                    "GET",

                    "POST"



                ],




                credentials: true



            }



        }


    );







    return io;



};









// ===============================
// GET SOCKET INSTANCE
// ===============================


export const getIO = () => {



    if (!io) {


        throw new Error(

            "Socket.io not initialized"

        );


    }







    return io;



};