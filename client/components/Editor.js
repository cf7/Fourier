import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FourierButton from './Button.js';
import Panel from './Panel.js';

// import Form from 'react-bootstrap/Form';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Panel className="controls">
          <Form className="controls-form">
            <Row>
              <Col>
                <Form.Label>
                  <FourierButton
                    type="dropdown"
                    datatype="Font Size"
                    option={this.props.editorFontSize}
                    options={this.props.editorFontSizes}
                    handleSelect={this.props.handleSelect} 
                  />
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel className={'editor ' + (this.props.highlightEditor ? 'editor-highlighted' : '')}>
          <Form.Control 
            as="textarea"
            style={{ fontSize: this.props.editorFontSize + 'px' }}
            value={this.props.displayText}
            onChange={this.props.onChange}
          />
        </Panel>
      </>
    );
  }
}