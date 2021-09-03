import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Button } from './Button.js';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type && (this.props.type == 'user-input')) {
      return (
        <Form>
          <Form.Label>
            <Button 
              type='drop-down'
              handleLanguage={this.props.handleLanguage}
              language={this.props.language}
            />
          </Form.Label>
          <Form.Text className="indicator-bar">
              indicatators here . . .
          </Form.Text>
          <Form.Control as='textarea' rows={6} onChange={this.props.handleContent} />
        </Form>
      );
    } else if (this.props.type == 'text') {
      return (
        <Form>
          <Row>
            <Col>
              <Form.Label>
                Font Size:
              </Form.Label>
            </Col>
            <Col>
              <Form.Control type='text' />
            </Col>
          </Row>
        </Form>
      );
    } else {
      return (
        <textarea columns="50" rows="50" onChange={this.props.handleContent}>
        </textarea>
      );
    }
  }
}

export { Input };