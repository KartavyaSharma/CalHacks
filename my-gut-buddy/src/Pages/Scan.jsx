import React from 'react';
import Webcam from "react-webcam";

import '../Assets/Styles/onboarding.css';
import PrimaryButton from '../Components/PrimaryButton';
import TextField from '../Components/TextField';

function Scan() {

    // Parse URL and get ?scantype= parameter
    const urlParams = new URLSearchParams(window.location.search);
    const scanType = urlParams.get('scantype');

    return (
        <div id='scan'>
            {/* Render two buttons, one for taking a picture, one for typing in the input */}
            <div id='scan-header'>
                <h1>Scan Item</h1>
            </div>

            {/* If no scantype, then render the buttons, otherwise, render the scan picture or scan buttons divs */}

            {
                scanType === null ? (
                    <>
                        <p>Please select an option.</p>
                        <div id='scan-buttons'>
                            <PrimaryButton text="Take Picture" action="?scantype=picture" />
                            <p>or</p>
                            <PrimaryButton text="Type in Item" action="?scantype=item" modifier='light' />
                        </div>

                    </>
                ) : scanType == "picture" ? (
                    <div id='scan-picture'>
                        Picture
                    </div>
                ) : (
                    <div id='scan-item'>
                        <p>Type in item and select from dropdown</p>
                        <TextField name='item' value='' placeholder={"Item"} type="text" autocomplete="true" data="titles.json" />
                        <PrimaryButton text="Submit" action="add-foodlog" />
                    </div>
                )
            }
        </div>
    );
}

export default Scan;