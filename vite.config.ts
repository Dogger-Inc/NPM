import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	optimizeDeps: {
		include: ['axios'],
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'dogger-sdk',
			fileName: 'dogger-sdk',
		},
	},
	plugins: [dts()],
});