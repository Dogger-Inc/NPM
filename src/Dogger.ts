export interface InitConfig {
	url?: string
    key: string,
    env: string,
    isClient: boolean,
}

interface PerformanceEntry {
    id: string;
    startTimestamp: number;
}

interface Performance extends PerformanceEntry {
	endTimestamp: number;
	elapsedTime: number;
}

interface DoggerError extends Error {
	status: number;
}

export default class Dogger {
	config: InitConfig;
	performances: PerformanceEntry[] = [];

    
	constructor(config: InitConfig) {
		this.config = config;
		this.listenToErrors();
	}

	/* PUBLIC */

	public logErrorToDogger(error: DoggerError) {
		this.handleErrorStack(error);
	}

	public startRecord(id : string) {
		this.startTimer(id);
	}

	public stopRecord(id : string, threshold: number = 0) {
		this.stopTimer(id, threshold);
	}
	/* PRIVATE */

	private listenToErrors() {
		if (this.config.isClient) {
			window.addEventListener('error', (event: ErrorEvent) => this.handleErrorStack(event.error));
			return;
		}
		process.on('uncaughtException', (error: DoggerError) => this.handleErrorStack(error));
	}

	private handleErrorStack(error: DoggerError) {
		this.sendError(error);
	}

	private async sendError(error: DoggerError) {
		try {
			const payload = {
				http_code: 400,
				message: `${error.name} : ${error.message}`, 
				stacktrace: error.stack, 
				type: 'error', 
				env: this.config.env
			};
			await fetch(`${this.config.url}/api/issues/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.config.key}`
				},
				body: JSON.stringify(payload)
			});
		} catch(err) {
			console.error(err);
		}
	}
	
	private startTimer(id: string) {
		const entry: PerformanceEntry = {
			id: id,
			startTimestamp: performance.now()
		};
		this.performances.push(entry);
	}

	private stopTimer(id: string, threshold: number = 0) {
		try {
			const index = this.performances.findIndex(entry => entry.id === id);
			if (!index) {
				return;
			}
			const entry = this.performances[index];
			if(!entry){
				return;
			}
			const endTimestamp = performance.now();
			const elapsedTime = endTimestamp - entry.startTimestamp;
			const pushToDatabase : boolean = elapsedTime >= threshold;
			if (!pushToDatabase) {
				return;
			}
			const perf :Performance = {...entry, elapsedTime, endTimestamp };
			this.sendPerformances(perf).then(()=>{
				this.performances.splice(index, 1);
			});
		} catch (error) {
			console.error(error);
		}
        
	}

	private async sendPerformances(performance: Performance) {
		try {
			const payload = {
				duration: performance.elapsedTime,
				comment: performance.id, 
				env: this.config.env
			};
			await fetch(`${this.config.url}/api/performances/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.config.key}`
				},
				body: JSON.stringify(payload)
			});
		} catch(err) {
			console.error(err);
		}
	}
}