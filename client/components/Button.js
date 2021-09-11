import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

class Button1 extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    console.log("Clicked!");
    if (this.props.submit) {
      this.props.submit();
    }
  }

  handleSelect = (eventKey, event) => {
    event.persist();
    console.log("Clicked!");
    console.log(this);
    this.props.handleSelect(eventKey, this.props.datatype);
  }

  render() {
    if (this.props.type && (this.props.type == 'dropdown')) {
      const elements = [];
      this.props.options.forEach((option) => {
        if (option == 'c_cpp') {
          elements.push(<Dropdown.Item datatype={this.props.datatype} eventKey={String(option)}>{"C++"}</Dropdown.Item>);
        } else {
          elements.push(<Dropdown.Item datatype={this.props.datatype} eventKey={String(option)}>{option}</Dropdown.Item>);
        }
      });
      return (
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Header>{ this.props.datatype }</Dropdown.Header>
          <Dropdown.Toggle>
            { this.props.option }
          </Dropdown.Toggle>
          <Dropdown.Menu>
            { elements }
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
          variant="outline-primary"
        />
      );
    }
  }
}

export { Button1 };