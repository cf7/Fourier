import React from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    console.log("Clicked!");
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Search
      </button>
    );
  }
}

export { Button };