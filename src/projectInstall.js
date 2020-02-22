/**
 * source: https://stackabuse.com/executing-shell-commands-with-node-js/
 * The exec() function creates a new shell and executes a given command. 
 * The output from the execution is buffered, which means kept in memory, 
 * and is available for use in a callback.
 */
const { exec } = require("child_process");

/**
 * standard streams are preconnected input and output communication channels between
 * a computer program and its environment when it begins execution (the process starts). 
 * The three input/output (I/O) connections are called:
 * 
 * - stdin: standard input reads to get info from us. 
 * - stdout: standard output writes normal info.
 * - stderr: standard error writes error info. 
 * 
 * More generally, a child process inherits the standard streams of its parent process.
 */

 export function projectInstall (path) {
  exec(`yarn install --prefix ${path.cwd}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
 }
