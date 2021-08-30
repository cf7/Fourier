import React from 'react';
import { Panel } from './Panel.js';
import { Button } from './Button.js';

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
      language: "Language",
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

  render() {
    return (
        <Container className='app-view'>
          <Row>
            <Title />
          </Row>
          <Row>
            <Col>
              <AceEditor
                placeholder="Paste your code here . . ."
                mode="javascript"
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
              <Button submit={this.handleSubmit} />
            </Col>
            <Col>
              <Panel type='display' userContent={this.state.userContent} />
            </Col>
          </Row>
        </Container>
    );
  }
}

export { App };