import * as fsScandir from '@nodelib/fs.scandir';

import { Entry, Errno, QueueItem } from '../types/index';
import * as common from './common';
import Reader from './reader';

export default class SyncReader extends Reader {
	protected readonly _scandir: typeof fsScandir.scandirSync = fsScandir.scandirSync;

	private readonly _storage: Set<Entry> = new Set();
	private readonly _queue: Set<QueueItem> = new Set();

	public read(): Entry[] {
		this._pushToQueue(this._root, this._settings.basePath);
		this._handleQueue();

		return Array.from(this._storage);
	}

	private _pushToQueue(dir: string, base?: string): void {
		this._queue.add({ dir, base });
	}

	private _handleQueue(): void {
		for (const item of this._queue.values()) {
			this._handleDirectory(item.dir, item.base);
		}
	}

	private _handleDirectory(dir: string, base?: string): void {
		try {
			const entries = this._scandir(dir, this._settings.fsScandirSettings);

			for (const entry of entries) {
				this._handleEntry(entry, base);
			}
		} catch (error) {
			this._handleError(error as Errno);
		}
	}

	private _handleError(error: Errno): void {
		if (!common.isFatalError(this._settings, error)) {
			return;
		}

		throw error;
	}

	private _handleEntry(entry: Entry, base?: string): void {
		const fullpath = entry.path;

		if (base !== undefined) {
			entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
		}

		if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
			this._pushToStorage(entry);
		}

		if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
			this._pushToQueue(fullpath, entry.path);
		}
	}

	private _pushToStorage(entry: Entry): void {
		this._storage.add(entry);
	}
}
