import React from 'react';
import { Input } from './Input.js';
import { Button } from './Button.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  // React recommends onChange over onInput
  render() {
    return (
      <Container className="panel">
        { this.props.children }
      </Container>
    );
  }
}

export { Panel };
