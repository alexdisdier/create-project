import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import listr from 'listr';
import Listr from 'listr';
// need a package to automate installing dependencies

const ROUTE_TEMPLATES = '../../templates';


const access = promisify(fs.access);

// Copy the template file into the user destination folder
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  })
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  });

  if(result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'))
  }
  return;
}

// Create our user bootstrap project
export async function createProject(options) {
  // specify a target directory
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  }

  // set the template directory
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    ROUTE_TEMPLATES,
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    // try to read at that template directory
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('% Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1)
  }

  // NEED TO CREATE A FUNCTION TO INSTALL DEPENDENCIES FROM PACKAGE.JSON
  const projectInstall = () => {}

  const tasks = new Listr([
    {
      title: 'Copy project files', 
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Initialize git', 
      task: () => initGit(options), 
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory,
      }),
      skip: () => !options.runInstall ? 'Pass --install to automatically install dependencies' : undefined
    }
  ]);

  await tasks.run();

  console.log('% Project ready', chalk.green.bold('DONE'));
  return true;
}