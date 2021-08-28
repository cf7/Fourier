import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    console.log("Clicked!");
  }

  render() {
    if (this.props.type && (this.props.type == 'drop-down')) {
      return (
        <DropdownButton id="dropdown-basic-button" title="Language">
          <Dropdown.Item href="#/action-1">Javascript</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Python</Dropdown.Item>
          <Dropdown.Item href="#/action-3">C++</Dropdown.Item>
        </DropdownButton>
      );
    } else {
      return (
        <button onClick={this.handleClick}>
          Search
        </button>
      );
    }
  }
}

export { Button };