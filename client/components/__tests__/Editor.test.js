/**
 * @jest-environment jsdom
*/

import React from 'react';
import renderer from 'react-test-renderer';
import Editor from '../Editor.js';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


describe("Editor", () => {
  it("renders without crashing", () => {
    mount(<Editor />);
  });

  describe("Editor Controls", () => {
    it("show font size menu on Font Size button click", () => {
      const wrapper = mount(<Editor />);
      wrapper.find('button.dropdown-toggle').simulate('click');
      expect(wrapper.exists('div.dropdown-menu.show')).toBe(true);
      wrapper.unmount();
    });
  });
});