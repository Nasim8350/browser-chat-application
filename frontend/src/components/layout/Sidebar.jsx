// frontend/src/components/layout/Sidebar.jsx


import { useContext } from "react";


import { AuthContext } from "../../context/AuthContext";








const Sidebar = ({

    activeMenu,

    setActiveMenu

}) => {



    const { user, logout } = useContext(AuthContext);









    const menus = [



        {

            id: "chat",

            icon: "💬",

            label: "Messages"

        },






        {

            id: "contacts",

            icon: "👥",

            label: "Contacts"

        },






        {

            id: "profile",

            icon: "👤",

            label: "Profile"

        },






        {

            id: "settings",

            icon: "⚙️",

            label: "Settings"

        }



    ];









    return (



        <aside style={styles.sidebar}>


            {/* LOGO */}


            <div style={styles.logo}>

                💬

            </div>









            {/* MENU */}


            <div style={styles.menu}>


                {


                    menus.map((item) => (


                        <button


                            key={item.id}



                            onClick={() =>


                                setActiveMenu(

                                    item.id

                                )

                            }



                            style={{


                                ...styles.menuButton,



                                background:


                                    activeMenu === item.id


                                        ?


                                        "#2563eb"


                                        :


                                        "transparent",




                                color:


                                    activeMenu === item.id


                                        ?


                                        "white"


                                        :


                                        "#111827"



                            }}


                        >



                            <span style={styles.icon}>


                                {item.icon}


                            </span>







                            <small>


                                {item.label}


                            </small>



                        </button>



                    ))



                }



            </div>









            {/* USER PROFILE */}



            <button


                onClick={() =>


                    setActiveMenu(

                        "profile"

                    )

                }



                style={styles.profileButton}



            >



                <div style={styles.avatar}>


                    {

                        user?.profileImage ?



                            <img


                                src={user.profileImage}


                                alt="profile"


                                style={styles.avatarImage}


                            />


                            :


                            "👤"



                    }



                </div>







                <strong>


                    {


                        user?.name || "User"


                    }



                </strong>



            </button>









            {/* LOGOUT */}



            <button


                onClick={logout}



                style={styles.logout}



            >


                Logout


            </button>






        </aside>



    );



};









const styles = {



    sidebar: {


        width: "90px",


        height: "100vh",


        display: "flex",


        flexDirection: "column",


        alignItems: "center",


        padding: "20px 10px",


        borderRight: "1px solid #e5e7eb",


        background: "#ffffff"



    },







    logo: {


        fontSize: "35px",


        marginBottom: "30px"



    },







    menu: {


        display: "flex",


        flexDirection: "column",


        gap: "15px",


        flex: 1



    },







    menuButton: {


        width: "70px",


        height: "70px",


        border: "none",


        borderRadius: "15px",


        display: "flex",


        flexDirection: "column",


        alignItems: "center",


        justifyContent: "center",


        cursor: "pointer",


        fontSize: "22px"



    },







    icon: {


        fontSize: "22px"



    },







    profileButton: {


        border: "none",


        background: "transparent",


        cursor: "pointer",


        display: "flex",


        flexDirection: "column",


        alignItems: "center",


        fontSize: "14px",


        fontWeight: "600",


        marginBottom: "15px"



    },







    avatar: {


        width: "40px",


        height: "40px",


        borderRadius: "50%",


        display: "flex",


        alignItems: "center",


        justifyContent: "center",


        overflow: "hidden",


        fontSize: "30px"



    },







    avatarImage: {


        width: "100%",


        height: "100%",


        objectFit: "cover"



    },







    logout: {


        border: "none",


        background: "#ef4444",


        color: "white",


        padding: "8px 14px",


        borderRadius: "8px",


        cursor: "pointer",


        fontSize: "12px"



    }



};








export default Sidebar;