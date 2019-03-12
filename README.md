# ![NumberMystic](https://raw.githubusercontent.com/efournier92/numberMystic/master/public/img/logo/NumberMystic_Logo.png)

## Contents
- [Overview](#overview)
- [Demo](#demo)
- [Development Philosophy](#development-philosophy)
- [Stack](#stack)
- [Build](#build)
- [Contribute](#contribute)
- [License](#license)
- [Features](#features)

## Overview
This application is built to determine a user's chosen number in `n` questions, by asking a sequence of binary-range questions. The user is prompted to choose a number range, then to think of a number within that range. The maximum number of questions it will take is a calculated as `n`, with the formula `1 + Floor(log2( n ))`. Based on binary search laws, the it will never require more than the allotted guesses to determine the user's number.

## Demo
[NumberMystic](http://numbermystic.herokuapp.com/#/)

## Development Philosophy
I built this as an excuse to play around with binary search, as well as to hone my skills in [AngularJS](https://angularjs.org/). It's a simple application, on which I didn't spend much time. It's a pure SPA, built with four view modes, displayed as a sequence of prompts. I wrote the binary search algorithm without referencing any other solutions. After much tweaking and manual testing, I believe it can _always_ find your number within the allotted number of questions!

## Stack

### Server
- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)

### Client
- [AngularJS](https://angularjs.org/)
- [ES6](https://es6.io/)
- [Gulp](https://gulpjs.com/)
- [Babel](https://babeljs.io/)
- [WebPack](https://webpack.js.org/)

## Build
- `npm install --save`
- `gulp`
- `nodemon app.js`

## Contribute
If you have feature suggestions, please contact me here or at efournier92@gmail.com. If you'd like to submit a pull request, please feel free to, and I'll review merge it at my earliest convenience!

## License
This project is provided under the [`MIT`](https://opensource.org/licenses/MIT) licence and I hereby grant rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software without limitation, provided the resulting software also carries the same open-source licensing statement.

## Features

### Choose a number range
![Number Range Screen](https://raw.githubusercontent.com/efournier92/numberMystic/master/public/img/screenshots/01_NumberRange.png)

### Think of a Number
![Think of a Number Screen](https://raw.githubusercontent.com/efournier92/numberMystic/master/public/img/screenshots/02_ThinkOfANumber.png)

### Binary Range Question
![Range Question Screen](https://raw.githubusercontent.com/efournier92/numberMystic/master/public/img/screenshots/03_RangeQuestion.png)

### Final Answer
![Final Answer Screen](https://raw.githubusercontent.com/efournier92/numberMystic/master/public/img/screenshots/04_Answer.png)

