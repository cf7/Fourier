/**
 * @jest-environment jsdom
*/
import React from 'react';
// import renderer from 'react-test-renderer';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import axios from 'axios';
// import jest from 'jest';

configure({ adapter: new Adapter() });


import App from '../App.js';


describe("App", () => {
  it("renders without crashing", () => {
    mount(<App />);
  });

  it("renders progress bar on submit", () => {
    const wrapper = mount(<App />);
    wrapper.find('input.submit-btn').simulate('click');
    expect(wrapper.exists('div.show-progress')).toBe(true);
    wrapper.unmount();
  });

  // it("renders display panel after receiving request data", async () => {
  //   jest.mock('axios');
  //   axios.post.mockImplementation(() => Promise.resolve({ data: "test data" }));
  //   const wrapper = mount(<App />);
  //   expect(wrapper.state('submitted')).toBe(false);
  //   await wrapper.find('input.submit-btn').simulate('click');
  //   expect(wrapper.state('submitted')).toBe(true);
  //   expect(wrapper.exists('div.show-progress')).toBe(true);
  //   wrapper.unmount();
  // });

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
  -enzyme wrapper.simulate() is wrapper around ReactTestUtils.Simulate, uses React synthetic events

  React wraps native browser events in its own SyntheticEvent to maintain consistency across browsers

  Only enzyme wrappers are internally wrapped with act() calls, if calling same functions on returned
  elements (i.e. let submitBtn = wrapper.find('#submit-btn'); submitBtn.simulate('click'); <-- ) then 
  need to wrap in act()
*/