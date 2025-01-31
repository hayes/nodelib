const NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.');

const MAJOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
const MINOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);

/**
 * IS `true` for Node.js 10.10 and greater.
 */
export const IS_SUPPORT_READDIR_WITH_FILE_TYPES = MAJOR_VERSION >= 10 || (MAJOR_VERSION === 10 && MINOR_VERSION >= 10);
