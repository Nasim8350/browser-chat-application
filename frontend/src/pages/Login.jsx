import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";


const Login = () => {


    const navigate = useNavigate();

    const { login } = useContext(AuthContext);



    const [form, setForm] = useState({

        email: "",

        password: ""

    });



    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);





    const handleSubmit = async (e) => {


        e.preventDefault();


        setError("");

        setLoading(true);



        try {


            const response = await loginUser(form);



            // DEBUG CHECK

            console.log(
                "LOGIN RESPONSE:",
                response.data
            );



            login(response.data);



            navigate("/dashboard");



        }

        catch (err) {


            console.error(

                "Login Error:",

                err.response?.data || err.message

            );



            setError(

                err.response?.data?.message ||

                "Login failed"

            );


        }

        finally {


            setLoading(false);


        }


    };





    return (


        <div style={styles.page}>


            <div style={styles.card}>


                <h1 style={styles.logo}>
                    ChatApp
                </h1>



                <h2 style={styles.heading}>
                    Welcome Back
                </h2>



                <p style={styles.subtitle}>
                    Login to continue your conversations
                </p>





                {
                    error &&

                    <div style={styles.error}>

                        {error}

                    </div>

                }





                <form onSubmit={handleSubmit}>


                    <label style={styles.label}>
                        Email
                    </label>



                    <input

                        style={styles.input}

                        type="email"

                        placeholder="Enter email"

                        value={form.email}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                email: e.target.value

                            })

                        }

                        required

                    />






                    <label style={styles.label}>
                        Password
                    </label>




                    <input

                        style={styles.input}

                        type="password"

                        placeholder="Enter password"

                        value={form.password}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                password: e.target.value

                            })

                        }

                        required

                    />







                    <button

                        style={styles.button}

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Logging in..."

                                :

                                "Login"

                        }


                    </button>



                </form>







                <p style={styles.footer}>


                    Don't have an account?


                    {" "}


                    <Link

                        to="/register"

                        style={styles.link}

                    >

                        Create Account

                    </Link>



                </p>



            </div>


        </div>


    );

};







const styles = {



    page: {

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
            "linear-gradient(135deg,#1e3a8a,#2563eb)"

    },





    card: {

        width: "400px",

        background: "#ffffff",

        padding: "45px",

        borderRadius: "20px",

        boxShadow:
            "0 20px 50px rgba(0,0,0,0.25)",

        textAlign: "center"

    },





    logo: {

        color: "#2563eb",

        fontSize: "32px",

        marginBottom: "20px"

    },





    heading: {

        fontSize: "28px",

        marginBottom: "10px",

        color: "#111827"

    },





    subtitle: {

        color: "#64748b",

        marginBottom: "30px"

    },





    label: {

        display: "block",

        textAlign: "left",

        marginBottom: "6px",

        fontWeight: "500",

        color: "#374151"

    },





    input: {

        width: "100%",

        padding: "14px",

        marginBottom: "20px",

        border: "1px solid #cbd5e1",

        borderRadius: "10px",

        fontSize: "15px"

    },





    button: {

        width: "100%",

        padding: "14px",

        background: "#2563eb",

        color: "white",

        border: "none",

        borderRadius: "10px",

        fontSize: "16px",

        cursor: "pointer"

    },





    error: {

        background: "#fee2e2",

        color: "#991b1b",

        padding: "10px",

        borderRadius: "8px",

        marginBottom: "20px"

    },





    footer: {

        marginTop: "25px",

        color: "#64748b"

    },





    link: {

        color: "#2563eb",

        fontWeight: "600",

        textDecoration: "none"

    }


};




export default Login;