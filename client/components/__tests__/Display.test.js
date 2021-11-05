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



import Display from '../Display.js';

describe("Display", () => {
  it("renders without crashing", () => {
    mount(<Display />);
  });

  describe("Controls", () => {
    it("adjusts font size for displayed text", () => {
      const outputFontSizes = [17, 18, 19, 20];
      const wrapper = mount(<Display outputFontSize={17} />);
      outputFontSizes.forEach((fs) => {
        wrapper.setProps({ outputFontSize: fs });
        expect(wrapper.prop("outputFontSize")).toBe(fs);
      });
      wrapper.unmount();
    });
  });

  describe("Panel", () => {
    it("displays output from returned request data", () => {
      const wrapper = mount(<Display />);

      wrapper.unmount();
    });
  });
});