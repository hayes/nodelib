import * as assert from 'assert';
import * as path from 'path';

import * as fs from './adapters/fs';
import Settings from './settings';

const noop = () => { /* noop */ };

describe('Settings', () => {
	it('should return instance with default values', () => {
		const settings = new Settings();

		assert.deepStrictEqual(settings.fs, fs.createFileSystemAdapter());
		assert.ok(!settings.followSymbolicLinks);
		assert.ok(!settings.stats);
		assert.strictEqual(settings.pathSegmentSeparator, path.sep);
		assert.ok(settings.fsStatSettings);
		assert.ok(settings.throwErrorOnBrokenSymbolicLink);
	});

	it('should return instance with custom values', () => {
		const lstatSync = noop as unknown as typeof import('fs').lstatSync;

		const settings = new Settings({
			fs: fs.createFileSystemAdapter({ lstatSync }),
			stats: true
		});

		assert.deepStrictEqual(settings.fs, fs.createFileSystemAdapter({ lstatSync }));
		assert.ok(settings.stats);
	});
});
