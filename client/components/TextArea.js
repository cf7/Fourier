import React from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea columns="50" rows="50" onChange={this.props.handleContent}>
      </textarea>
    );
  }
}

export { TextArea };