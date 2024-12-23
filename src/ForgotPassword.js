import NavBar from './Navbar';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword(){

    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem('un');
        if (un !== null) {
            nav('/home');
        }
    }, [nav]);

    const rUsername = useRef();

    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");

    const hUsername = (e) => setUsername(e.target.value);

    const save = (e) => {
        e.preventDefault();

        const auth = getAuth();
        sendPasswordResetEmail(auth, username)
        .then(() => {
            nav("/login");
        })
        .catch((error) => {
            setMsg("Error: " + error);
        });
    }


    return(
        <>
            <center>
                <NavBar/>
                <h1>Forgot Password</h1>
                <form onSubmit={save} >
                    <input 
                    type="email" 
                    placeholder="Enter you registered Email!!" 
                    ref={rUsername} onChange={hUsername} 
                    value={username} 
                    />

                    <br/><br/>

                    <input type="submit" value="Reset Password" />

                </form>
                <h2>{msg}</h2>
            </center>
        </>
    );
}
export default ForgotPassword;