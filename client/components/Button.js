import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Button1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleClick = (event) => {
    console.log("Clicked!");
    if (this.props.submit) {
      this.setState({ isLoading: true });
      this.props.submit();
    }
  }

  // handleLoading = (p) => {
  //   console.log("outside");
  //   if (!this.props.loading) {
  //     console.log("inside");
  //     this.setState({ isLoading: false });
  //   }
  // }

  handleSelect = (eventKey, event) => {
    event.persist();
    console.log("Clicked!");
    console.log(this);
    this.props.handleSelect(eventKey, this.props.datatype);
  }


  render() {
    if (this.props.type && (this.props.type == 'dropdown')) {
      // move these to onMount
      let header = this.props.datatype;
      if (header == "codeFontSize" || header == "outputFontSize") {
        header = "Font Size";
      }
      let elements = [];
      this.props.options.forEach((option) => {
        if (option == 'c_cpp') {
          elements.push(<Dropdown.Item datatype={this.props.datatype} eventKey={String(option)}>{"C++"}</Dropdown.Item>);
        } else {
          elements.push(<Dropdown.Item datatype={this.props.datatype} eventKey={String(option)}>{option}</Dropdown.Item>);
        }
      });
      return (
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Header>{ header }</Dropdown.Header>
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
        <OverlayTrigger
          delay={300}
          placement="top"
          overlay={<Tooltip className='submit-btn-tooltip'>Click to translate code!</Tooltip>}
        >
          <Button
            onClick={this.props.loading ? null : this.handleClick}
            as="input"
            type="submit"
            disabled={this.props.loading}
            value={ this.props.loading ? 'Loading...' : 'Submit' }
            variant="outline-primary"
            className="submit-btn"
          />
        </OverlayTrigger>
      );
    }
  }
}

export { Button1 };