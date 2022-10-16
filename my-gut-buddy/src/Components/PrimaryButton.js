import React from 'react';
import '../Assets/Styles/generic.css';

function PrimaryButton(props) {
    // Get the placeholder text, type (optional) from the props
    const { text, action, modifier, f } = props;

    return (
        <button className={'primary-button ' + modifier} onClick={() => f ? f() : window.location.href = action}>{text}</button>
    );
}

export default PrimaryButton;