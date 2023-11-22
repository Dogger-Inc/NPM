import Dogger, { InitConfig } from './Dogger';

export default function (config: InitConfig) {
	const isClient = !!window && !!document;
	new Dogger({ ...config, isClient });
}