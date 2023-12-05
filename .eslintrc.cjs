module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs', vite.config.ts],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react/button-has-type': 1,
		'react/function-component-definition': [
			2,
			{ namedComponents: 'arrow-function' },
		],
		'react/react-in-jsx-scope': 0,
		'react/jsx-pascal-case': 1,
		'import/order': [
			'warn',
			{
				groups: [
					'type',
					'builtin',
					'external',
					'internal',
					['parent', 'sibling', 'index'],
					'unknown',
				],
				pathGroups: [
					{
						pattern: '/type$',
						group: 'type',
						position: 'before',
					},
					{
						pattern: 'react*',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '@pages/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@components/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '\\./(.*)\\.scss$',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@hooks/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@contexts/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@apis/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@utils/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@constants/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@style/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '^\\./?',
						group: 'internal',
						position: 'after',
					},
				],
				alphabetize: {
					order: 'asc',
				},
			},
		],
	},
	settings: {
		'import/resolver': {
			typescript: {},
		},
		'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
	},
};
