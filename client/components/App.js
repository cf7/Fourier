import React from 'react';
import Layout from './Layout.js';
import Panel from './Panel.js';
import FourierButton from './Button.js';
import Editor from './Editor.js';
import Display from './Display.js';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

function Title() {
  return <h1>Fourier</h1>
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({ displayText: event.target.value });
  }

  handleSubmit = (event) => {
    this.setState({ 
      inputText: this.state.displayText,
      submitted: false,
      progressBar: 'show-progress',
      showOutput: '',
    });

    let data = '';

    if (this.state.inputText) {

      data = this.state.inputText;

    } else if (this.state.displayText) {

      data = this.state.displayText;

    } else {

      this.setState({ 
        alertModal: true,
        submitted: false,
        progressBar: '',
      });

    }

    if (data) {

      let form = new FormData();    
      form.append('data', data);
      axios.post('https://fourier-model.herokuapp.com/predict', form)
        .then((response) => {
          let translation = response.data.split('eostok')[0].trim();
          this.setState({
            output: translation,
            showOutput: 'show-output',
            submitted: true,
            progressBar: '',
          });
        })
        .catch((error) => {
          this.setState({ 
            output: "An error occurred.",
            showOutput: 'show-output',
            submitted: true,
            progressBar: '',
          });
        });

    }

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
              <Editor 
                editorFontSize={this.state.editorFontSize}
                editorFontSizes={this.editorFontSizes}
                handleSelect={this.handleSelect}
                onChange={this.onChange}
                displayText={this.state.displayText}
                highlightEditor={this.state.highlightEditor}
              />
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
                  <FourierButton 
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
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}