const { execSync } = require('child_process')
const fs = require('fs')
var colors = require('colors')
const fg = require('fast-glob');
const replace  = require('replace');

const log = (...args) => console.log(`[jest-convert]`.magenta, ...args)

log('Starting the migration'.magenta)

const directory = process.argv[2];

//if(directory){
//    log('Directory ', colors.green(directory),' does exit!')
//}

if (!directory) {
  log('A directory argument is required!')
  log('Try:', 'babel-node ./scripts/jest-convert.js src/components/ContactHeader'.bold)
  process.exit(1)
}

if (!fs.existsSync(directory)) {
    log('Directory', directory.green, 'does not exist')
  process.exit(1)
}

log('Time to run some '.magenta , 'JEST'.rainbow , ' up in here!'.magenta)
log('Renaming files and moving them to __test__'.green)

const entries = fg.sync('**/*.spec.js');
entries.map(transformToJestFilename);
log(`renamed ${entries.length} .spec.js files to .test.js files in __test__/`)
incrementalCommit(`[jest-convert] rename .spec.js to .test.js`)

log('running jest-codemod'.blue)
runJestCodemods()
incrementalCommit(`[jest-convert] ran jest-codemods`)

log('running global replaces'.yellow)
runTransformations(directory+'\\__test__\\')
incrementalCommit(`[jest-convert] ran global replaces`)

log('All done, ready for inspection'.magenta)


//// Helper functions
function transformToJestFilename (oldPath) {
  const newPath = oldPath.replace('.spec.js', '.test.js')
  execSync(`cp ${oldPath} __test__/${newPath}`)
  log(`[rename]`.green, oldPath.split('/').pop(), '->'.bold, newPath.split('/').pop())
//    return newPath
 }

 function runJestCodemods () {
  log(`directory is ${directory}`)
  // log(`[jest-codemods]`.blue, 'chai-assert')
  // execSync(`jscodeshift -t ../node_modules/jest-codemods/dist/transformers/chai-assert.js ${directory}/__test__/`)
  log(`[jest-codemods]`.blue, 'chai-should')
  execSync(`jscodeshift -t ../node_modules/jest-codemods/dist/transformers/chai-should.js ${directory}/__test__/`)
  log(`[jest-codemods]`.blue, 'expect-js')
  execSync(`jscodeshift -t ../node_modules/jest-codemods/dist/transformers/expect-js.js ${directory}/__test__/`)
  log(`[jest-codemods]`.blue, 'expect')
  execSync(`jscodeshift -t ../node_modules/jest-codemods/dist/transformers/expect.js ${directory}/__test__/`)
  log(`[jest-codemods]`.blue, 'mocha')
  execSync(`jscodeshift -t ../node_modules/jest-codemods/dist/transformers/mocha.js ${directory}/__test__/`)
  // log(`[jest-codemods]`.blue, 'should')
  // execSync(`jscodeshift -t ../node_modules/jest-codemods/dist/transformers/should.js ${directory}/__test__/`)
}

function runTransformations (directory) {
  function advancedReplace(from, to){
    replace({
      regex: from,
      replacement: to,
      paths: [directory],
      recursive: true,
      silent: true,
    });
    log(`[replace]`.yellow, from, '->'.bold, to)
  
  }
  
  advancedReplace('sinon.spy', 'jest.fn')
  advancedReplace('sandbox.spy', 'jest.fn')
  advancedReplace('sinon.stub', 'jest.fn')
  advancedReplace('./index', '../index')

}

function incrementalCommit (message) {
  if (!thereAreUnstagedChanges()) {
    log('no unstaged changes, not making progress commit'.magenta)
  } else {
    log(`making incremental commit`.magenta)
    execSync(`git add .`)
    execSync(`git commit -m "${message}"`)
  }
}

function thereAreUnstagedChanges () {
  return execSync(`git status --porcelain`).toString().trim().length > 0
}
