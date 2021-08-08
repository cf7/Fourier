import React from 'react';
import { Button } from './button.js';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export { Panel };
