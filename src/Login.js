
import {useRef, useEffect, useState} from 'react';
import app from './Firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import NavBar from './Navbar';
import { FaEye,FaEyeSlash  } from 'react-icons/fa'; // Import icons

function Login() {
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem('un');
        if (un !== null) {
            nav('/home');
        }
    }, [nav]);

    const rUsername = useRef();
    const rPassword = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState('');
    

    const hUsername = (e) => {
        setUsername(e.target.value);
    };
    const hPassword = (e) => {
        setPassword(e.target.value);
    };

    const save = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, username, password) // Pass `username` and `password` states
            .then((res) => {
                localStorage.setItem('un', username); // Use `username` here
                nav('/home');
            })
            .catch((err) => {
                setMsg("Issue: " + err.message); // Use `err.message` for better error readability
            });
    };

    return (
        <>
            <center>
                <NavBar />
                <h1>Login</h1>
                <form onSubmit={save}>
                <label>
    Username:
    <input
        type="email"
        ref={rUsername}
        value={username}
        onChange={hUsername}
        placeholder="Enter your Email"
        required
    />
</label>
<br /><br />

<label>
    Password:
    <div className="password-container">
        <input
            type={showPassword ? "text" : "password"}
            ref={rPassword}
            value={password}
            onChange={hPassword}
            placeholder="Enter your Password"
            required
        />
        <span
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
    </div>
</label>
<br /><br />
                    <button type="submit">Login</button>
                </form>
                <h3>{msg}</h3>
            </center>
        </>
    );
}

export default Login;
