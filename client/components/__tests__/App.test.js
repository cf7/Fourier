/**
 * @jest-environment jsdom
*/

import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import App from '../App.js';

test("App renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});