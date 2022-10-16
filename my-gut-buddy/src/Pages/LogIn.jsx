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

    const initialFormData = Object.freeze({
        phone: "",
        password: ""
    });

    let phone = "";
    let password = "";  

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleSubmit = (e) => {
        // e.preventDefault()
        console.log(formData);
        try {
            const response = axios.post(
                "http://localhost:3333/auth/login",
                {
                    phone: phone,
                    password: password
                },
            );
            console.log(response);
            localStorage.setItem("token", response.data.payload.token);
        } catch (err) {
            return err.response;
        }
      };

    const handleChange = (e) => {
        updateFormData({
          ...formData,
    
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      };

    return (
        <div
        id='login'>
            <div id='create-account-logo'>
                <img src={logo} alt='logo' />
            </div>

            <img id='login-mascot' src={mascot} alt='Gut Buddy Mascot' />

            <div>
                <h1>Log In</h1>
                <p>Please type your information</p>
            </div>
            <div className='input-field'>
                <input name='phone' onChange={handleChange} value={formData.phone} placeholder={"(123) 456-7890"} type="phone" />
                <input name='password' onChange={handleChange} value={formData.password} placeholder={"Password"} type="password" />
            </div>

            {/* <PrimaryButton text
                ="Log In" clickFunc={handleSubmit}/> */}
            {/* <button className='primary-button login' onClick={handleSubmit}>Log In</button> */}
            <PrimaryButton text
                ="Log In" onClick={handleSubmit} f={handleSubmit}/>

            {/* Already have an account? */}
            <div className='anchor-bottom'>
                <p>New User? <a href='createaccount'>Create an Account</a></p>
            </div>
        </div>
    );
}

export default LogIn;