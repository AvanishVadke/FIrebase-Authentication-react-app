import NavBar from './Navbar';
import { useRef, useEffect, useState } from 'react';
import app from './Firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

function SignUp() {
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem('un');
        if (un !== null) {
            nav('/home');
        }
    }, [nav]);

    const rUsername = useRef("");
    const rPassword1 = useRef("");
    const rPassword2 = useRef("");

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [msg, setMsg] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const hUsername = (e) => setUsername(e.target.value);
    const hPassword1 = (e) => setPassword1(e.target.value);
    const hPassword2 = (e) => setPassword2(e.target.value);

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password);

    const save = (e) => {
        e.preventDefault();

        if (!validateEmail(username)) {
            alert("Invalid email format. Please use a valid email address.");
            setMsg("");
            rUsername.current.focus();
            return;
        }

        if (!validatePassword(password1)) {
            alert(
                "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
            setMsg("");
            setPassword1('');
            setPassword2('');
            rPassword1.current.focus();
            return;
        }

        if (password1 !== password2) {
            alert("Passwords do not match.");
            setMsg("");
            setPassword1('');
            setPassword2('');
            rPassword1.current.focus();
            return;
        }

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, username, password1)
            .then(() => {
                nav("/login");
            })
            .catch((err) => {
                setMsg("Error: " + err.message);
            });
    };

    return (
        <div className="signup-page">
            <NavBar />
            <form className="signup-form" onSubmit={save}>
                <h1>Sign Up</h1>

                <label>
                    Email:
                    <input
                        type="email"
                        ref={rUsername}
                        value={username}
                        onChange={hUsername}
                        placeholder="Enter your Email"
                        required
                    />
                </label>

                <label>
                    Password:
                    <div className="password-container">
                        <input
                            type={showPassword1 ? "text" : "password"}
                            ref={rPassword1}
                            value={password1}
                            onChange={hPassword1}
                            placeholder="Enter your Password"
                            required
                        />
                        <span onClick={() => setShowPassword1(!showPassword1)}>
                            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </label>

                <label>
                    Confirm Password:
                    <div className="password-container">
                        <input
                            type={showPassword2 ? "text" : "password"}
                            ref={rPassword2}
                            value={password2}
                            onChange={hPassword2}
                            placeholder="Confirm your Password"
                            required
                        />
                        <span onClick={() => setShowPassword2(!showPassword2)}>
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </label>

                <button type="submit">Sign Up</button>
                <p className="message">{msg}</p>
            </form>
        </div>
    );
}

export default SignUp;
