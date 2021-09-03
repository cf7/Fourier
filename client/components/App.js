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
      fontSize: 14,
      code: `function example(x) { console.log("x"); }`
    };
    this.modes = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.codeFontSizes = ['11','12','13','14','15','16','17','18','19','20']
  }

  handleContent = (event) => {

    // translation engine goes here

    this.setState({ userContent: event.target.value });
  }

  handleSubmit = (event) => {
    console.log("Submitting!");
    const request = new XMLHttpRequest();
    request.open('POST', '/translate', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify({
      "test": "test"
    }));
  }

  handleSelect = (option, dataType) => {
    switch (dataType) {
      case 'mode':
        this.setState({ mode: option });
        break;
      case 'theme':
        this.setState({ theme: option });
        break;
      case 'codeFontSize':
        this.setState({ codeFontSize: option });
        break;
      default:
        console.log("no dataType");
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

  onChange = (event) => {
    console.log("edit");
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
                    <Form.Label>
                      Language:
                      <Button1 type="dropdown" datatype="mode" option={this.state.mode} options={this.modes} handleSelect={this.handleSelect} />
                    </Form.Label>
                    <Form.Label>
                      Theme:
                      <Button1 type="dropdown" datatype="theme" option={this.state.theme} options={this.themes} handleSelect={this.handleSelect} />
                    </Form.Label>
                    <Form.Label>
                      Font Size:
                      <Button1 type="dropdown" datatype="fontSize" option={this.state.fontSize} options={this.codeFontSizes} handleSelect={this.handleSelect} />
                    </Form.Label>
                  </Row>
                </Form>
              </Panel>
              <AceEditor
                placeholder="Paste your code here . . ."
                mode={this.state.mode}
                theme={this.state.theme}
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={this.state.fontSize}
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
                options1 . . .
              </Panel>
              <Panel className='display' userContent={this.state.userContent}>
                display . . .
              </Panel>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export { App };