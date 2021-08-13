import React from 'react';
import { Button } from './Button.js';
import { TextArea } from './TextArea.js';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="panel">
        <Button />
        <Button />
        <Button />
        <TextArea className="user-input"/>
      </div>
    );
  }
}

export { Panel };
