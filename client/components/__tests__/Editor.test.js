/**
 * @jest-environment jsdom
*/
import React from 'react';
// import renderer from 'react-test-renderer';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import axios from 'axios';

configure({ adapter: new Adapter() });



import Editor from '../Editor.js';

describe("Editor", () => {
  it("renders without crashing", () => {
    mount(<Editor />);
  });

  describe("Controls", () => {
    it("renders a button controlling font size", () => {
      const wrapper = mount(<Editor />);
      expect(wrapper.exists('button.dropdown-toggle')).toBe(true);
      wrapper.unmount();
    });
  });

  describe("TextArea", () => {
    it("changes input when typed in", () => {
      const onChangeMock = jest.fn();
      const wrapper = mount(<Editor onChange={onChangeMock} />);
      wrapper.find('textarea').simulate('change');
      expect(onChangeMock.mock.calls.length).toBe(1);
      wrapper.unmount();
    });

    it("adjusts font size for displayed text", () => {
      const editorFontSizes = [17, 18, 19, 20];
      const wrapper = mount(<Editor editorFontSize={17} />);
      editorFontSizes.forEach((fs) => {
        wrapper.setProps({ editorFontSize: fs });
        expect(wrapper.find('textarea.form-control').prop("style")).toHaveProperty("fontSize", String(fs) + "px");
      });
      wrapper.unmount();
    });
  });
});