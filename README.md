# RST Converter

This repo contains a variety of scripts for working with MongoDB's Snooty flavor of RST.

## Installation

- Run `npm install`
- There are scripts call CLI applications. You can install these CLI applications as errors arise or install them now. These CLI apps are:
  - [httrack](https://www.httrack.com/page/2/)
  - [pandoc](https://pandoc.org/)

## Getting Started

While there are currently no hard and fast rules for these scripts,
the repo has been designed with the following principles:

1. Any script that can be used more generally than your specific project should go in the
   `parser` directory.
2. All scripts in the `parser` directory should have their own folder,
   with their own `index.js` file containing the public export scripts.
3. Scripts in the `parser` directory should take a string--**not** a file--as input. Scripts should also
   return strings. Any file-level manipulation should either take place in your specific project or
   in another directory of this repository.
4. Don't commit generated files.

## Projects

- Keep specific projects in the `projects` directory.
- Try to be clear what you're doing in there for the benefit of other users of this repo.
- Try to keep things as replicable and automated as possible.
  If you can't/don't keep something replicable, then try to explain what you did and why somewhere.
  Even if no one else will ever use your script, it helps your work serve as a reference
  for future work.

## Roadmap

1. Add Typescript to project. Eventually everything should be converted into Typescript.
2. Create a framework for new projects. This'll probably require making one or a few classes.
   For a first pass, it'll probably be easiest to create classes that are wrappers around the
   scripts in the `parser` directory. This may evolve over time.
