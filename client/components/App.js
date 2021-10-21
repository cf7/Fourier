import React from 'react';
import { useEffect } from 'react';
import { Layout } from './Layout.js';
import { Panel } from './Panel.js';
import { Button1 } from './Button.js';
import { Editor } from './Editor.js';
import { Display } from './Display.js';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
      editorFontSize: '17',
      outputFontSize: '17',
      displayToggle: 'translation',
      displayCode: `function example(x) { console.log(x); }`,
      inputText: '',
      submitted: false,
      codeMirrorCode: '',
      output: "Click submit to translate.",
      output2: "Declare function that takes single parameter. Function executes console log that prints parameter value.",
      showOutput: '',
      showTranslation: '',
      range: {},
      cmMounted: false,
      marked: '',
      test: '',
      loading: false,
      progressBar: '',
      progress: 100,
    };
    this.modes = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.editorFontSizes = ['11','12','13','14','15','16','17','18','19','20'];
    this.outputFontSizes = ['11','12','13','14','15','16','17','18','19','20'];
    this.temp = [];
    this.codeMirror = null;
    this.cm = null;
    this._mark = null;
    this.translation = [];

    // binding is necessary to make 'this' refer to App component when callback is passed into child components
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
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
      case 'editorFontSize':
        this.setState({ editorFontSize: option });
        break;
      case 'outputFontSize':
        this.setState({ outputFontSize: option });
        break;
      default:
        console.log("no datatype");
    }
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

    // this.setState({ test: processedData });

    return processedData;
  }

  generateData2 = (data) => {
    let tokens = [];
    for (const token of jsTokens(data)) {
      tokens.push(token);
    }
    let chars = [];
    tokens.forEach((obj) => {
      chars.push(obj.value);
    });
    return chars;
  }

  handleSubmit = (event) => {
    let output = this.generateData(this.state.displayCode);
    this.setState({ 
      inputText: this.state.displayCode,
      // loading: true,
      output: "Declares variable and initializes to integer value. Function takes single parameter.", // "Loading translation . . .",
      progressBar: 'show-progress',
      test: output,
      showOutput: 'show',
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

    // let delay = (ms) => { new Promise((resolve) => setTimeout(resolve, ms)) };
    
    // simulate HTTP request
    // setTimeout(() => { 
    //   this.setState({
    //     submitted: true,
    //     progressBar: '',
    //   }); 
    // }, 10000);
    
    // form.append('Access-Control-Allow-Origin', '*');
    /* API Call here */
    // functions defined with 'function' have their own 'this'
    // arrow functions do not
    // axios.post('https://fourier-model.herokuapp.com/predict', form) //'/model/predict', form) // (requestOptions)
    //   .then((response) => {
    //     console.log(this);
    //     this.setState({ loading: false });
    //     console.log(response);
    //     console.log(response.data);
    //     this.setState({ 
    //       output: response.data,
    //       progressBar: 'hidden-progress',
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({ output: "An error occurred." });
    //     this.setState({ loading: false });
    //   });
    // use inputText

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
              {/*<Row>*/}
              <Editor 
                mode={this.state.mode}
                modes={this.modes}
                theme={this.state.theme}
                themes={this.themes}
                editorFontSize={this.state.editorFontSize}
                editorFontSizes={this.editorFontSizes}
                handleSelect={this.handleSelect}
                onChange={this.onChange}
                displayCode={this.state.displayCode}
              />
              {/*</Row>*/}
            </Col>
            <Col className="column_2">
              <Row>
                  <Button1 submit={this.handleSubmit} loading={this.state.loading} />
                  {/* Progress bar: now, visuallyHidden */}
              </Row>
            </Col>
            <Col className="column_3">
              <Row className={this.state.progressBar} >
              {
                true // this.state.submitted 

                ? 
                
                (
                  <Display 
                    outputFontSize={this.state.outputFontSize}
                    outputFontSizes={this.outputFontSizes}
                    inputText={this.state.inputText}
                    displayToggle={this.state.displayToggle}
                    showOutput={this.state.showOutput}
                    output={this.state.output}
                    handleSelect={this.handleSelect}
                  />
                )

                :
                
                (
                <div className="test-welcome">
                  {
                  
                    this.state.progressBar 

                    ?

                    <>
                    <p>
                      Loading . . .
                    </p>
                    <ProgressBar 
                      now={this.state.progress} 
                    />
                    </>

                    :

                    <p>
                      Welcome to Fourier! To get started, try inputting some code into 
                      the editor to the left, or simply click submit to translate the sample program.

                      Keep in mind that only simple javascript programs will work for Fourier
                      in its current phase of development.

                      Here are some more sample programs you can try:

                      { `const addOne = function (x) { return x + 1; }`}
                      { `let x = 30; let y = 40; x + y;` }
                      { `for (const i = 0; i < 3; i++) { console.log(i); }` }

                    </p>
                  
                  }
                </div>

                )
              }
              </Row>
              {/* 
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
              <Panel className={'display ' + this.state.showOutput}>
                { this.state.inputCode && (this.state.displayToggle == 'translation') && <p className={this.state.showOutput} style={{ fontSize: this.state.outputFontSize + 'px' }}>{this.state.output}</p>}
                { this.state.inputCode && (this.state.displayToggle == 'tree') && <AST code={this.state.inputCode} /> }
                { this.state.inputCode && (this.state.displayToggle == 'json') && 
                    <JSONPretty 
                      id='json-pretty' 
                      data={JSON.stringify(Parser.parse(this.state.inputCode, { ecmaVersion: 2020 }))}
                      onJSONPrettyError={e => console.error(e)}
                    >
                    </JSONPretty>
                }
              </Panel>

              */}
            </Col>
          </Row>
          {/*<JSONPretty
                data={JSON.stringify(this.state.test)}
              >
              </JSONPretty>*/}
          {/*{ JSON.stringify(this.state.test) }*/}
        </Container>
      </Layout>
    );
  }
}

export { App };