import React from 'react';
import { Button } from './Button.js';
import { TextArea } from './TextArea.js';

class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  // React recommends onChange over onInput
  render() {
    if (this.props.type == 'input') {
      return (
        <div className="panel">
          <Button />
          <Button />
          <Button />
          <TextArea className="user-input" handleContent={this.props.handleContent} />
        </div>
      );
    } else {
      return (
        <div className="panel">
          { this.props.userContent }
        </div>
      );
    }
  }
}

export { Panel };
