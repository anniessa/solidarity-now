import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Solidarity Now! is an application that aggregates and amplifies different requests and offers of mutual aid and other acts of solidarity.</p>

        <p>Technologies used</p>
      </div>
    </div>
  );
}

export default AboutPage;
