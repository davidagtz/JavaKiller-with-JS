# JavaKiller

Kills Java programs with name of file. Now it can also compile and run Java programs.

## Getting Started

### Prerequisites

Must be a windows machine running NodeJS.

### Installing

In the command line

```
npm install -g javakiller
```
### Using the Package
```
var jkill = require('javakiller');
jkill.javac('example-name');
jkill.java('example-name');
jkill.kill('example-name');
```
## Built With

* [NodeJS](https://nodejs.org/en/) - The JavaScript environment used

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details