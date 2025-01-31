import * as assert from 'assert';

import * as fs from './adapters/fs';
import Settings from './settings';

const noop = () => undefined;

describe('Settings', () => {
	it('should return instance with default values', () => {
		const settings = new Settings();

		assert.deepStrictEqual(settings.fs, fs.createFileSystemAdapter());
		assert.ok(settings.throwErrorOnBrokenSymbolicLink);
		assert.ok(!settings.markSymbolicLink);
		assert.ok(settings.followSymbolicLink);
	});

	it('should return instance with custom values', () => {
		const lstatSync = noop as unknown as typeof fs.FILE_SYSTEM_ADAPTER.lstatSync;

		const settings = new Settings({
			followSymbolicLink: false,
			fs: fs.createFileSystemAdapter({ lstatSync }),
			throwErrorOnBrokenSymbolicLink: false
		});

		assert.deepStrictEqual(settings.fs, fs.createFileSystemAdapter({ lstatSync }));
		assert.ok(!settings.throwErrorOnBrokenSymbolicLink);
		assert.ok(!settings.followSymbolicLink);
	});
});
