import Dogger, { InitConfig } from './Dogger';

export default function (config: InitConfig) {
	const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
	return new Dogger({
		url: 'http://127.0.0.1:8000',
		...config, 
		isClient 
	});
}