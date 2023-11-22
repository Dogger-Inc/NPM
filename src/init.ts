export interface InitConfig {
    key: string,
    env: string,
}

export default function (config: InitConfig) {
	console.log(config);
}