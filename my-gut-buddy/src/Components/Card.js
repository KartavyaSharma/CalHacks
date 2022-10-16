// Text field component

import React from 'react';
import '../Assets/Styles/generic.css';

function Card(props) {
    // Get the placeholder text, type (optional) from the props
    const { size, children } = props;

    return (
        // Input text field with the placeholder text and type (optional)
        // Render a card with different sizes
        <div className={'card-container ' + size}>
            {children}
        </div>
    );
}

export default Card;