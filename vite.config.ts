import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';
import tsconfigPath from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPath()],
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass,
			},
		},
	},
	resolve: {
		alias: [
			{ find: '@apis', replacement: resolve(__dirname, '/src/apis') },
			{ find: '@models', replacement: resolve(__dirname, '/src/models') },
			{ find: '@pages', replacement: resolve(__dirname, '/src/pages') },
			{
				find: '@components',
				replacement: resolve(__dirname, '/src/components'),
			},
			{ find: '@hooks', replacement: resolve(__dirname, '/src/hooks') },
			{ find: '@utils', replacement: resolve(__dirname, '/src/utils') },
			{ find: '@fireStore', replacement: resolve(__dirname, '/src/fireStore') },
			{ find: '@assets', replacement: resolve(__dirname, '/src/assets') },
			{ find: '@constants', replacement: resolve(__dirname, '/src/constants') },
			{ find: '@style', replacement: resolve(__dirname, '/src/style') },
			{ find: '@contexts', replacement: resolve(__dirname, '/src/contexts') },
			{ find: '@class', replacement: resolve(__dirname, '/src/class') },
		],
	},
});
