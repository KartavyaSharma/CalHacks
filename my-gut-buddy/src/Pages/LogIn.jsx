import React from 'react';
import '../Assets/Styles/onboarding.css';

// Import text field component
import TextField from '../Components/TextField';

import logo from '../Assets/Images/logo-1.png';
import mascot from '../Assets/Images/mascot.png';
import PrimaryButton from '../Components/PrimaryButton';

function LogIn() {
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
                <TextField name='phone' value='' placeholder={"(123) 456-7890"} type="phone" />
                <TextField name='password' value='' placeholder={"Password"} type="password" />
            </div>

            <PrimaryButton text
                ="Log In" action="#log-in" />


            {/* Already have an account? */}
            <div className='anchor-bottom'>
                <p>New User? <a href='create-account'>Create an Account</a></p>
            </div>
        </div>
    );
}

export default LogIn;