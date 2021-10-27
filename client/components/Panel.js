import React from 'react';
import { Button } from './Button.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className={this.props.className + " panel"}> 
        { this.props.children }
      </Container>
    );
  }
}