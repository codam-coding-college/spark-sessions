/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: W2Wizard <W2Wizard@student.codam.nl>         +#+                     */
/*                                                   +#+                      */
/*   Created: 2022/09/06 14:20:06 by fbes          #+#    #+#                 */
/*   Updated: 2022/09/07 11:04:37 by W2Wizard      ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

// Run this file with `node main.js`

///////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const { execSync } = require('child_process');

///////////////////////////////////////////////////////////////////////////////

const MTPDdir = `${__dirname}/markdown-to-pdf`;

// Create the directory if it does not exist.
if (!fs.existsSync(MTPDdir))
	fs.mkdirSync(MTPDdir);

// Pull and build
console.log(execSync('git submodule update --init --recursive').toString())
console.log(execSync('npm install && npm run build', { cwd: MTPDdir }).toString())

// Find all the directories with the markdown files in them
const dirs = execSync(`find spark-session -name 'SparkSession*.md'`).toString().trimEnd()

// Convert each file to PDF
for (const dir of dirs.split('\n')) {
	const out = dir.split('/').slice(-1)[0].replace(/\.md$/i, '.pdf')
	console.log(execSync(`node markdown-to-pdf/build/app.js '${dir}' 'pdfs/${out}'`).toString())
}

///////////////////////////////////////////////////////////////////////////////
