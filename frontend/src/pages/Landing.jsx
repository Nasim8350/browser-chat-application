import { Link } from "react-router-dom";


const Landing = () => {


    return (

        <div style={styles.page}>


            <nav style={styles.nav}>

                <h2 style={styles.logo}>
                    ChatApp
                </h2>


                <div>

                    <Link
                        to="/login"
                        style={styles.navButton}
                    >
                        Login
                    </Link>


                    <Link
                        to="/register"
                        style={styles.signupButton}
                    >
                        Create Account
                    </Link>

                </div>


            </nav>





            <section style={styles.hero}>


                <div style={styles.content}>


                    <h1 style={styles.title}>

                        Connect.
                        <br />
                        Communicate.
                        <br />
                        Collaborate.

                    </h1>



                    <p style={styles.description}>

                        A modern browser-based messaging
                        system designed for fast,
                        secure and real-time communication.

                    </p>



                    <div style={styles.actions}>


                        <Link

                            to="/login"

                            style={styles.primary}

                        >

                            Start Messaging

                        </Link>




                        <Link

                            to="/register"

                            style={styles.secondary}

                        >

                            Create Account

                        </Link>


                    </div>


                </div>





                <div style={styles.mockup}>


                    <div style={styles.chatHeader}>

                        💬 Chat Application

                    </div>



                    <div style={styles.messageReceived}>

                        Hello 👋

                    </div>



                    <div style={styles.messageSent}>

                        Hi, how are you?

                    </div>



                    <div style={styles.messageReceived}>

                        Welcome to ChatApp

                    </div>


                </div>


            </section>


        </div>

    );

};





const styles = {


    page: {

        minHeight: "100vh",

        background:
            "linear-gradient(135deg,#eff6ff,#eef2ff)",

        color: "#111827"

    },



    nav: {

        height: "80px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "0 70px"

    },



    logo: {

        fontSize: "28px",

        color: "#2563eb"

    },



    navButton: {

        marginRight: "20px",

        textDecoration: "none",

        color: "#2563eb",

        fontWeight: "600"

    },



    signupButton: {

        padding: "12px 22px",

        background: "#2563eb",

        color: "white",

        borderRadius: "10px",

        textDecoration: "none"

    },



    hero: {

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        gap: "80px",

        padding: "80px"

    },



    content: {

        maxWidth: "500px"

    },



    title: {

        fontSize: "56px",

        lineHeight: "1.1",

        marginBottom: "25px"

    },



    description: {

        fontSize: "18px",

        color: "#475569",

        lineHeight: "1.6"

    },



    actions: {

        marginTop: "35px"

    },



    primary: {

        background: "#2563eb",

        color: "white",

        padding: "15px 28px",

        borderRadius: "10px",

        textDecoration: "none",

        marginRight: "15px"

    },



    secondary: {

        border: "2px solid #2563eb",

        color: "#2563eb",

        padding: "13px 25px",

        borderRadius: "10px",

        textDecoration: "none"

    },



    mockup: {

        width: "350px",

        height: "420px",

        background: "white",

        borderRadius: "20px",

        padding: "20px",

        boxShadow:
            "0 20px 50px rgba(0,0,0,0.15)"

    },



    chatHeader: {

        background: "#2563eb",

        color: "white",

        padding: "15px",

        borderRadius: "12px",

        marginBottom: "30px"

    },



    messageReceived: {

        background: "#f1f5f9",

        padding: "12px",

        borderRadius: "15px",

        marginBottom: "15px",

        width: "fit-content"

    },



    messageSent: {

        background: "#2563eb",

        color: "white",

        padding: "12px",

        borderRadius: "15px",

        marginBottom: "15px",

        marginLeft: "auto",

        width: "fit-content"

    }


};



export default Landing;