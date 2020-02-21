import arg from 'arg';
import inquirer from 'inquirer';
import { createProject }  from './main';

const DEFAULT_GIT_INIT = false;
const DEFAULT_TEMPLATE = 'JavaScript';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({
    '--git': Boolean,
    '--yes': Boolean,
    '--install': Boolean, 
    '-g': '--git',
    '-y': '--yes',
    '-i': '--install'
  },{
    argv: rawArgs.slice(2),

  });
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false
  }
}

async function promptForMissingOptions(options) {
  
  // If user enter --yes as first argument to skip prompt
  // We set the template to default if no template were entered
  // or if the user enter templateName --yes, we'll set to templateName
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || DEFAULT_TEMPLATE
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
      choices: ['JavaScript', 'TypeScript'],
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

  // store our answers
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options)
  await createProject(options);
}