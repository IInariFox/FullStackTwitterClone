import React from 'react';
import ReactDOM from 'react-dom';
import UserFeed from './user';

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('params');
    const data = JSON.parse(node.getAttribute('data-params'));
  
    ReactDOM.render(
      <UserFeed username={data.username} />,
      document.body.appendChild(document.createElement('div')),
    )
})