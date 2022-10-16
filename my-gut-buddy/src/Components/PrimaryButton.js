import React from 'react';
import '../Assets/Styles/generic.css';

function PrimaryButton(props) {
    // Get the placeholder text, type (optional) from the props
    const { text, action, modifier } = props;

    return (
        <button className={'primary-button ' + modifier} onClick={() => window.location.href = action}>{text}</button>
    );
}

export default PrimaryButton;