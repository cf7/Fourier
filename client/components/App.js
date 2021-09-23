import React from 'react';
import { Layout } from './Layout.js';
import { Panel } from './Panel.js';
import { Button1 } from './Button.js';
import { Input } from './Input.js';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import AceEditor from 'react-ace';
// languages
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-python';
import 'ace-builds/src-min-noconflict/mode-c_cpp';

import CodeMirror from 'react-codemirror';
// import 'CodeMirror/mode/javascript/javascript';

// themes
import 'ace-builds/src-min-noconflict/theme-textmate';
import 'ace-builds/src-min-noconflict/theme-monokai';

import { Parser } from 'acorn';
import JSONPretty from 'react-json-pretty';
import ReactJsonPrint from 'react-json-print';

import jsTokens from 'js-tokens';

function Title() {
  return <h1>Fourier</h1>
}

function AST(props) {
  return (
    <ReactJsonPrint expanded dataObject={Parser.parse(props.code, { ecmaVersion: 2020 })} />
  );
}

function Translation(props) {

  return (
    <div className='translation'>
      <span><a>Declare function</a> that takes <a>single parameter.</a> </span>
      <span><a>Function executes</a> <a>console log</a> that prints <a>parameter value.</a> </span>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: false,
      userContent: "Translation appears here . . .",
      mode: "javascript",
      theme: "textmate",
      codeFontSize: '14',
      outputFontSize: '14',
      displayToggle: 'translation',
      code: `function example(x) { console.log(x); }`,
      translation: "<div className='translation'><span><a>Declare function</a> that takes <a>single parameter.</a> </span><span><a>Function executes</a> <a>console log</a> that prints <a>parameter value.</a> </span></div>",
      test: ''
    };
    this.modes = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.codeFontSizes = ['11','12','13','14','15','16','17','18','19','20']
    this.outputFontSizes = ['11','12','13','14','15','16','17','18','19','20']
    this.temp = [];
    this.codeMirror = null;
    this.ace = {};
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
        this.setState({ displayToggle: 'translation' });
    }
  }
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

  componentDidMount = () => {
    let codeMirror = this.codeMirror.getCodeMirror()
    if (codeMirror) {
      console.log("codeMirror");
      console.log(codeMirror);
      console.log(codeMirror.markText);
      let doc = codeMirror.getDoc();
      console.log(doc);
      // codemirror content lines are zero-indexed
      codeMirror.markText( {line: 0, ch: 0}, {line: 0}, { className: "marked" });
    }
  }

  handleSubmit = (event) => {
    let json = Parser.parse(this.state.code, { ecmaVersion: 2020 });
    console.log(json);

    function traverse(obj) {
      if( obj !== null && typeof obj == "object" ) {
        Object.entries(obj).forEach(([key, value]) => {
          // key is either an array index or object key
          if (key == "start" || key == "end") {
            delete obj[key];
          } else {
            traverse(value);
          }
        });
        // return the modified json at the end
        return obj;
      } else {
        // json is a number or string
        return obj;
      }
    }

    // console.log(traverse(json));
    // this.setState({ test: traverse(json) });

    // jsTokens returns a generator
    // must access using a loop
    // const tokens = Array.from(jsTokens(this.state.code));
    // this.setState({ test: tokens });

    // this.setState({ test: "test" });


    /*
      type - Program
        body
          type - FunctionDeclaration
          id
            type - Identifier
            name - example
          params
            type
            name - x
          body
            type - BlockStatement
            body
              type - ExpressionStatement
              expression
                type - CallExpression
                callee
                  type
                  object
                    type
                    name - console
                  property
                    type
                    name - log
                arguments
                  type
                  value - x
    */

    // let syntaxTree = Parser.parse(this.state.code, { ecmaVersion: 2020 });
    // console.log(syntaxTree);
    // this.setState({ translation: JSON.stringify(syntaxTree)  });
    // console.log(this.state.translation);

    // console.log("Submitting!");
    // const request = new XMLHttpRequest();
    // request.open('POST', '/translate', true);
    // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // request.send(JSON.stringify({
    //   "code": this.state.code
    // })); // make this synchronous to expect the response translation

    /*
      Run each level of code through the same network because it will have the same
      encodings and vocabulary
      Just reuse the same categories at each level and output a summary
      Store the outputs at different levels to create the structure of summaries
      Then have a second network go over the stuctured summaries to create the
      human summary

      First pass might not need nlp, simply labeling everything at different scales
    */
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
                fontSize={Number(this.state.codeFontSize)}
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
                className={this.state.test}
                ref={(r) => {this.ace = r;}}
              />
              <Button1 submit={this.handleSubmit} />
            </Col>
            <Col>
              <Panel className='display-options'>
                <Form>
                  <Row>
                    <Col>
                      <Form.Label>
                        <Button1
                          type="dropdown"
                          datatype="outputFontSize"
                          option={this.state.outputFontSize}
                          options={this.outputFontSizes}
                          handleSelect={this.handleSelect} 
                        />
                      </Form.Label>
                      <ToggleButtonGroup name='display-toggle' type='radio' defaultValue='translation' onChange={this.handleToggle}>
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
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                </Form>
              </Panel>
              <Panel className='display' userContent={this.state.userContent}>
                { (this.state.displayToggle == 'translation') && <Translation translation={this.state.translation} /> }
                { (this.state.displayToggle == 'tree') && <AST code={this.state.code} /> }
                { (this.state.displayToggle == 'json') && 
                    <JSONPretty 
                      id='json-pretty' 
                      data={JSON.stringify(Parser.parse(this.state.code, { ecmaVersion: 2020 }))}
                      onJSONPrettyError={e => console.error(e)}
                    >
                    </JSONPretty>
                }
              </Panel>
              <Row>
                <CodeMirror 
                  ref={(c) => {this.codeMirror = c;}} 
                  value={this.state.code}
                /> {/* use CodeMirror markText() function to access dom nodes and changes styles dynamically */}
              </Row>
            </Col>
          </Row>
          {/*<JSONPretty 
                      id='json-pretty2' 
                      data={JSON.stringify(this.state.test, { ecmaVersion: 2020 })}
                      onJSONPrettyError={e => console.error(e)}
                    >
                    </JSONPretty>*/}
          {/*<p>
          { this.state.code }
          </p>*/}
          
        </Container>
      </Layout>
    );
  }
}

export { App };