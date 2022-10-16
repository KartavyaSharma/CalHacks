import React, { useState } from 'react';
import '../Assets/Styles/onboarding.css';

// Import text field component
import TextField from '../Components/TextField';
import inputField from '../Components/inputField';
import axios from 'axios';

import logo from '../Assets/Images/logo-1.png';
import mascot from '../Assets/Images/mascot.png';
import PrimaryButton from '../Components/PrimaryButton';

function LogIn() {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    async function handleClick(e) {
        try {
            const response = await axios.post(
                "http://localhost:3333/auth/login",
                {
                    phone: phone,
                    password: password
                }
            );
            localStorage.setItem("token", response.data.payload.token);
        } catch (err) {
            return err.response;
        }
    }

    return (
        <div id='login'>
            <div id='create-account-logo'>
                <img src={logo} alt='logo' />
            </div>

            <img id='login-mascot' src={mascot} alt='Gut Buddy Mascot' />

            <div>
                <h1>Log In</h1>
                <p>Please type your information</p>
            </div>
            <div className='input-field'>
                <inputField name='phone' onChange={handlePhoneChange} value='' placeholder={"(123) 456-7890"} type="phone" />
                <inputField name='password' onChange={handlePasswordChange} value='' placeholder={"Password"} type="password" />
            </div>

            <PrimaryButton text
                ="Log In" onClick={handleClick}/>

            {/* Already have an account? */}
            <div className='anchor-bottom'>
                <p>New User? <a href='createaccount'>Create an Account</a></p>
            </div>
        </div>
    );
}

export default LogIn;