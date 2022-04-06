#!/bin/bash

# Echo on
# set -x

for MARKDOWN in spark-sessions/*/*.md; do
	FILE=$(basename "$MARKDOWN")
	NAME="${FILE%.*}.pdf"
	node markdown-to-pdf/build/app.js "$MARKDOWN" "pdfs/$NAME"
done