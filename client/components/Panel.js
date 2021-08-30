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
    if (this.props.type && (this.props.type == 'input')) {
      return (
        <Container className="panel">
            <Input 
              className="user-input" 
              type="user-input" 
              handleContent={this.props.handleContent} 
              handleLanguage={this.props.handleLanguage}
              language={this.props.language}
            />
        </Container>
      );
    } else {
      return (
        <Container className="panel">
          <p>
            { this.props.userContent }
          </p>
        </Container>
      );
    }
  }
}

export { Panel };
