const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const Spinner = require('clui').Spinner
const clear = require('clear')
const spawn = require('child_process').spawn
const config = require('./config');

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
  return new Promise(function (resolve, reject) {
    const process = spawn(command, { shell: true });
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

const installPrettier = async () => {
  const spinner = new Spinner('Installing Prettier...');

  return installHelper(
    'yarn add -D prettier',
    () => console.log(chalk.green('Prettier has been installed! 👍')),
    spinner
  );
}

const setPrettierConfig = async () => {
  shell.ShellString(config).to(`.prettierrc.js`)
}

const success = () => {
  console.log(chalk.blue.bold(`Prettier Config completed`))
};

const main = async () => {
  init();
  await installPrettier();
  await setPrettierConfig();
  await installGitHook();

  const answer = await askIfJSorTS();
  const { ENV } = answer;

  if (ENV === 'js') {
    await installPrettier();
    await setPrettierConfig();

  } else if (ENV == 'ts') {
    const tsConfig = {
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {},
      settings: {
        react: {
          version: 'detect',
        },
      },
    }

    // install eslint plugins
    const pluginSpinner = new Spinner('Installing plugin configs...')
    await installHelper(
      'npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev',
      () => console.log(chalk.green('Eslint Typescript plugin installed 👍')),
      pluginSpinner
    )

    // write eslintrc.js
    await shell.ShellString(tsConfig).to(`.eslintrc.js`)

    // install typescript prettier config
    const tsSpinner = new Spinner('Installing Typescript prettier configs...')
    await installHelper(
      'npm install prettier eslint-config-prettier eslint-plugin-prettier --dev',
      () => console.log(chalk.green('Eslint Typescript prettier configs installed 👍')),
      tsSpinner
    )
  }

  success();
}

main();