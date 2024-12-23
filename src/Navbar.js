import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';

function NavBar(){
    const [username,setUsername]=useState(null);

    useEffect(()=>{
        let un=localStorage.getItem('un');
        if(un!==null){
            setUsername(un);
        }
    },[]);
    return (
        <>
            <div className='nav'>
                {(username===null) && (<Link to="/">Sign Up</Link>)}
                {(username===null) && (<Link to="/login">Login</Link>)}
                {(username===null) && (<Link to="/fp">Forget Password</Link>)}

                {(username!==null) && (<Link to="/home">Home</Link>)}
                {(username!==null) && (<Link to="/about">About</Link>)}
                {(username!==null) && (<Link to="/cp">Change Password</Link>)}
            </div>
        </>
    );
}

export default NavBar;