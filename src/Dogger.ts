import axios from 'axios';

export interface InitConfig {
	url?: string
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
		this.send(error);
	}

	private async send(error: Error) {
		const payload = {
			code: 400, 
			message: `${error.name} : ${error.message}`, 
			trace: error.stack, 
			type: 'error', 
			date: new Date()
		};
		await axios.post(`${this.config.url}/api/errors/new`, payload);
	}
}