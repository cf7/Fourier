import React from 'react';
import { Panel } from './Panel.js';

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
      <div className='app-view'>
        <Title />
        <Panel type='input' handleContent={this.handleContent.bind(this)} />
        <Panel type='display' userContent={this.state.userContent} />
      </div>
    );
  }
}

export { App };