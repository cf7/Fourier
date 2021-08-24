import React from 'react';
import { DropDown } from './Button.js';
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
          <DropDown type='drop-down'/>
          <TextArea className="user-input" handleContent={this.props.handleContent} />
        </div>
      );
    } else {
      return (
        <div className="panel">
          <p>
            { this.props.userContent }
          </p>
        </div>
      );
    }
  }
}

export { Panel };
