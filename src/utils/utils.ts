import { MP } from '../platform';

declare var global: any;
declare const mp: MP;

export const utils = {
	log: (...args: any) => {
		console.log.call(console, '[GM]', ...args);
	},
	isActor: (formId: number) => {
		return mp.get(formId, 'type') === 'MpActor';
	},
	hook: (eventName: string, callback: (...args: any[]) => void) => {
		if (!global.knownEvents.includes(eventName)) {
			global.knownEvents.push(eventName);
		}
		const prev = mp[eventName];
		mp[eventName] = (...args: any[]) => {
			try {
				const prevRes = prev ? prev(...args) : undefined;
				const callbackRes = callback(...args);
				return callbackRes !== undefined ? callbackRes : prevRes;
			} catch (e) {
				utils.log(`'${eventName}' threw an error: ${e}`);
				if (e['stack']) {
					utils.log(e['stack']);
				}
				return undefined;
			}
		};
	},
};

export const getFunctionText = (func: Function): string => {
	return func
		.toString()
		.replace(new RegExp('^.+[{]', 'm'), '')
		.replace(new RegExp('[}]$', 'm'), '')
		.trim();
};
