.PHONY: test

taple_parser.js: taple_parser.jison
	jison $<


test: taple_parser.js
	node taple2js.js
