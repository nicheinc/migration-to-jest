# egghead lesson on jest-codemods

This code is the starting point to demonstrate converting your tests from Mocha to Jest using [jest-codemods](https://github.com/skovhus/jest-codemods). This code consists of a few utility functions found in `./src/index.js` and a single spec file at `./src/index.spec.js`. The tests use Mocha, Sinon and Chai. After following the steps in the video on egghead.io, you'll have the same tests, only using [Jest](https://jestjs.io/) for the test runner, assertions and mocking and the npm scripts for testing will have been simplified.

## High-level steps covered in the video

1. Create a branch just in case things don't go as planned
2. Install Jest via npm
3. Update the npm scripts in `package.json` to test with Jest
4. Commit to git - `jest-codemods` will not run and warn you if you have pending changes
5. Install `jest-codemods` globally (or you could choose to use `npx`)
6. Run `jest-codemods` CLI and select the appropriate options at the prompts
7. Observe the output and manually update where needed
8. Remove unecessary dependencies
9. Enjoy the Jest testing experience
