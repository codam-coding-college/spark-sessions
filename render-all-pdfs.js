const fs = require('fs')
const { execSync } = require('child_process')

// check if markdown-to-pdf was pulled correctly
const MTPDFdir = `${__dirname}/markdown-to-pdf`
const contentsOfMTPDFdir = fs.readdirSync(MTPDFdir)
if (contentsOfMTPDFdir.length == 0) {
	console.log(execSync('git submodule update --init --recursive').toString())
	console.log(execSync('npm install && npm run build', { cwd: MTPDFdir }).toString())
}

const dirs = execSync(`find spark-sessions -name 'SparkSession*.md'`).toString().trimEnd()

for (const dir of dirs.split('\n')) {
	const out = dir.split('/').slice(-1)[0].replace(/\.md$/i, '.pdf')
	console.log(execSync(`node markdown-to-pdf/build/app.js '${dir}' 'pdfs/${out}'`).toString())
}
