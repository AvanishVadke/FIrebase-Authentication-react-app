import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

function Home() {
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

    const lo = (e) => {
        e.preventDefault();
        localStorage.removeItem('un');
        nav('/login');
    }

    return (
        <>
            <center>
                <NavBar />
                <h1>Welcome , {username}</h1>
                <button onClick={lo}>Logout</button>
            </center>
        </>
    );
}

export default Home;