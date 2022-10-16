// Text field component

import React from 'react';
import '../Assets/Styles/generic.css';

function inputField(props) {
    // Get the placeholder text, type (optional) from the props
    // const { placeholder, type, name } = props;

    return (
        // Input text field with the placeholder text and type (optional)
        <input {...props} autoComplete="new-password" />
    );
}

export default inputField;