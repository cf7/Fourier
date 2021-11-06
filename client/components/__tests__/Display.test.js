/**
 * @jest-environment jsdom
*/
import React from 'react';
// import renderer from 'react-test-renderer';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import axios from 'axios';

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
        expect(wrapper.find('p').prop("style")).toHaveProperty('fontSize', String(fs) + "px");
      });
      wrapper.unmount();
    });
  });

  describe("Panel", () => {
    it("gains css class for animation upon rendering", () => {
      const wrapper = mount(<Display showOutput={'show-output'} />);
      expect(wrapper.exists('div.panel.display')).toBe(true);
      expect(wrapper.find('div.panel.display').hasClass('show-output')).toBe(true);
      wrapper.unmount();
    });

    it("displays output from returned request data", () => {
      let data = "c'est trop risqué eostok";
      const wrapper = mount(<Display output={data} />);
      expect(wrapper.exists('div.panel.display')).toBe(true);
      expect(wrapper.find('div.panel.display').text()).toBe(data);
      // console.log(wrapper.find('div.panel.display').text());
      wrapper.unmount();
    });
  });
});