# Fourier

Fourier is a sandbox interface that I built specifically to demonstrate my frontend proficiencies for potential employers. It was originally intended for a NLP source code summarizer project . . . until I ran into a project-killing hurdle. (You can read about that [here](https://github.com/cf7/Fourier/blob/main/docs/original_README.md))


 that uses natural language processing techniques to summarize code into human readable phrases and make those phrases navigable. It is a simple tool that is designed to increase the speed at which developers learn and understand code written by others.

Fourier is not meant to replace the human reader, but to augment them. This tool hopefully makes understanding convoluted code bases and complex programming languages much easier and much less time-intensive.

#### Simple Example
~~~
// javascript
function example(x) { console.log(x); }
~~~
#### Complicated Example
~~~
// code
~~~

## Features

1) Fourier reads code snippets and translates them into spoken language that is summarized and contextualized.
2) Users can click on summaries to highlight which pieces of code the generated text is referring to.
3) Summaries will have multiple layers to give users access to multiple "zoom depths" of the code's logic.

## What Fourier is not

Fourier is not a documentation generator. Its purpose is not to take in commented code and generate formatted documentation from the comments and code snippets ([Doxygen](https://en.wikipedia.org/wiki/Doxygen)), often for the purpose of generating API documentation (although, this may become a feature eventually). Instead, Fourier is designed simply to read programming languages, translate them into spoken language, and make those translations navigable, with or without comments or parameter definitions from the developer.

## Setup
~~~
$ git clone https://github.com/cf7/Fourier.git

$ npm install

$ npm run dev-start
~~~

## Current Phase
Building out a proof of concept interface\
Haven't started core NLP engine

## References
Of course, as often happens, a few months after ideating and building this project, I find out that someone else has already done it. Fortunately, my original idea takes their concept at least one step further by extending to natural language. Here's an excellent tool I found that is pretty much Fourier but stops at abstract syntax trees.\
[AST Explorer](https://astexplorer.net/)