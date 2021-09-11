import React from 'react';
import { Layout } from './Layout.js';
import { Panel } from './Panel.js';
import { Button1 } from './Button.js';
import { Input } from './Input.js';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AceEditor from 'react-ace';

// languages
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-python';
import 'ace-builds/src-min-noconflict/mode-c_cpp';

// themes
import 'ace-builds/src-min-noconflict/theme-textmate';
import 'ace-builds/src-min-noconflict/theme-monokai';

import jsTokens from 'js-tokens';

function Title() {
  return <h1>Fourier</h1>
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: false,
      userContent: "Translation appears here . . .",
      mode: "javascript",
      theme: "textmate",
      codeFontSize: 14,
      code: `function example(x) { console.log("x"); }`,
      outputFontSize: 14,
      test: []
    };
    this.modes = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.codeFontSizes = ['11','12','13','14','15','16','17','18','19','20']
    this.outputFontSizes = ['11','12','13','14','15','16','17','18','19','20']
  }

  handleContent = (event) => {

    // translation engine goes here

    this.setState({ userContent: event.target.value });
  }

  handleSelect = (option, datatype) => {
    switch (datatype) {
      case 'mode':
        this.setState({ mode: option });
        break;
      case 'theme':
        this.setState({ theme: option });
        break;
      case 'codeFontSize':
        this.setState({ codeFontSize: option });
        break;
      case 'outputFontSize':
        this.setState({ outputFontSize: option });
        break;
      default:
        console.log("no datatype");
    }
  };

  // handleMode = (mode) => {
  //   console.log("mode select");
  //   this.setState({ mode: mode });
  // }

  // handleTheme = (theme) => {
  //   console.log("theme select");
  //   this.setState({ theme: theme });
  // }

  // handleFontSize = (event) => {
  //   console.log(event);
  //   console.log(event.target);
  //   console.log(event.target.value);
  //   this.setState({ fontSize: event.target.value });
  // }

  onLoad = (event) => {
    console.log("loaded");
  }

  onChange = (content) => {
    console.log("edit");
    console.log(content);
    this.setState({ code: content });
  }

  handleSubmit = (event) => {
    for (const token of jsTokens(this.state.code)) {
      this.setState({ test: this.state.test.push(token) });
    }

    // engine logic
    const window = [];
    const windowSize = 3;
    this.state.test.forEach((token) => {
      if (token.type != 'WhiteSpace') {
        if (window.length >= windowSize) {
          window[0] = window[1];
          window[1] = window[2];
          window[2] = token;
          if (window[0].value == '(' && window[1].type == 'IdentifierName' && window[2].value == ')') {
            console.log("parameter");
            console.log(window[0].value + window[1].value + window[2].value);
          }
          if (window[0].type == 'IdentifierName' && window[1].value == ')' && window[2].value == '{') {
            console.log("function declaration");
            console.log(window[0].value + window[1].value + window[2].value);
          }
        } else if (window.length < windowSize) {
          window.push(token);
        }
      }
    });

    // console.log("Submitting!");
    // const request = new XMLHttpRequest();
    // request.open('POST', '/translate', true);
    // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // request.send(JSON.stringify({
    //   "code": this.state.code
    // })); // make this synchronous to expect the response translation
  }

  render() {
    return (
      <Layout>
        <Container className='app-view'>
          <Row>
            <Title />
          </Row>
          <Row>
            <Col>
              <Panel className="controls">
                <Form>
                  <Row>
                    <Col>
                      <Form.Label>
                        <Button1 
                          type="dropdown" 
                          datatype="mode" 
                          option={this.state.mode} 
                          options={this.modes} 
                          handleSelect={this.handleSelect} 
                        />
                      </Form.Label>
                      <Form.Label>
                        <Button1 
                          type="dropdown" 
                          datatype="theme" 
                          option={this.state.theme} 
                          options={this.themes} 
                          handleSelect={this.handleSelect} 
                        />
                      </Form.Label>
                      <Form.Label>
                        <Button1
                          type="dropdown"
                          datatype="codeFontSize"
                          option={this.state.codeFontSize}
                          options={this.codeFontSizes}
                          handleSelect={this.handleSelect} 
                        />
                      </Form.Label>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                </Form>
              </Panel>
              <AceEditor
                placeholder={`function example(x) { console.log("x"); }`}
                mode={this.state.mode}
                theme={this.state.theme}
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={this.state.codeFontSize}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.code}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false
                }}
              />
              <Button1 submit={this.handleSubmit} />
            </Col>
            <Col>
              <Panel className='options'>
                <Row>
                  <Form.Label>
                    <Button1
                      type="dropdown"
                      datatype="outputFontSize"
                      option={this.state.outputFontSize}
                      options={this.outputFontSizes}
                      handleSelect={this.handleSelect} 
                    />
                  </Form.Label>
                </Row>
              </Panel>
              <Panel className='display' userContent={this.state.userContent}>
                <p>Function 'example' takes in parameter 'x' as input and prints its value to console via 'console.log'</p>
                { this.state.test }
              </Panel>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export { App };