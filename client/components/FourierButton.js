import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default class FourierButton extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   isLoading: false,
    // };
  }

  handleClick = (event) => {
    if (this.props.submit) {
      // this.setState({ isLoading: true });
      this.props.submit();
    }
  }

  handleSelect = (eventKey, event) => {
    event.persist();
    this.props.handleSelect(eventKey, this.props.datatype);
  }

  render() {

    if (this.props.type && (this.props.type == 'dropdown')) {

      let header = this.props.datatype;

      if (header == "editorFontSize" || header == "outputFontSize") {
        header = "Font Size";
      }

      let elements = [];

      if (this.props.options) {

        this.props.options.forEach((option, idx) => {
          elements.push(<Dropdown.Item datatype={this.props.datatype} eventKey={String(option)} key={idx}>{option}</Dropdown.Item>);
        });

      }

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
          overlay={<Tooltip className='submit-btn-tooltip'>Click to translate!</Tooltip>}
        >
          <Button
            onClick={this.props.loading ? null : this.handleClick}
            as="input"
            type="submit"
            disabled={this.props.loading}
            value={ this.props.loading ? 'Loading...' : 'Translate' }
            variant="outline-primary"
            className={"submit-btn " + (this.props.highlightTranslate ? 'translate-highlighted' : '')}
          />
        </OverlayTrigger>

      );

    }
  }
}