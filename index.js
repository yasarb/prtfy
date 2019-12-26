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

const installGitHook = async () => {
  const spinner = new Spinner('Configuring Git Hook..');

  return installHelper(
    'npx mrm lint-staged',
    () => console.log(chalk.green('Git hook configured 👍')),
    spinner,
  );
}

const askIfJSorTS = () => {
  const questions = [
    {
      name: 'ENV',
      type: 'list',
      choices: ['.Typescript', '.Javascript'],
      message: 'Please, select if this is a JavaScript or Typescript project',
      filter: (val) => {
        return (val === '.Typescript') ? 'ts' : 'js';
      }
    }
  ];
  
  return inquirer.prompt(questions)
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