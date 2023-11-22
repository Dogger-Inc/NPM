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

	/* PUBLIC */

	public logErrorToDogger(error: Error) {
		this.handleErrorStack(error);
	}

	/* PRIVATE */

	private listenToErrors() {
		if (this.config.isClient) {
			window.addEventListener('error', (event: ErrorEvent) => this.handleErrorStack(event.error));
			return;
		}
		process.on('uncaughtException', (error: Error) => this.handleErrorStack(error));
	}

	private handleErrorStack(error: Error) {
		// TODO : Send API Call to Dogger web app
		console.log(error);
	}
}