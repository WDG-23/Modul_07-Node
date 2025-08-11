import { access, unlink } from 'node:fs/promises';

const filepath = process.argv[2];

console.log(filepath);

const deleteFileByName = async (filepath) => {
  try {
    await access(filepath);
    await unlink(filepath);
  } catch (error) {
    console.log(error);
  }
};

deleteFileByName(filepath);
