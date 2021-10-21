import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Button1 } from './Button.js';
import { Panel } from './Panel.js';

// import Form from 'react-bootstrap/Form';

import AceEditor from 'react-ace';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Panel className="controls">
          <Form className="controls-form">
            <Row>
              <Col>
                {/*<Form.Label>
                  <Button1 
                    type="dropdown" 
                    datatype="mode" 
                    option={this.props.mode} 
                    options={this.props.modes} 
                    handleSelect={this.props.handleSelect} 
                  />
                </Form.Label>
                <Form.Label>
                  <Button1 
                    type="dropdown" 
                    datatype="theme" 
                    option={this.props.theme}
                    options={this.props.themes}
                    handleSelect={this.props.handleSelect} 
                  />
                </Form.Label>*/}
                <Form.Label>
                  <Button1
                    type="dropdown"
                    datatype="Font Size"
                    option={this.props.editorFontSize}
                    options={this.props.editorFontSizes}
                    handleSelect={this.props.handleSelect} 
                  />
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel className="editor">
          <textarea style={{ fontSize: this.props.editorFontSize + 'px' }}></textarea>
        </Panel>
        {/*<AceEditor
          placeholder={`function example(x) { console.log("x"); }`}
          mode={this.props.mode}
          theme={this.props.theme}
          name="code-input" // id when parsed
          onLoad={this.props.onLoad}
          onChange={this.props.onChange}
          fontSize={Number(this.props.codeFontSize)}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.props.displayCode}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
            hasCssTransforms: true,
          }}
          // style={{ width: 'inherit', height: '500px' }}
        />*/}
      </>
    );
  }
}

export { Editor };