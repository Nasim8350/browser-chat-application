// frontend/src/context/AuthContext.jsx


import {

    createContext,

    useState,

    useEffect,

    useRef

} from "react";


import socket from "../socket";





export const AuthContext = createContext();









export const AuthProvider = ({ children }) => {



    const [user, setUser] = useState(


        JSON.parse(

            localStorage.getItem("user")

        )

    );






    const joinedRoom = useRef(false);


    const socketStarted = useRef(false);









    // ===============================
    // SOCKET CONNECTION
    // ===============================


    useEffect(() => {



        if (!user)

            return;







        const userId =

            user._id ||

            user.id;








        if (!userId)

            return;








        const joinRoom = () => {



            if (joinedRoom.current)

                return;







            socket.emit(

                "join_room",

                userId

            );







            joinedRoom.current = true;







            console.log(

                "Socket room joined:",

                userId

            );



        };








        const connectSocket = () => {



            if (!socketStarted.current) {



                socket.connect();


                socketStarted.current = true;


            }







            joinRoom();



        };









        if (socket.connected) {


            joinRoom();


        }

        else {


            connectSocket();


        }








        socket.on(

            "connect",

            () => {



                console.log(

                    "Socket connected:",

                    socket.id

                );





                joinedRoom.current = false;


                joinRoom();



            }

        );








        return () => {


            socket.off(

                "connect"

            );


        };





    }, [user]);















    // ===============================
    // LOGIN
    // ===============================


    const login = (data) => {



        console.log(

            "FULL LOGIN RESPONSE:",

            data

        );







        localStorage.setItem(

            "token",

            data.token

        );







        const loginUser =

            data.user ||

            data.data?.user;








        if (!loginUser) {



            console.log(

                "User object missing"

            );


            return;


        }







        localStorage.setItem(

            "user",

            JSON.stringify(

                loginUser

            )

        );







        joinedRoom.current = false;







        setUser(

            loginUser

        );



    };













    // ===============================
    // UPDATE USER PROFILE
    // ===============================


    const updateUser = (updatedUser) => {



        if (!updatedUser)

            return;








        localStorage.setItem(

            "user",

            JSON.stringify(

                updatedUser

            )

        );








        setUser(

            updatedUser

        );



    };













    // ===============================
    // LOGOUT
    // ===============================


    const logout = () => {



        joinedRoom.current = false;


        socketStarted.current = false;







        socket.disconnect();







        localStorage.removeItem(

            "token"

        );







        localStorage.removeItem(

            "user"

        );







        setUser(null);



    };














    return (



        <AuthContext.Provider



            value={{



                user,


                login,


                logout,


                updateUser



            }}



        >


            {children}


        </AuthContext.Provider>



    );



};