import { FileSystemAdapter } from './adapters/fs';
import * as async from './providers/async';
import * as sync from './providers/sync';
import Settings, { Options } from './settings';
import { Dirent, Entry } from './types';

type AsyncCallback = async.AsyncCallback;

function scandir(path: string, callback: AsyncCallback): void;
function scandir(path: string, optionsOrSettings: Options | Settings, callback: AsyncCallback): void;
function scandir(path: string, optionsOrSettingsOrCallback: Options | Settings | AsyncCallback, callback?: AsyncCallback): void {
	if (typeof optionsOrSettingsOrCallback === 'function') {
		return async.read(path, getSettings(), optionsOrSettingsOrCallback);
	}

	async.read(path, getSettings(optionsOrSettingsOrCallback), callback as AsyncCallback);
}

declare namespace scandir {
	function __promisify__(path: string, optionsOrSettings?: Options | Settings): Promise<Entry[]>;
}

function scandirSync(path: string, optionsOrSettings?: Options | Settings): Entry[] {
	const settings = getSettings(optionsOrSettings);

	return sync.read(path, settings);
}

function getSettings(settingsOrOptions: Settings | Options = {}): Settings {
	if (settingsOrOptions instanceof Settings) {
		return settingsOrOptions;
	}

	return new Settings(settingsOrOptions);
}

export {
	scandir,
	scandirSync,
	Settings,

	AsyncCallback,
	Dirent,
	Entry,
	FileSystemAdapter,
	Options
};
