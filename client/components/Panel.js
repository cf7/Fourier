import React from 'react';
// import { DropDown } from './Button.js';
import { TextArea } from './TextArea.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  // React recommends onChange over onInput
  render() {
    if (this.props.type == 'input') {
      return (
        <div className="panel">
          {/*<DropDown type='drop-down'/>*/}
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <TextArea className="user-input" handleContent={this.props.handleContent} />
        </div>
      );
    } else {
      return (
        <div className="panel">
          <p>
            { this.props.userContent }
          </p>
        </div>
      );
    }
  }
}

export { Panel };
