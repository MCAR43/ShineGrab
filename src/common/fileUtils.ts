import { readFile, existsSync, exists, readFileSync } from 'fs';

// Expand function with safety nets
export const loadFileFromPath = (
    filePath: string,
    encoding: BufferEncoding = 'utf-8', // default to utf-8
): string | Buffer => {
    if (existsSync(filePath)) {
        return readFileSync(filePath, encoding);
    } else {
        throw Error('File Does Not Exist');
    }
} 