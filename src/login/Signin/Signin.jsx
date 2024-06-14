import React, {useState} from 'react';
import './Signin.css';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Layout from '../../Layout';
import Swal from 'sweetalert2';
import Footer from '../../componentshome/Footer/Footer';




const Signin = () =>{
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [signinMessage, setSigninMessage] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false); // State to handle redirection

    const handelSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
    
            const data = await response.json();
            console.log(data.message); 
    
            if (response.ok) {

                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  });
                setRedirectToHome(true);
                // Signin successful, set the JWT token in localStorage
                localStorage.setItem('jwtToken', data.access_token);
            } else {
                // Signin failed, display the error message
                setSigninMessage(data.message || 'Signin failed');
                console.error('Signin failed:', data.message);
            }
        } catch (error) {
            console.error('Error during signin:', error);
            // Handle errors if needed
        }
    };


    return(
    <div>
        <div className='wrapper'>
            <div className='box'>
                <form className='right-container' onSubmit={handelSubmit}>
                    <div className='container1'>
                        <h2 className='heading'>Sign In</h2>
                        <div className='inputText'>
                            <input value={username} type="text" placeholder='Name' onChange={(e)=> setName(e.target.value)} />
                            <span className='icon'><FontAwesomeIcon icon={faUser} /></span>
                        </div>
                        <div className='inputText'>
                            <input value={password} type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
                            <span className='icon2'><FontAwesomeIcon icon={faEyeSlash} /></span>
                        </div>
                        <button className="btn" onClick={handelSubmit}>Sign In</button>
                    </div>
                </form>
                
                <section className='left-container gradient1'>
                    <p className='text'>Don't have an account? <br></br> 
                    <button className='btn'><Link className='btnText' to={'/signup'}>Sign Up</Link> </button></p>
                </section>
            </div>
        </div>
        {redirectToHome && <Navigate to="/" />}

<Footer/>

</div>
    )
} 

export default Signin;