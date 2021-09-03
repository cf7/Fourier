import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

class Button1 extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    console.log("Clicked!");
    this.props.submit();
  }

  handleSelect = (eventKey, event) => {
    event.persist();
    console.log("Clicked!");
    this.props.handleMode(eventKey);
  }

  render() {
    if (this.props.type && (this.props.type == 'dropdown')) {
      return (
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Toggle id="dropdown-basic">
            { this.props.mode }
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
        <Button 
          onClick={this.handleClick}
          as="input"
          type="submit"
          value="Submit"
        />
      );
    }
  }
}

export { Button1 };