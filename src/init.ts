import Dogger, { InitConfig } from './Dogger';

export default function (config: InitConfig) {
	const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
	new Dogger({ ...config, isClient });
}