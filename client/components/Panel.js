import React from 'react';
import { Button } from './Button.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  // React recommends onChange over onInput
  // classNames are only applied to terminal valid DOM elements (divs,spans,etc.)
  // must be passed in as props otherwise
  render() {
    return (
      <Container className={this.props.className + " panel"}> 
        { this.props.children }
      </Container>
    );
  }
}

export { Panel };
