const sync = require('glob') 
const { execSync } = require('child_process')
const fs = require('fs')
var colors = require('colors')

console.log('Hello World'.yellow)

const directory = process.argv[2];

if(directory){
    console.log('Directory ', colors.green(directory),' does exit!')
}

if (!directory) {
  console.log('A directory argument is required!')
  console.log('Try:', 'babel-node ./scripts/jest-convert.js src/components/ContactHeader'.bold)
  process.exit(1)
}

if (!fs.existsSync(directory)) {
    console.log('Directory', directory.green, 'does not exist')
  process.exit(1)
}

console.log(`Time to run some ${'jest'.green} up in here`)
// const nameOfFile = directory+`\\index.spec.js`;
// console.log('Looking for: ' , nameOfFile)

var glob = require('glob');
const filesToMigrate = glob('**/*.spec.js', function(err, files) {
// glob('**/*.spec.js', function(err, files) {
    console.log(`Found ${files.length} .spec.js files, renaming to .test.js`)
  const directory = files.map(transformToJestFilename)
  console.log(`renamed ${files.length} .spec.js files to .test.js files in __test__/`)
  return files;
});

//glob('**/*.test.js', function(err, files) {

// function wait(ms){
//   var start = new Date().getTime();
//   var end = start;
//   while(end < start + ms) {
//     end = new Date().getTime();
//  }
// }

// wait(3000);

 incrementalCommit(`[jest-convert] rename .spec.js to .test.js`)

function transformToJestFilename (oldPath) {
//    const newPath = oldPath.replace('.test.js', '.spec.js')
   const newPath = oldPath.replace('.spec.js', '.test.js')
   //execSync(`mv ${oldPath} ${newPath}`)
   execSync(`cp ${oldPath} __test__/${newPath}`)
   console.log(`[rename]`.green, oldPath.split('/').pop(), '->'.bold, newPath.split('/').pop())
    return newPath
  }

  function incrementalCommit (message) {
    if (!thereAreUnstagedChanges()) {
      console.log('no unstaged changes, not making progress commit')
    } else {
      console.log(`making incremental commit`)
      execSync(`git add .`)
      execSync(`git commit -m "${message}"`)
    }
  }

  function thereAreUnstagedChanges () {
    return execSync(`git status --porcelain`).toString().trim().length > 0
  }

console.log(`running jest-codemod`)
runJestCodemods()

function runJestCodemods () {
  console.log(`[jest-codemod]`.blue, 'running...')
  execSync(`jest-codemods ./__test__/**/*.test.js`)
  
  // execSync(`jscodeshift -t ./node_modules/jest-codemods/dist/transformers/chai-assert.js ${directory}`)
  // console.log(`[jest-codemod]`.blue, 'chai-should')
  // execSync(`jscodeshift -t ./node_modules/jest-codemods/dist/transformers/chai-should.js ${directory}`)
  // console.log(`[jest-codemod]`.blue, 'expect')
  // execSync(`jscodeshift -t ./node_modules/jest-codemods/dist/transformers/expect.js ${directory}`)
  // console.log(`[jest-codemod]`.blue, 'mocha')
  // execSync(`jscodeshift -t ./node_modules/jest-codemods/dist/transformers/mocha.js ${directory}`)
}