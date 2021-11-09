import React from 'react';
import ReactDOM from 'react-dom';

import Panel from './Panel.js';
import FourierButton from './FourierButton.js';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


export default class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <>
        <Panel className='display-options'>
          <Form className='display-form'>
            <Row>
              <Col>
                <Form.Label>
                  <FourierButton
                    type="dropdown"
                    datatype="outputFontSize"
                    option={this.props.outputFontSize}
                    options={this.props.outputFontSizes}
                    handleSelect={this.props.handleSelect} 
                  />
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel className={'display ' + this.props.showOutput}>
          { <p className={this.props.showOutput} style={{ fontSize: this.props.outputFontSize + 'px' }}>{this.props.output}</p> }
        </Panel>
      </>
    );
  }
}