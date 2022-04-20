#!/bin/bash
const { execSync } = require('child_process')

const dirs = execSync(`find spark-sessions -name 'SparkSession*.md'`).toString().trimEnd()

for (const dir of dirs.split('\n')) {
	const out = dir.split('/').slice(-1)[0].replace(/\.md$/i, '.pdf')
	// console.log(execSync(`node markdown-to-pdf/build/app.js '${dir}' 'pdfs/${out}'`).toString())
}
