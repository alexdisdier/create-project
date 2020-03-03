import arg from 'arg';
import fs from 'fs';
import inquirer from 'inquirer';
import { createProject }  from './main';

const DEFAULT_PKG_INSTALL = true;
const DEFAULT_GIT_INIT = true;
const DEFAULT_TEMPLATE = 'CRA TS';
const DEFAULT_PROJECT_NAME = 'new-project';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({
    '--git': Boolean,
    '--skip': Boolean,
    '--install': Boolean, 
    '-g': '--git',
    '-s': '--skip',
    '-i': '--install'
  },{
    argv: rawArgs.slice(2),

  });
  return {
    skipPrompts: args['--skip'],
    git: args['--git'],
    template: args._[0], 
    targetDirectory: args._[1], 
    pkgInstall: args['--install']
  }
}

async function promptForMissingOptions(options) {
  
  // If user enter --skip as first argument to skip prompt
  // We set the template to default if no template were entered
  // or if the user enter templateName --skip, we'll set to templateName
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || DEFAULT_TEMPLATE,
      targetDirectory: options.targetDirectory || DEFAULT_PROJECT_NAME,
      git: options.git || DEFAULT_GIT_INIT,
      pkgInstall: options.pkgInstall || DEFAULT_PKG_INSTALL,
    }
  }

  const questions = [];

  // If the user does not skip prompt, we'll ask for the template
  // of choice
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['CRA TS', 'CRA JS', 'Lib TS', 'Lib JS', 'Utils TS'],
      default: DEFAULT_TEMPLATE
    })
  }

  // If the user does not skip prompt, we'll ask for the 
  // project's name of choice
  if (!options.targetDirectory) {
    questions.push({
      type: 'input',
      name: 'project-name',
      message: 'Enter the name of your project',
      default: DEFAULT_TEMPLATE
    })
  }

  // We'll also ask them if they want to initiate a git repo
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git', 
      message: 'Initialize a git repository?',
      default: DEFAULT_GIT_INIT
    })
  }

  if (!options.pkgInstall) {
    questions.push({
      type: 'confirm',
      name: 'pkgInstall', 
      message: 'Would you like to install dependencies?',
      default: DEFAULT_PKG_INSTALL
    })
  }

  // store our answers
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    targetDirectory: options.targetDirectory || answers.targetDirectory,
    git: options.git || answers.git,
    pkgInstall: options.pkgInstall || answers.pkgInstall,
    // targetDirectory: '/' + options.targetDirectory
  }
}

// const createDir = (dirPath) => {
//   console.log(dirPath);
//   fs.mkdirSync(process.cwd() + dirPath, { recursive: true }, (errors) => {
//     if (error) {
//       console.error('An error occured', error);
//     } else {
//       console.log('Your directory is made')
//     }
//   })
// }

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options)
  // await createDir(options.targetDirectory);
  await createProject(options);
}