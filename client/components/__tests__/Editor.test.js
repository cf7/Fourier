/**
 * @jest-environment jsdom
*/

import React from 'react';
import renderer from 'react-test-renderer';
import Editor from '../Editor.js';
import { configure, shallow, mount, render } from 'enzyme';
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

    it("changes input when typed in", () => {
      const onChangeMock = jest.fn();
      const wrapper = shallow(<Editor onChange={onChangeMock} />);
      console.log(wrapper.simulate);
      wrapper.simulate('onChange');
      expect(onChangeMock.mock.calls.length).toBe(1);
      wrapper.unmount();
    });

    it("adjusts font size for displayed text", () => {
      const editorFontSizes = [17, 18, 19, 20];
      const wrapper = shallow(<Editor editorFontSize={17} />);
      editorFontSizes.forEach((fs) => {
        wrapper.setProps({ editorFontSize: fs });
        expect(wrapper.prop("editorFontSize")).toBe(fs);
      });
      wrapper.unmount();
    });
  });
});