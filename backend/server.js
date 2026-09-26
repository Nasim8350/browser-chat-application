// backend/server.js


import dotenv from "dotenv";
import http from "http";


import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/socket.js";



dotenv.config();





const PORT = process.env.PORT || 5000;






// ===============================
// DATABASE
// ===============================


connectDB();









// ===============================
// HTTP SERVER
// ===============================


const server = http.createServer(app);









// ===============================
// INITIALIZE SOCKET
// ===============================


const io = initSocket(server);









// ===============================
// ONLINE USERS
// ===============================


const onlineUsers = new Map();









// ===============================
// SOCKET CONNECTION
// ===============================


io.on(

    "connection",

    (socket) => {


        console.log(

            "User connected:",

            socket.id

        );









        // ===============================
        // JOIN USER ROOM
        // ===============================


        socket.on(

            "join_room",

            (userId) => {



                if (!userId) {


                    console.log(

                        "Missing user id"

                    );


                    return;


                }







                const id = String(userId);







                socket.join(id);







                onlineUsers.set(

                    id,

                    socket.id

                );







                console.log(

                    "User online:",

                    id

                );









                io.emit(

                    "user_online",

                    id

                );








                io.emit(

                    "online_users",

                    Array.from(

                        onlineUsers.keys()

                    )

                );



            }

        );













        // ===============================
        // SEND MESSAGE
        // ===============================


        socket.on(

            "send_message",

            (data) => {



                const {


                    receiverId,

                    message



                } = data;








                if (!receiverId)

                    return;









                io.to(

                    String(receiverId)

                )

                    .emit(

                        "receive_message",

                        {


                            message,


                            senderSocketId:

                                socket.id



                        }

                    );



            }

        );













        // ===============================
        // MESSAGE RECEIVED
        // ===============================


        socket.on(

            "message_received",

            (data) => {



                const {


                    senderId,

                    messageId



                } = data;








                if (!senderId)

                    return;








                io.to(

                    String(senderId)

                )

                    .emit(

                        "message_delivered",

                        {


                            messageId



                        }

                    );



            }

        );













        // ===============================
        // MESSAGE SEEN
        // ===============================


        socket.on(

            "message_seen",

            (data) => {



                const {


                    senderId,

                    messageId



                } = data;








                if (!senderId)

                    return;








                io.to(

                    String(senderId)

                )

                    .emit(

                        "message_seen_update",

                        {


                            messageId



                        }

                    );



            }

        );













        // ===============================
        // TYPING
        // ===============================


        socket.on(

            "typing",

            (data) => {



                const {


                    receiverId,

                    senderName



                } = data;








                if (!receiverId)

                    return;








                socket.to(

                    String(receiverId)

                )

                    .emit(

                        "user_typing",

                        {


                            senderName



                        }

                    );



            }

        );













        // ===============================
        // STOP TYPING
        // ===============================


        socket.on(

            "stop_typing",

            (data) => {



                const {


                    receiverId



                } = data;








                if (!receiverId)

                    return;








                socket.to(

                    String(receiverId)

                )

                    .emit(

                        "user_stop_typing"

                    );



            }

        );













        // ===============================
        // DISCONNECT
        // ===============================


        socket.on(

            "disconnect",

            () => {



                let offlineUser = null;








                for (

                    const [

                        userId,

                        socketId



                    ]

                    of onlineUsers.entries()

                ) {



                    if (socketId === socket.id) {



                        offlineUser = userId;



                        onlineUsers.delete(

                            userId

                        );



                        break;


                    }


                }








                if (offlineUser) {



                    io.emit(

                        "user_offline",

                        offlineUser

                    );







                    io.emit(

                        "online_users",

                        Array.from(

                            onlineUsers.keys()

                        )

                    );







                    console.log(

                        "User offline:",

                        offlineUser

                    );



                }








                console.log(

                    "User disconnected:",

                    socket.id

                );



            }

        );





    }

);











// ===============================
// START SERVER
// ===============================


server.listen(

    PORT,

    () => {


        console.log(

            `Server running on port ${PORT}`

        );


    }

);