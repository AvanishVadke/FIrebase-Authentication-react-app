import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function About(){
    const nav = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        let un = localStorage.getItem('un');
        if (un !== null) {
            setUsername(un);
        } else {
            nav('/login');
        }
    },[nav]);
    return (
        <>
            <center>
                <NavBar />
                <h1>About {username}</h1>
            </center>
        </>
    );
}
export default About;