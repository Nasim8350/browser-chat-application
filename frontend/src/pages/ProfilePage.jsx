// frontend/src/pages/ProfilePage.jsx


import {

    useEffect,

    useState,

    useContext

} from "react";



import {

    getProfile,

    updateProfile

} from "../services/userService";



import {

    AuthContext

} from "../context/AuthContext";









const ProfilePage = () => {



    const {

        updateUser

    } = useContext(AuthContext);







    const [profile, setProfile] = useState(null);



    const [name, setName] = useState("");

    const [about, setAbout] = useState("");

    const [profileImage, setProfileImage] = useState("");



    const [loading, setLoading] = useState(true);



    const [message, setMessage] = useState("");









    // ===============================
    // LOAD PROFILE
    // ===============================


    useEffect(() => {


        loadProfile();


    }, []);









    const loadProfile = async () => {


        try {



            const response = await getProfile();





            const user = response.data.user;








            setProfile(user);



            setName(

                user.name || ""

            );



            setAbout(

                user.about || ""

            );



            setProfileImage(

                user.profileImage || ""

            );







        }


        catch (error) {



            console.error(

                "Profile load error:",

                error

            );



            setMessage(

                "Failed to load profile"

            );



        }



        finally {


            setLoading(false);


        }



    };











    // ===============================
    // UPDATE PROFILE
    // ===============================


    const handleUpdate = async () => {


        try {



            const response = await updateProfile({



                name,

                about,

                profileImage



            });








            const updatedUser =

                response.data.user;








            setProfile(

                updatedUser

            );








            // UPDATE GLOBAL USER STATE

            updateUser(

                updatedUser

            );








            setMessage(

                "Profile updated successfully"

            );



        }



        catch (error) {



            console.error(

                "Update profile error:",

                error

            );



            setMessage(

                "Update failed"

            );



        }



    };









    if (loading) {



        return (

            <h3>

                Loading...

            </h3>

        );


    }









    return (



        <div style={styles.container}>


            <h2>

                My Profile

            </h2>









            <div style={styles.card}>


                {


                    profileImage ?



                        <img


                            src={profileImage}


                            alt="profile"


                            style={styles.image}


                        />



                        :



                        <div style={styles.placeholder}>

                            👤

                        </div>



                }









                <label>

                    Name

                </label>


                <input


                    value={name}


                    onChange={(e) =>

                        setName(e.target.value)

                    }


                    style={styles.input}


                />









                <label>

                    About

                </label>


                <textarea


                    value={about}


                    onChange={(e) =>

                        setAbout(e.target.value)

                    }


                    style={styles.textarea}


                />









                <label>

                    Profile Image URL

                </label>


                <input


                    value={profileImage}


                    onChange={(e) =>

                        setProfileImage(e.target.value)

                    }


                    style={styles.input}


                />









                <button


                    onClick={handleUpdate}


                    style={styles.button}


                >

                    Save Profile

                </button>









                {

                    message &&


                    <p>

                        {message}

                    </p>


                }



            </div>


        </div>


    );


};









const styles = {


    container: {


        padding: "30px"


    },






    card: {


        width: "400px",


        padding: "25px",


        background: "#ffffff",


        borderRadius: "12px",


        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",


        display: "flex",


        flexDirection: "column",


        gap: "10px"


    },






    image: {


        width: "120px",


        height: "120px",


        borderRadius: "50%",


        objectFit: "cover"


    },






    placeholder: {


        width: "120px",


        height: "120px",


        borderRadius: "50%",


        background: "#ddd",


        display: "flex",


        justifyContent: "center",


        alignItems: "center",


        fontSize: "50px"


    },






    input: {


        padding: "10px",


        borderRadius: "6px",


        border: "1px solid #ccc"


    },






    textarea: {


        padding: "10px",


        height: "80px",


        borderRadius: "6px",


        border: "1px solid #ccc"


    },






    button: {


        marginTop: "15px",


        padding: "12px",


        background: "#2563eb",


        color: "white",


        border: "none",


        borderRadius: "8px",


        cursor: "pointer"


    }



};







export default ProfilePage;