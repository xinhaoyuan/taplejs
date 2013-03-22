.PHONY: test

taple_parser.js: taple_parser.jison
	jison $<

test: taple_parser.js
	node -p taple_parser.js examples/test_1.ss
