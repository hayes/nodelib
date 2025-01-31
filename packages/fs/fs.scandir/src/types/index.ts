import * as fs from 'fs';

export interface Entry {
	dirent: Dirent;
	name: string;
	path: string;
	stats?: Stats;
}

export type Stats = fs.Stats;

export interface Dirent {
	name: string;

	isBlockDevice(): boolean;
	isCharacterDevice(): boolean;
	isDirectory(): boolean;
	isFIFO(): boolean;
	isFile(): boolean;
	isSocket(): boolean;
	isSymbolicLink(): boolean;
}
