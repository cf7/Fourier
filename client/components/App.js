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
    this.state = {
      hasContent: false,
      userContent: "Translation appears here . . .",
      mode: "javascript",
      theme: "textmate",
      codeFontSize: '14',
      outputFontSize: '14',
      displayToggle: 'translation',
      code: `function example(x) { console.log(x); }`,
      codeMirrorCode: '',
      output: "Declare function that takes single parameter. Function executes console log that prints parameter value.",
      translation: [],
      range: {},
      cmMounted: false,
      marked: '',
      test: '',
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
    // console.log("edit");
    // console.log(content);
    this.setState({ code: content });
  }

  componentDidMount = () => {
    // cm instance doesn't update after this
    // won't see new lines
    this.setState({ cmMounted: true });
  }
  
  // handleRef = (codeMirror) => {
  //   if (this.state.cmMounted) {
  //     this.codeMirror = codeMirror;
  //   }
  // }


  // DO NOT TOUCH: data generator for engine
  generateData = () => {
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

    this.setState({ test: traverse(json) });
  }

  handleSubmit = (event) => {

    this.generateData();
    // (<div className='translation'><span><a onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>Declare function</a> that takes <a>single parameter.</a> </span><span><a>Function executes</a> <a>console log</a> that prints <a>parameter value.</a> </span></div>)
    
    // console.log(this.state.code);
    // if (this.codeMirror) {
    //   this.cm = this.codeMirror.getCodeMirror();
    // }
    // this.setState({ codeMirrorCode: this.state.code });
    // // this.cm = this.codeMirror.getCodeMirror();
    // // experimental translation processing

    // // engine: always make sure there is period and space at end of each segment
    // let data = "Declare function that takes single parameter. Function executes console log that prints parameter value."

    // // doc.posFromIndex() returns the position of content relative to single line version of doc (all code compressed to one line)
    // if (this.cm) {
    //   console.log(this.cm);
    //   // for (let i=0; i < this.cm.lineCount(); i++) {
    //   //   console.log(this.cm.getLine(i));
    //   // }
    // }

    // function getRange(s,t) {
    //   let range = [];
    //   if (t.indexOf(s) != -1 && s.length > 1) {
    //     // range.push({ line: })
    //   }
    // }

    // data.split('.').forEach((segment) => {
    //   let len = segment.length
    //   if (segment) {
    //     if (segment.substring(len-2,len-1) != '. ') {
    //       segment += '. ';
    //     }
    //     this.translation.push(segment);
    //   }
    // });

    // console.log(this.translation);

    // this.setState({ translation: this.translation });

    /*
      addKeyMap: ƒ (map, bottom)
addLineClass: ƒ ()
addLineWidget: ƒ ()
addOverlay: ƒ ()
addSelection: ƒ ()
addWidget: ƒ (pos, node, scroll, vert, horiz)
changeGeneration: ƒ ()
charCoords: ƒ (pos, mode)
clearGutter: ƒ ()
clearHistory: ƒ ()
clipPos: ƒ ()
constructor: ƒ CodeMirror(place, options)
coordsChar: ƒ (coords, mode)
cursorCoords: ƒ (start, mode)
defaultCharWidth: ƒ ()
defaultTextHeight: ƒ ()
deleteH: ƒ ()
eachLine: ƒ ()
endOperation: ƒ ()
execCommand: ƒ (cmd)
extendSelection: ƒ ()
extendSelections: ƒ ()
extendSelectionsBy: ƒ ()
findMarks: ƒ ()
findMarksAt: ƒ ()
findPosH: ƒ (from, amount, unit, visually)
findPosV: ƒ (from, amount, unit, goalColumn)
findWordAt: ƒ (pos)
firstLine: ƒ ()
focus: ƒ ()
getAllMarks: ƒ ()
getCursor: ƒ ()
getDoc: ƒ ()
getExtending: ƒ ()
getGutterElement: ƒ ()
getHelper: ƒ (pos, type)
getHelpers: ƒ (pos, type)
getHistory: ƒ ()
getInputField: ƒ ()
getLine: ƒ ()
getLineHandle: ƒ ()
getLineHandleVisualStart: ƒ ()
getLineNumber: ƒ ()
getLineTokens: ƒ (line, precise)
getMode: ƒ ()
getModeAt: ƒ (pos)
getOption: ƒ (option)
getRange: ƒ ()
getScrollInfo: ƒ ()
getScrollerElement: ƒ ()
getSelection: ƒ ()
getSelections: ƒ ()
getStateAfter: ƒ (line, precise)
getTokenAt: ƒ (pos, precise)
getTokenTypeAt: ƒ (pos)
getValue: ƒ ()
getViewport: ƒ ()
getWrapperElement: ƒ ()
hasFocus: ƒ ()
heightAtLine: ƒ (line, mode, includeWidgets)
historySize: ƒ ()
indentLine: ƒ ()
indentSelection: ƒ ()
indexFromPos: ƒ ()
isClean: ƒ ()
isReadOnly: ƒ ()
iterLinkedDocs: ƒ ()
lastLine: ƒ ()
lineAtHeight: ƒ (height, mode)
lineCount: ƒ ()
lineInfo: ƒ ()
lineSeparator: ƒ ()
linkedDoc: ƒ ()
listSelections: ƒ ()
markClean: ƒ ()
markText: ƒ ()
moveH: ƒ ()
moveV: ƒ ()
off: ƒ (type, f)
on: ƒ (type, f)
operation: ƒ (f)
phrase: ƒ (phraseText)
posFromIndex: ƒ ()
redo: ƒ ()
redoSelection: ƒ ()
refresh: ƒ ()
removeKeyMap: ƒ (map)
removeLineClass: ƒ ()
removeLineWidget: ƒ ()
removeOverlay: ƒ ()
replaceRange: ƒ ()
replaceSelection: ƒ ()
replaceSelections: ƒ ()
scrollIntoView: ƒ ()
scrollTo: ƒ ()
setBookmark: ƒ ()
setCursor: ƒ ()
setDirection: ƒ ()
setExtending: ƒ ()
setGutterMarker: ƒ ()
setHistory: ƒ ()
setOption: ƒ (option, value)
setSelection: ƒ ()
setSelections: ƒ ()
setSize: ƒ ()
setValue: ƒ ()
somethingSelected: ƒ ()
splitLines: ƒ ()
startOperation: ƒ ()
swapDoc: ƒ ()
toggleOverwrite: ƒ (value)
triggerElectric: ƒ ()
triggerOnKeyDown: ƒ ()
triggerOnKeyPress: ƒ ()
triggerOnKeyUp: ƒ onKeyUp(e)
triggerOnMouseDown: ƒ ()
undo: ƒ ()
undoSelection: ƒ ()
unlinkDoc: ƒ ()

    */

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

  handleMouseOver = (event) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.innerHTML);
    if (this.cm) {
      // console.log("codeMirror");
      // console.log(this.cm);
      // console.log(this.cm.markText);
      // let doc = codeMirror.getDoc();
      // console.log(doc);
      // codemirror content lines are zero-indexed
      this._mark = this.cm.markText( {line: 0, ch: 0}, {line: 0}, { className: "marked" });
    }
    this.setState({ marked: "marked" });
  }

  handleMouseLeave = (event) => {
    if (this._mark) {
      this._mark.clear();
    }
    this.setState({ marked: '' });
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
                name="code-input" // id when parsed
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
                { (this.state.displayToggle == 'translation') && <div className="translation"> { this.state.translation.map((segment) => { return (<span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>{segment}</span>); }) } </div> }
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
              {/*<Row>
                <Panel>
                  
         
                </Panel>
              </Row>*/}
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
{/*          { JSON.stringify(this.state.test) }
*/}        </Container>
      </Layout>
    );
  }
}

export { App };