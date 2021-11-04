/**
 * @jest-environment jsdom
*/

import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import App from '../App.js';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// smoke tests

describe("App", () => {
  it("App renders without crashing", () => {
    mount(<App />);
  });

  it("App highlights Editor on link mouse over", () => {
    const wrapper = mount(<App />);
    // wrapper.find('button').simulate('hover');

    wrapper.unmount();
  });
});
/*

  Enzyme
  -provides access to component internals
  -makes tests brittle (ex: changing prop name breaks test)
  -access to state and props
  -distinction between shallow and deep DOM rendering
  -allows mocking

  React-Test-Library
  -does not provide access to component internals
  -deep (full) DOM render every time
  -less brittle because tests functionality, not state or props
  -simulates user perspective upon render

  Notes:
  - if tests are slow, because jest is searching entire directory, specify dir to speed up
*/