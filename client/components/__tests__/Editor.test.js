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

it("Editor displays changed input", () => {
  const wrapper = mount(<Editor />);
  // const component = renderer.create(<Editor 
  //               editorFontSize={17}
  //               editorFontSizes={[17,18,19,20]}
  //               handleSelect={""}
  //               onChange={""}
  //               displayText={"This is sample text."}
  //               highlightEditor={false}
  //             />);

  // let tree = component.toJSON();
  // tree.props.onChange();
  // expect(tree).toMatchSnapshot();

  wrapper.unmount();
});

});