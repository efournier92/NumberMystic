# ![NumberMystic](https://github.com/efournier92/numberMystic/blob/master/public/img/logo/NumberMystic_Logo.png?raw=true)

## Contents
- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Development Philosophy](#development-philosophy)
- [Stack](#stack)
- [Building](#building)
- [Contributing](#contributing)
- [Licensing](#licensing)

## Overview
This application is meant to determine a user's number in `n` questions, by asking a sequence of binary range questions. The user is prompted to choose a number range, then to think of a number within that range. The maximum number of questions it will take is a calculated as `n`, with the formula `1 + Floor(log2( n ))`. Based on binary search laws, the it will never require more than the allotted guesses to determine the user's number.

## Demo
[numberMystic.herokuapp.com](http://numbermystic.herokuapp.com/#/)

## Features

### Choose a number range
![Number Range Screen](https://github.com/efournier92/numbermystic/blob/master/public/img/screenshots/01_NumberRange.png?raw=true)

### Think of a Number
![Think of a Number Screen](https://github.com/efournier92/numbermystic/blob/master/public/img/screenshots/02_ThinkOfANumber.png?raw=true)

#### Binary Range Question
![Range Question Screen](https://github.com/efournier92/numbermystic/blob/master/public/img/screenshots/03_RangeQuestion.png?raw=true)

### Final Answer
![Screen](https://github.com/efournier92/numbermystic/blob/master/public/img/screenshots/04_Answer.png?raw=true)

## Development Philosophy
I built this as an excuse to play around with binary search, as well as to hone my skills with AngularJS. It's a simple application I didn't spend much time on, and as such is one of my first attempt at rapid interface development. It's a pure SPA, built with four view modes displayed as a sequence of prompts. I wrote the binary search algorithm without referencing any other solutions. After much tweaking and manual testing, I believe it can _always_ find your number within the allotted number of questions.

## Stack
- NodeJS
- ExpressJS
- AngularJS
- ES6 (JavaScript)
- Gulp
- Babel
- WebPack

## Building
- `npm install --save`
- `gulp`
- `nodemon app.js`

## Contributing
If you have feature suggestions, please contact me here or at efournier92@gmail.com. If you'd like to submit a pull request, please feel free to, and I'll review merge it at my earliest convenience!

## Licensing
This project is provided under the `MIT` licence and I hereby grant rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software without limitation, provided the resulting software also carries the same open-source licensing statement.

