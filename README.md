# Migration to Jest - Automation of the easy parts

The script automates parts of the migration from our current testing suites to jest.
It is based on [the code](https://gist.github.com/apiv/02b0b5b70bd752304bc8c7e940a5ea29) developed by Contactually. The story underlying  this code can be found in [this blog post](https://labs.contactually.com/migrating-2-000-specs-from-karma-to-jest-25dd8b0f3cfb).

The script uses [jest-codemods](https://github.com/skovhus/jest-codemods/blob/master/README.md). The file to test is from and [egghead lesson](https://egghead.io/lessons/jest-automate-your-migration-to-jest-using-codemods) ([the code](https://github.com/avanslaars/jest-codemods-lesson/tree/master) itself is available on Github).

The script runs in 3 parts, automatically committing the changes in-between:
1. It copies the test files .spec.js into the folder __test__ and rename them with the extension test.js
2. It applies several transformers from jest-codemods
3. It replaces ad-hoc test expressions by jest expressions

The script and the process to run it is still a work in progress. For now
1. Naviguate to the `src` folder
2. Run `node mocha-and-sinon-to-jest.js "C:\Users\lbilhaut\projects\experiments\migration-to-jest\src"`


