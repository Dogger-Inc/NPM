import Dogger, { InitConfig } from './Dogger';

export default function (config: InitConfig) {
	const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
	new Dogger({
		...config, 
		url: 'http://127.0.0.1:8000',
		isClient 
	});
}