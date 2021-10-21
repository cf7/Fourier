import React from 'react';
import ReactDOM from 'react-dom';

import { Panel } from './Panel.js';
import { Button1 } from './Button.js';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import JSONPretty from 'react-json-pretty';
import ReactJsonPrint from 'react-json-print';



function AST(props) {
    return (
      <ReactJsonPrint expanded dataObject={Parser.parse(props.code, { ecmaVersion: 2020 })} />
    );
  }

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle = (value, event) => {
    switch (value) {
      case 'translation':
        this.setState({ displayToggle: value });
        break;
      case 'tree':
        this.setState({ displayToggle: value });
        break;
      case 'json':
        this.setState({ displayToggle: value });
        break;
      default:
        this.setState({ displayToggle: 'placeholder' });
    }
  }

  render () {
    return (
      <>
        <Panel className='display-options'>
          <Form className='display-form'>
            <Row>
              <Col>
                <Form.Label>
                  <Button1
                    type="dropdown"
                    datatype="outputFontSize"
                    option={this.props.outputFontSize}
                    options={this.props.outputFontSizes}
                    handleSelect={this.props.handleSelect} 
                  />
                </Form.Label>
                {/*<ToggleButtonGroup name='display-toggle' type='radio' defaultValue='translation' onChange={this.handleToggle}>
                  <div className="toggle-group-header">display</div>
                  <ToggleButton id='translation-toggle' value="translation">
                    Translation
                  </ToggleButton>
                  <ToggleButton id='tree-toggle' value="tree">
                    Tree
                  </ToggleButton>
                  <ToggleButton id='json-toggle' value="json">
                    JSON
                  </ToggleButton>
                </ToggleButtonGroup>*/}
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel className={'display ' + this.props.showOutput}>
          { <p className={this.props.showOutput} style={{ fontSize: this.props.outputFontSize + 'px' }}>{this.props.output}</p> }
          {/*{ this.props.inputText && (this.props.displayToggle == 'translation') && <p className={this.props.showOutput} style={{ fontSize: this.props.outputFontSize + 'px' }}>{this.props.output}</p>}
          { this.props.inputText && (this.props.displayToggle == 'tree') && <AST code={this.props.inputText} /> }
          { this.props.inputText && (this.props.displayToggle == 'json') && 
              <JSONPretty 
                id='json-pretty' 
                data={JSON.stringify(Parser.parse(this.props.inputText, { ecmaVersion: 2020 }))}
                onJSONPrettyError={e => console.error(e)}
              >
              </JSONPretty>
          }*/}
        </Panel>
      </>
    );
  }
}

export { Display };