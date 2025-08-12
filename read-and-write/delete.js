import { access, unlink } from 'node:fs/promises';

// const filepath = process.argv[2];

const deleteFileByName = async (filepath) => {
  try {
    await access(filepath);
    await unlink(filepath);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default deleteFileByName;

// deleteFileByName(filepath);
