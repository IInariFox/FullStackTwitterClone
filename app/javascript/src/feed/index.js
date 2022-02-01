import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './feed';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Feed />,
        document.body.appendChild(document.createElement('div')),
    )
})