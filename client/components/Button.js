import React from 'react';

class DropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listHidden: true
    }
  }

  handleClick = (event) => {
    console.log("Clicked!");
  }

  render() {
    if (this.props.type) {
      if (this.props.type == 'drop-down') {
        return (
            <label for="languages" className='language-options' onClick={this.handleClick}>
              <select name="languages" id="language-options">
                <option value="Javascript">Javascript</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
              </select>
            </label>
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

export { DropDown };