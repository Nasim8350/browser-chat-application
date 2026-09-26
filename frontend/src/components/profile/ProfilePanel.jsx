import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";



const ProfilePanel = ({
    closeProfile
}) => {


    const { user, logout } = useContext(AuthContext);




    return (

        <div style={styles.overlay}>


            <div style={styles.panel}>


                {/* CLOSE BUTTON */}

                <button

                    onClick={closeProfile}

                    style={styles.close}

                >

                    ✕

                </button>





                {/* PROFILE HEADER */}


                <div style={styles.header}>


                    <div style={styles.avatar}>

                        👤

                    </div>



                    <h2>

                        {user?.name || "User"}

                    </h2>



                    <p style={styles.status}>

                        🟢 Online

                    </p>


                </div>







                {/* ACCOUNT INFORMATION */}


                <div style={styles.section}>


                    <h3>

                        Account

                    </h3>



                    <div style={styles.info}>


                        <span>

                            Name

                        </span>


                        <strong>

                            {user?.name || "User"}

                        </strong>


                    </div>






                    <div style={styles.info}>


                        <span>

                            Email

                        </span>


                        <strong>

                            {user?.email || "No email"}

                        </strong>


                    </div>





                </div>







                {/* ACTIONS */}


                <button

                    style={styles.edit}

                >

                    ✏️ Edit Profile

                </button>





                <button

                    onClick={logout}

                    style={styles.logout}

                >

                    Logout

                </button>




            </div>



        </div>

    );

};






const styles = {


    overlay: {


        position: "fixed",

        top: 0,

        right: 0,

        width: "100%",

        height: "100vh",

        background: "rgba(0,0,0,0.35)",

        display: "flex",

        justifyContent: "flex-end",

        zIndex: 1000


    },






    panel: {


        width: "350px",

        height: "100%",

        background: "#ffffff",

        padding: "30px",

        boxShadow:
            "-5px 0 20px rgba(0,0,0,0.2)"


    },






    close: {


        float: "right",

        border: "none",

        background: "transparent",

        fontSize: "25px",

        cursor: "pointer"


    },






    header: {


        textAlign: "center",

        marginTop: "30px"


    },






    avatar: {


        fontSize: "70px"


    },






    status: {


        color: "green"

    },






    section: {


        marginTop: "40px"


    },






    info: {


        display: "flex",

        justifyContent: "space-between",

        padding: "15px 0",

        borderBottom: "1px solid #eee"


    },






    edit: {


        width: "100%",

        padding: "12px",

        marginTop: "30px",

        border: "none",

        background: "#2563eb",

        color: "white",

        borderRadius: "10px",

        cursor: "pointer"


    },






    logout: {


        width: "100%",

        padding: "12px",

        marginTop: "15px",

        border: "none",

        background: "#ef4444",

        color: "white",

        borderRadius: "10px",

        cursor: "pointer"


    }



};




export default ProfilePanel;