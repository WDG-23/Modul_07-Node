import { existsSync } from 'node:fs';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const padNum = (num) => String(num).padStart(2, '0');

const args = process.argv.slice(2);

const createFileWithMessage = async (message) => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = padNum(date.getMonth() + 1);
  const dd = padNum(date.getDate());

  const directory = path.join(import.meta.dirname, `${yyyy}-${mm}-${dd}`);

  if (!existsSync(directory)) {
    await mkdir(directory);
  }

  const hour = padNum(date.getHours());
  const min = padNum(date.getMinutes());

  const fileName = `${hour}-${min}.txt`;
  const filePath = path.join(directory, fileName);

  try {
    await appendFile(filePath, message + '\n');
  } catch (error) {
    console.log(error);
  }
};

if (args.length === 0) {
  console.log('User input required');
  process.exit(1);
}
createFileWithMessage(args.join(' '));

// console.log(new Date().toISOString().split('T')[0]);
//  ./yyyy-mm-dd/
// ./2025-08-11/
