import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { registerUser } from "../services/authService";



const Register = () => {


    const navigate = useNavigate();



    const [form, setForm] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: ""

    });



    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);






    const handleSubmit = async (e) => {


        e.preventDefault();


        setError("");

        setSuccess("");




        if (form.password !== form.confirmPassword) {


            setError(
                "Passwords do not match"
            );


            return;


        }




        setLoading(true);




        try {


            const response = await registerUser({

                name: form.name,

                email: form.email,

                password: form.password

            });





            console.log(
                "REGISTER RESPONSE:",
                response.data
            );




            setSuccess(

                "Registration successful. Redirecting to login..."

            );





            setTimeout(() => {


                navigate("/login");


            }, 1500);





        }


        catch (err) {


            console.error(

                "Register Error:",

                err.response?.data || err.message

            );



            setError(

                err.response?.data?.message ||

                "Registration failed"

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
                    Create Account
                </h2>




                <p style={styles.subtitle}>
                    Join our messaging community
                </p>





                {
                    error &&

                    <div style={styles.error}>

                        {error}

                    </div>

                }




                {
                    success &&

                    <div style={styles.success}>

                        {success}

                    </div>

                }






                <form onSubmit={handleSubmit}>


                    <label style={styles.label}>
                        Name
                    </label>



                    <input

                        style={styles.input}

                        placeholder="Enter your name"

                        value={form.name}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                name: e.target.value

                            })

                        }

                        required

                    />







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

                        placeholder="Create password"

                        value={form.password}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                password: e.target.value

                            })

                        }

                        required

                    />







                    <label style={styles.label}>
                        Confirm Password
                    </label>




                    <input

                        style={styles.input}

                        type="password"

                        placeholder="Confirm password"

                        value={form.confirmPassword}

                        onChange={(e) =>

                            setForm({

                                ...form,

                                confirmPassword: e.target.value

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

                                "Creating..."

                                :

                                "Create Account"

                        }



                    </button>




                </form>






                <p style={styles.footer}>


                    Already have an account?


                    {" "}



                    <Link

                        to="/login"

                        style={styles.link}

                    >

                        Login

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
            "linear-gradient(135deg,#7c3aed,#2563eb)"

    },





    card: {


        width: "420px",

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

        fontWeight: "500"


    },





    input: {


        width: "100%",

        padding: "14px",

        marginBottom: "18px",

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

        marginBottom: "15px"


    },





    success: {


        background: "#dcfce7",

        color: "#166534",

        padding: "10px",

        borderRadius: "8px",

        marginBottom: "15px"


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




export default Register;