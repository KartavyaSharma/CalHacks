import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Footer.css';

function Footer() {

  return (
    <div className='connectContainer' id='contact'>
        <div className='footerBar'>
            <div className='footerButtonContainer'>
                <Link to=''> 
                    <button><i class="camera"></i></button>
                </Link>
                <Link to=''>
                <button><i class="home"></i></button>
                </Link>
                <button><i class="personal"></i></button>
                <Link to=''>
                    <button><i class="settings"></i></button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Footer;