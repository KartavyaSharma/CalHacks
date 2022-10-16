import React, { useState } from 'react';
import '../Assets/Styles/onboarding.css';

// Import text field component
import TextField from '../Components/TextField';

import axios from 'axios';

// import logo
import logo from '../Assets/Images/logo-1.png';
import PrimaryButton from '../Components/PrimaryButton';

function CreateAccount() {
    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    async function handleSubmit() {
        console.log(phone, password, confirmPassword);
        const response = await axios.post(
            "http://localhost:3333/auth/create-user",
            {
                phone: phone,
                password: password,
                firstName: firstName
            }
        );
    }

    return (
        <div id='create-account'>
            <div id='create-account-logo'>
                <img src={logo} alt='logo' />
            </div>
            <div>
                <h1>Create an Account</h1>
                <p>Please type your information</p>
            </div>
            <div className='input-field'>
                <TextField name='name' value='' placeholder={"Name (or nickname)"} />
                <TextField name='phone' value='' placeholder={"(123) 456-7890"} type="phone" />
                <TextField name='password' value='' placeholder={"Password"} type="password" />
            </div>

            {/* Checkbox */}
            <div className='checkbox' id='terms-checkbox'>
                <input type='checkbox' />
                <p className='unset-content-align'>By joining I agree to receive texts from My Gut Buddy</p>
            </div>

            <PrimaryButton text
                ="Create Account" action="home" />


            {/* Already have an account? */}
            <div className='anchor-bottom'>
                <p>Already have an account? <a href='/'>Sign In</a></p>
            </div>
        </div>
    );
}

export default CreateAccount;