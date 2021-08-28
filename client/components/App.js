import React from 'react';
import { Panel } from './Panel.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Title() {
  return <h1>Fourier</h1>
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: false,
      userContent: "placeholder value"
    };
  }

  handleContent(event) {
    this.setState({ userContent: event.target.value });
  }

  render() {
    return (
        <Container className='app-view'>
          <Row>
            <Title />
          </Row>
          <Row>
            <Col>
              <Panel type='input' handleContent={this.handleContent.bind(this)} />
            </Col>
            <Col>
              <Panel type='display' userContent={this.state.userContent} />
            </Col>
          </Row>
        </Container>
    );
  }
}

export { App };