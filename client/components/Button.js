import React from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listHidden: true
    }
  }

  handleClick = (event) => {
    console.log("Clicked!");
  }

  handleMouseOver = (event) => {
    console.log("hovering!");
    this.setState({listHidden: false });
  }

  handleMouseOut = (event) => {
    this.setState({listHidden: true });
  }

  render() {
    if (this.props.type) {
      if (this.props.type == 'drop-down') {
        return (
          <button onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
            Language
            <div className={ 'drop-down-options' + (this.state.listHidden ? ' hidden' : '') }>
              <ul>
                <li>Javascript</li>
                <li>Python</li>
                <li>C++</li>
              </ul>
            </div>
          </button>
        );
      }
    } else {
      return (
        <button onClick={this.handleClick}>
          Search
        </button>
      );
    }
  }
}

export { Button };