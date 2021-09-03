import React from 'react';
import { Layout } from './Layout.js';
import { Panel } from './Panel.js';
import { Button1 } from './Button.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-python';
import 'ace-builds/src-min-noconflict/mode-c_cpp';

function Title() {
  return <h1>Fourier</h1>
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: false,
      userContent: "Translation appears here . . .",
      mode: "Language",
      code: `function example(x) { console.log("x"); }`
    };
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

  handleMode = (mode) => {
    console.log("mode select");
    this.setState({ mode: mode });
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
                controls1 . . .
                <Button1 type="dropdown" mode={this.state.mode} handleMode={this.handleMode} />
              </Panel>
              <AceEditor
                placeholder="Paste your code here . . ."
                mode={this.state.mode}
                // theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
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