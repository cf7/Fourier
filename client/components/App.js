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

// themes
import 'ace-builds/src-min-noconflict/theme-textmate';
import 'ace-builds/src-min-noconflict/theme-monokai';

import { Parser } from 'acorn';
import JSONPretty from 'react-json-pretty';
import ReactJsonPrint from 'react-json-print';
// import json2html from 'node-json2html';
// import { JsonTable } from 'react-json-to-html';

function Title() {
  return <h1>Fourier</h1>
}

function AST2(props) {
  return (
    <ReactJsonPrint expanded dataObject={Parser.parse(props.code, { ecmaVersion: 2020 })} />
  );
}

// function AST() {
//   // Note: 'html' attr is vulnerable to XSS attacks!
//   let data = {
//     "type": "Program"
//   };
//   let template = {
//     '<>':'ul', 'html': [
//       {'<>':'li', 'class':'list-container', 'html': [
//           {'<>':'span', 'class':'value', 'html': {'<>':'span', 'class':'item-name', 'html':'Program'}},
//           {'<>':'span', 'class':'prefix', 'text': "&nbsp;{" },
//           {'<>':'ul', 'class':'value-body', 'html': function (entry,idx) {
//               return {'<>':'li', 'class':'entry', 'html':[
//                   {'<>':'span', 'class':'key', 'html': [
//                       {'<>':'span', 'class':'key-name', 'text':"type"},
//                       {'<>':'span', 'text':':&nbsp;'}
//                     ]
//                   },
//                   {'<>':'span', 'class':'value', 'html': {
//                     '<>':'span', 'class':'value-name', 'html': {
//                       '<>':'span', 'text':"${type}"
//                       }
//                     }
//                   } 
//                 ]
//               } // end return
//             } // end function
//           }, // end ul
//           {'<>':'span', 'class':'suffix', 'text':"}" }
//         ]
//       }
//     ]
//   };

//   return (
//     <Container className="tree-display-container">
//       { json2html.render(data, template) }
//     </Container>
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
      code: `function example(x) { console.log("x"); }`,
      translation: 'Example translation will appear here after submitting.'
    };
    this.modes = ['javascript', 'python', 'c_cpp'];
    this.themes = ['textmate', 'monokai'];
    this.codeFontSizes = ['11','12','13','14','15','16','17','18','19','20']
    this.outputFontSizes = ['11','12','13','14','15','16','17','18','19','20']
    this.temp = [];
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

  handleSubmit = (event) => {
    console.log(this.state.codeFontSize);
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
                { (this.state.displayToggle == 'translation') && this.state.translation }
                { (this.state.displayToggle == 'tree') && <AST2 code={this.state.code} /> }
                { (this.state.displayToggle == 'json') && 
                    <JSONPretty 
                      id='json-pretty' 
                      data={JSON.stringify(Parser.parse(this.state.code, { ecmaVersion: 2020 }))}
                      onJSONPrettyError={e => console.error(e)}
                    >
                    </JSONPretty>
                }
              </Panel>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export { App };