import React from 'react';
import { useEffect } from 'react';
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
import ProgressBar from 'react-bootstrap/ProgressBar';

import AceEditor from 'react-ace';
// languages
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-python';
import 'ace-builds/src-min-noconflict/mode-c_cpp';

import CodeMirror from 'react-codemirror';
// import 'CodeMirror/mode/javascript/javascript';

import axios from 'axios';

// themes
import 'ace-builds/src-min-noconflict/theme-textmate';
import 'ace-builds/src-min-noconflict/theme-monokai';

import { Parser } from 'acorn';
import JSONPretty from 'react-json-pretty';
import ReactJsonPrint from 'react-json-print';
import HTMLReactParser from 'html-react-parser';
import JSXParser from 'react-jsx-parser';

import jsTokens from 'js-tokens';

function Title() {
  return <h1>Fourier</h1>
}

function AST(props) {
  return (
    <ReactJsonPrint expanded dataObject={Parser.parse(props.code, { ecmaVersion: 2020 })} />
  );
}

// function Translation(props) {
//   let descriptions = ["Declare function", "single parameter", "Function executes", "console log", "parameter value"];
//   // process translation here
//   let cm = null;
//   // called on each render
//   useEffect(() => {
//     if (props.codeMirror) {
//       cm = props.codeMirror.getCodeMirror();
//     }
//   });

//   function handleMouseOver (event) {
//     console.log(cm);
//     if (cm) {
//       console.log("codeMirror");
//       console.log(cm);
//       console.log(cm.markText);
//       // let doc = codeMirror.getDoc();
//       // console.log(doc);
//       // codemirror content lines are zero-indexed
//       let mark = cm.markText( {line: 0, ch: 0}, {line: 0}, { className: "marked" });
//     }
//   }
//   return (
//     <div className='translation'>
//       <span><a onMouseOver={handleMouseOver}>Declare function</a> that takes <a>single parameter.</a> </span>
//       <span><a>Function executes</a> <a>console log</a> that prints <a>parameter value.</a> </span>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    // only use setState() for changes that are visible to the UI
    this.state = {
      hasContent: false,
      mode: "javascript",
      theme: "textmate",
      codeFontSize: '14',
      outputFontSize: '17',
      displayToggle: 'translation',
      displayCode: `function example(x) { console.log(x); }`,
      inputCode: `function example(x) { console.log(x); }`,
      submit: false,
      codeMirrorCode: '',
      output: "Click submit to translate.",
      output2: "Declare function that takes single parameter. Function executes console log that prints parameter value.",
      translation: [],
      range: {},
      cmMounted: false,
      marked: '',
      test: '',
      loading: false,
      progress: 70,
    };
    this.modes = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.codeFontSizes = ['11','12','13','14','15','16','17','18','19','20'];
    this.outputFontSizes = ['11','12','13','14','15','16','17','18','19','20'];
    this.temp = [];
    this.codeMirror = null;
    this.cm = null;
    this._mark = null;
    this.translation = [];

    // binding is necessary to make 'this' refer to App component when callback is passed into child components
    this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({ displayToggle: 'placeholder' });
    }
  }

  onLoad = (event) => {
    // console.log("loaded");
  }

  onChange = (content) => {
    this.setState({ displayCode: content });
  }

  componentDidMount = () => {
    
  }


  // DO NOT TOUCH: data generator for engine
  generateData = (code) => {
    let json = Parser.parse(code, { ecmaVersion: 2020 });
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

    let processedData = traverse(json);

    this.setState({ test: processedData });

    return processedData;
  }

  handleSubmit = (event) => {
    this.setState({ 
      inputCode: this.state.displayCode,
      loading: true,
      output: "Loading translation . . .",
      // progressHidden: false,
    });
    // this.setState({ loading: true });
    // this.setState({ output: "Loading translation . . ." });

    let data = this.generateData(this.state.displayCode);
    console.log(data);
    console.log(JSON.stringify(data));
    let form = new FormData();
    // form.append(data);
    // JSON Notes:
    // - sending data as string over wire makes axios insert escapes '\"'
    //   model will not recognize escapes

    // let requestOptions = {
    //   method: 'post',
    //   url: '/model/predict',
    //   data: form,
    //   headers: {
    //     'Content-Type': `multipart/form-data;boundary=${form._boundary}`,
    //     // 'Access-Control-Allow-Origin': '*',
    //   },
    // };
    form.append('data', JSON.stringify(data));
    // form.append('Access-Control-Allow-Origin', '*');
    /* API Call here */
    // functions defined with 'function' have their own 'this'
    // arrow functions do not
    axios.post('https://fourier-model.herokuapp.com/predict', form) //'/model/predict', form) // (requestOptions)
      .then((response) => {
        console.log(this);
        this.setState({ loading: false });
        console.log(response);
        console.log(response.data);
        this.setState({ 
          output: response.data,
          // progressHidden: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ output: "An error occurred." });
        this.setState({ loading: false });
      });
    // use inputCode

    // // this.setState({ submit: true });

    // this.setState({ output: this.state.output2 });
  }

  handleMouseOver = (event) => {
    
  }

  handleMouseLeave = (event) => {
    
  }

  render() {
    return (
      <Layout>
        <Container className='app-view'>
          <Row>
            <Title />
          </Row>
          <Row className="panel-views">
            <Col className="column_1">
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
                name="code-input" // id when parsed
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={Number(this.state.codeFontSize)}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.displayCode}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false
                }}
              />
            </Col>
            <Col className="column_2">
              <Row>
                <Button1 submit={this.handleSubmit} loading={this.state.loading} />
                {/* Progress bar: now, visuallyHidden */}
                <ProgressBar now={this.state.progress} />
              </Row>
            </Col>
            <Col className="column_3">
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
              <Panel className='display'>
                { (this.state.displayToggle == 'translation') && <p style={{ fontSize: this.state.outputFontSize + 'px' }}>{this.state.output}</p>}
                { (this.state.displayToggle == 'tree') && <AST code={this.state.inputCode} /> }
                { (this.state.displayToggle == 'json') && 
                    <JSONPretty 
                      id='json-pretty' 
                      data={JSON.stringify(Parser.parse(this.state.inputCode, { ecmaVersion: 2020 }))}
                      onJSONPrettyError={e => console.error(e)}
                    >
                    </JSONPretty>
                }
              </Panel>
            </Col>
          </Row>
          {/*<JSONPretty
                data={JSON.stringify(this.state.test)}
              >
              </JSONPretty>*/}
          { JSON.stringify(this.state.test) }
        </Container>
      </Layout>
    );
  }
}

export { App };