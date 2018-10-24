module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended'],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'no-irregular-whitespace': 0,
		'vue/attribute-hyphenation': ['error', 'always'],
		'vue/html-end-tags': 'error',
		'vue/html-indent': 'off',
		'vue/html-quotes': ['error', 'double']
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
