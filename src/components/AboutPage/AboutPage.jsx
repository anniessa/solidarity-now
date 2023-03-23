import React from 'react';

import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2 className='title'>Solidarity Now!</h2>
        <p className='about-text'>
        Solidarity Now! is an application that aggregates and 
        amplifies different requests and offers of mutual aid and other acts of solidarity.</p>

        <ul className='title'> Technologies used: </ul>
        <li>React </li>
        <li>Node</li>
        <li>Express </li>
        <li> Material UI</li>

        <p className='title'> Thank you! </p>
        <li>Amethyst Cohort</li>
        <li>Dane, Key, Edan,  Vada, Mary, Kris, Bethany, Christy, Bellamy and all Prime staff and community</li>
        <li>Friends and Family</li>
        <li>Viewers Like You!</li>

        <p className='title'> GitHub </p>
        <li>gitHub.com/anniessa</li>

        <p className='title'> LinkedIn</p>
        <li>linkedin.com/in/anniessa-antar/</li>

      </div>
    </div>
  );
}

export default AboutPage;
