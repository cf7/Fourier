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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import AceEditor from 'react-ace';
// languages
// import 'ace-builds/src-min-noconflict/mode-javascript';
// import 'ace-builds/src-min-noconflict/mode-python';
// import 'ace-builds/src-min-noconflict/mode-c_cpp';

// import CodeMirror from 'react-codemirror';
// import 'CodeMirror/mode/javascript/javascript';

import axios from 'axios';

// themes
// import 'ace-builds/src-min-noconflict/theme-textmate';
// import 'ace-builds/src-min-noconflict/theme-monokai';

// import { Parser } from 'acorn';
// import JSONPretty from 'react-json-pretty';
// import ReactJsonPrint from 'react-json-print';
// import HTMLReactParser from 'html-react-parser';
// import JSXParser from 'react-jsx-parser';

// import jsTokens from 'js-tokens';

function Title() {
  return <h1>Fourier</h1>
}

// function AST(props) {
//   return (
//     <ReactJsonPrint expanded dataObject={Parser.parse(props.code, { ecmaVersion: 2020 })} />
//   );
// }

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
      alertModal: false,
      editorFontSize: '17',
      outputFontSize: '17',
      submitted: false,
      displayText: 'This is sample text.',
      output: "Click submit to translate.",
      showOutput: '',
      showTranslation: '',
      loading: false,
      progressBar: '',
      progress: 100,
      highlightEditor: false,
      highlightTranslate: false,
    };
    this.editorFontSizes = ['11','12','13','14','15','16','17','18','19','20'];
    this.outputFontSizes = ['11','12','13','14','15','16','17','18','19','20'];

    // binding is necessary to make 'this' refer to App component when callback is passed into child components
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
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

  handleModalClose = () => {
    console.log("close modal");
    this.setState({ alertModal: false });
  }

  handleLinkMouseOver = (event) => {
    let targetName = event.target.name;
    this.setState({
      highlightEditor: targetName == 'editor' ? true : false,
      highlightTranslate: targetName == 'translate' ? true : false,
    });
  }

  handleLinkMouseLeave = (event) => {
    this.setState({ 
      highlightEditor: false,
      highlightTranslate: false,
    });
  }

  onChange = (event) => {
    console.log("change");
    console.log(event.target.value);
    this.setState({ displayText: event.target.value });
  }

  componentDidMount = () => {
    
  }

  handleSubmit = (event) => {
    this.setState({ 
      inputText: this.state.displayText, // "Loading translation . . .",
      submitted: false,
      progressBar: 'show-progress',
      // test: output,
      // showOutput: 'show',
    });

    let data = '';

    if (this.state.inputText) {

      data = this.state.inputText;

    } else if (this.state.displayText) {

      data = this.state.displayText;

    } else {

      // modal here

      this.setState({ 
        // output: "Please provide English words for translation in the editor to the left.",
        alertModal: true,
        submitted: false,
        progressBar: '',
      });

    }

    if (data) {

      let form = new FormData();    
      form.append('data', data);
      axios.post('https://fourier-model.herokuapp.com/predict', form) //'/model/predict', form) // (requestOptions)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.setState({
            output: response.data,
            submitted: true,
            progressBar: '',
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ 
            output: "An error occurred.",
            submitted: true,
            progressBar: '',
          });
        });

    }
    // use displayText

    // // this.setState({ submit: true });

    // this.setState({ output: this.state.output2 });
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
                editorFontSize={this.state.editorFontSize}
                editorFontSizes={this.editorFontSizes}
                handleSelect={this.handleSelect}
                onChange={this.onChange}
                displayText={this.state.displayText}
                highlightEditor={this.state.highlightEditor}
              />
              {/*</Row>*/}
            </Col>
            <Col className="column_2">
              <Row>
                <Modal show={this.state.alertModal} onHide={this.handleModalClose}>
                  <Modal.Body>Please provide English words for translation in the editor to the left.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={this.handleModalClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                  <Button1 
                    submit={this.handleSubmit} 
                    loading={this.state.loading} 
                    highlightTranslate={this.state.highlightTranslate}
                  />
              </Row>
            </Col>
            <Col className="column_3">
              <Row className={this.state.progressBar} >
              {
                this.state.submitted 

                ? 
                
                (
                  <Display 
                    outputFontSize={this.state.outputFontSize}
                    outputFontSizes={this.outputFontSizes}
                    // displayText={this.state.displayText}
                    // displayToggle={this.state.displayToggle}
                    showOutput={this.state.showOutput}
                    output={this.state.output}
                    handleSelect={this.handleSelect}
                  />
                )

                :
                
                (
                
                  this.state.progressBar 

                  ?

                  <div className="loading">
                    <h5>
                      Loading . . .
                    </h5>
                    <ProgressBar 
                      now={this.state.progress} 
                    />
                  </div>

                  :

                  <Col className="welcome">
                    <h4 className="welcome-header">Welcome to Fourier!</h4>
                    <p>
                    To get started, type into the <a onMouseOver={this.handleLinkMouseOver} onMouseLeave={this.handleLinkMouseLeave} name="editor">editor</a> to the left, 
                    or simply click <a onMouseOver={this.handleLinkMouseOver} onMouseLeave={this.handleLinkMouseLeave} name="translate">Translate</a> to translate the sample text.
                    </p>
                    <p>
                    Keep in mind that the underlying natural language processing model is still learning.
                    </p>
                    <p>
                    At its current stage, it will most likely return jibberish . . . but at least it is translated jibberish!
                    </p>
                  </Col>
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