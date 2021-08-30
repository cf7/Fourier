import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSelect = (eventKey, event) => {
    event.persist();
    console.log("Clicked!");
    this.props.handleLanguage(eventKey);
  }

  render() {
    if (this.props.type && (this.props.type == 'drop-down')) {
      return (
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Toggle id="dropdown-basic">
            { this.props.language }
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Javascript">Javascript</Dropdown.Item>
            <Dropdown.Item eventKey="Python">Python</Dropdown.Item>
            <Dropdown.Item eventKey="C++">C++</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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