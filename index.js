const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shell');
const Spinner = require('clui').Spinner
const clear = require('clear')
const spawn = require('child_process').spawn


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

const installHelper = (command, onSuccess, spinner) => {
  return new Promise(function(resolve, reject) {
    const process = spawn(command, { shell : true});
    spinner.start();
    process.on('exit', () => {
      spinner.stop();
      onSuccess();
      resolve();
    });
  });
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