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
    this.languages = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.fontSizes = ['11','12','13','14','15','16','17','18','19','20']
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

  handleSelect = (option) => {
    console.log("selected: " + option);
    // this.setState({ str(option): option });
  };

  handleMode = (mode) => {
    console.log("mode select");
    this.setState({ mode: mode });
  }

  handleTheme = (theme) => {
    console.log("theme select");
    this.setState({ theme: theme });
  }

  handleFontSize = (event) => {
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    this.setState({ fontSize: event.target.value });
  }

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
                      <Button1 type="dropdown" option={this.state.mode} options={this.languages} handleSelect={this.handleSelect} />
                    </Form.Label>
                    <Form.Label>
                      Theme:
                      <Button1 type="dropdown" option={this.state.theme} options={this.themes} handleSelect={this.handleSelect} />
                    </Form.Label>
                    <Form.Label>
                      Font Size:
                      <Button1 type="dropdown" option={this.state.fontSize} options={this.fontSizes} handleSelect={this.handleSelect} />
                    </Form.Label>
                  </Row>
                  {/*<Row>
                    <Col>
                      <Form.Label>
                        Font Size:
                      </Form.Label>
                    </Col>
                    <Col>
                       TODO: add validation styles, see component api 
                      {/*<Form.Control type='text' defaultValue={this.state.fontSize} onChange={this.handleFontSize} />
                    </Col>
                  </Row>*/}
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