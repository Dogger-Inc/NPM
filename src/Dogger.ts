export interface InitConfig {
    key: string,
    env: string,
    isClient: boolean,
}

export default class Dogger {
	config: InitConfig;
    
	constructor(config: InitConfig) {
		this.config = config;
		this.listenToErrors();
	}

	listenToErrors() {
		if (this.config.isClient) {
			window.addEventListener('error', (event) => this.handleErrorStack(event.error));
			return;
		}
		process.on('uncaughtException', (error) => this.handleErrorStack(error));
	}

	handleErrorStack(error: Error) {
		console.log(error);
	}
}