import React from 'react';
import Container from 'react-bootstrap/Container';
import { Layout } from './Layout.js';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Container>
          <p>
            About Page
          </p>
          <p>
          Fourier is a source code summarizer that uses natural language processing to summarize code into human readable phrases. It is a simple tool that is designed to increase the speed at which developers learn and understand code written by others.

          Fourier is not meant to replace the human reader, but to augment them. This tool hopefully makes understanding convoluted code bases and complex programming languages much easier and much less time-intensive.
          </p>
          <p>
            Current Functionality:
            So far Fourier only processes simple javascript translations.

            Fourier is still in its proof of concept phase and is NOT built for performance.

            The NLP translation model is built from scratch using Tensorflow and Keras.
            The model is trained using a manually crafted dataset of ##### entries.
            The data itself is comprised of Abstract Syntax Trees generated by the <a ref="https://www.npmjs.com/package/acorn">Acorn</a> npm package.
            The ASTs are parsed, trimmed, and processed into a digestible form for the model.

            The model itself is classified as a Sequence-to-Sequence machine learning algorithm.
            It features an encoder and decoder, each a composite of Embedding, LSTM, and Dense neural network layers.
            The code for the model and its performance metrics can be found on Kaggle at <a ref="https://www.kaggle.com/cf1111/fourier2/notebook">Fourier</a>
          </p>
          <p>
            When code (in the form of an AST) is submitted to the Fourier backend, it goes through further transformations
            that eventually convert it into integer values that the model then reads to predict the human words it has learned to
            correlate with those sequences.
            The model then returns its own predicted sequence of english words that match the input code sequence.
          </p>
          <p>
            Training data sample:
            code: console.log("hello");
            {'{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"console"},"property":{"type":"Identifier","name":"log"},"computed":false,"optional":false},"arguments":[{"type":"Literal","value":"hello","raw":"\"hello\""}],"optional":false}}],"sourceType":"script"}'}
            {/* The model consumes json strings without escape characters (i.e. the output of JSON.stringify(code_ast) or more verbosely JSON.stringify(Acorn.parse(code, { ecmaVersion: 2020 }))). */}
          </p>
          <p>
            Interesting edge cases when building this app:

            1) javascript and python json handlers convert differently
            JSON.stringify --> "raw":"\"hello\"" --> json.loads() (python) --> syntax error 

            Over wire (https) --> \"raw\":\"\"hello\"\" --> json.loads() (python) --> 'raw':'"hello"'

            JSON.stringify() output is not compatible if copy and pasted directly into python
            But if the json is sent over wire, when it reaches python it is compatible

            Alone this would not be an issue because, but combined with boolean literals it becomes an issue

            javascript boolean literals true/false
            python boolean literals True/False

            Again, boolean literals alone wouldn't be an issue because json.loads() converts them if they are strings
            But different boolean literals combined with different escape character patterns creates incompatibility issue

            so to copy paste javascript json, need to stringify it
            when arriving in python code, need to wrap it in quotes
            but when wrapping in quotes, the "\"hello\"" create a syntax error

            the combined issue is sidestepped when loading from a file in python
            file I/O automatically converts boolean literals to python True/False boolean literals
            and converts "\"hello\"" to "'hello'"
            
          </p>
        </Container>
      </Layout>
    );
  }
}

export { About };