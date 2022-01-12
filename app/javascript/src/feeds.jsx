import React from 'react'
import ReactDOM from 'react-dom'

import './feeds.scss';

const Feeds = props => (
  <React.Fragment>
    Feeds temp placeholder
  </React.Fragment>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feeds />,
    document.getElementById('feed-root'),
  )
})