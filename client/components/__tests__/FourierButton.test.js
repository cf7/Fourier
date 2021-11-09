/**
 * @jest-environment jsdom
*/
import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import FourierButton from '../FourierButton.js';
import Adapter from 'enzyme-adapter-react-16';
import { waitFor } from '@testing-library/react';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

describe("FourierButton", () => {
  it("renders without crashing", () => {
    mount(<FourierButton />);
  });

  describe("Submit Button", () => {

    it("can render as a submit button", () => {
      const wrapper = mount(<FourierButton />);
      console.log(wrapper.find('input.submit-btn').prop('type'));
      expect(wrapper.find('input.submit-btn').prop('type')).toBe('submit');
      wrapper.unmount();
    });

    it("calls submit function when clicked", () => {
      let handleSubmit = jest.fn();
      const wrapper = mount(<FourierButton submit={handleSubmit} />);
      wrapper.find('input.submit-btn').simulate('click');
      expect(handleSubmit).toHaveBeenCalled();
      wrapper.unmount();
    });

  });

  describe("Dropdown Button", () => {
    it("can render as a dropdown button", () => {
      const wrapper = mount(<FourierButton type="dropdown" option={17} />);
      console.log(wrapper.find('button.dropdown-toggle').prop('type'));
      expect(wrapper.exists('button.dropdown-toggle')).toBe(true);
      expect(wrapper.find('button.dropdown-toggle').prop('type')).toBe('button');
      wrapper.unmount();
    });

    it("renders with a header label", () => {
      let header = "Font Size";
      const wrapper = mount(<FourierButton type="dropdown" datatype={header} />);
      expect(wrapper.find('div.dropdown-header').text()).toBe(header);
      wrapper.unmount();
    });

    it("renders dropdown menu when clicked", () => {
      const wrapper = mount(<FourierButton type="dropdown" option={17} options={[17,18,19,20]} />);
      wrapper.find('button.dropdown-toggle').simulate('click');
      expect(wrapper.exists('div.dropdown-menu.show')).toBe(true);
      wrapper.unmount();
    });

    // it("changes value when new option is selected", async () => {
    //   let option = 17;
    //   let handleSelect = jest.fn().mockImplementation((eventKey, event) => { console.log(eventKey); console.log(event); option = eventKey; });
    //   const wrapper = mount(<FourierButton type="dropdown" option={option} options={[17,18,19,20]} handleSelect={handleSelect} />);
    //   wrapper.find('button.dropdown-toggle').simulate('click');
    //   // menu isn't showing fast enough, so Jest complains simulate() not wrapped in act()
    //   expect(wrapper.exists('div.dropdown-menu.show')).toBe(true);
    //   // Dropdown.Item is not root node wrapper here, so not auto-wrapped with act()
    //   wrapper.find('button.dropdown-menu.show').childAt(3).simulate('click');
    //   wrapper = wrapper.setProp({ option: option });
    //   expect(wrapper.find('button.dropdown-toggle').text()).toBe("20");
    //   wrapper.unmount();
    // });
  });
});