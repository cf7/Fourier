import React from 'react';
import { Panel } from './Panel.js';

function Title() {
  return <h1>Fourier</h1>
}

export default function App() {
  return (
    <div className='app-view'>
      <Title />
      <Panel />
      <Panel />
    </div>
  );
}