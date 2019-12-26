const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shell');

prettierConfig = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  useTabs: false,
  printWidth: 100,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
};

const init = async () => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync('PrTfY', {
        horizontalLayout: 'full',
      })
    )
  );
}

const main = async () => {
  // show prtfy introduction
  // install GitHook
  // ask questions
  // create the files
  // configures pre-commit hook
  // show success message
}

main();