# Fourier

Fourier is a source code summarizer that uses natural language processing to summarize code into human readable phrases. It is a simple tool that is designed to increase the speed at which developers learn and understand code written by others.

Fourier is not meant to replace the human reader, but to augment them. This tool hopefully makes understanding convoluted code bases and complex programming languages much easier and much less time-intensive.

Check out the prototype app!\
[https://fourier-app.herokuapp.com/](https://fourier-app.herokuapp.com/)

#### Simple Example
~~~
// javascript
function example(x) { console.log(x); }
// translation
"Declare function that takes single parameter. Function executes console log that prints parameter value."
~~~
#### Complicated Example
~~~
// code
~~~

## Features

1) Fourier reads code snippets and translates them into spoken language that is summarized. 
Upcoming features:
2) Users can click on summaries to highlight which pieces of code the generated text is referring to.
3) Summaries will have multiple layers to give users access to multiple "zoom depths" of the code's logic.

## What Fourier is not

Fourier is not a documentation generator. Its purpose is not to take in commented code and generate formatted documentation from the comments and code snippets ([Doxygen](https://en.wikipedia.org/wiki/Doxygen)), often for the purpose of generating API documentation (although, this may become a feature eventually). Instead, Fourier is designed simply to read programming languages, translate them into spoken language, with or without comments or parameter definitions from the developer.

## Setup
~~~
$ git clone https://github.com/cf7/Fourier.git

$ npm install

$ npm run dev-start
~~~

## Current Phase
Building out proof of concept interface\
Training rudimentary core NLP model for javascript

# TODOS
Train NLP models for more languages (Python, C++)
Implement navigation to map translations to their code origins

## References
Of course, as often happens, a few months after ideating and building this project, I find out that someone else has already done it. Fortunately, my original idea takes their concept at least one step further by extending the transformation to natural language. Here's an excellent tool I found that is pretty much Fourier but stops at abstract syntax trees.\
[AST Explorer](https://astexplorer.net/)

