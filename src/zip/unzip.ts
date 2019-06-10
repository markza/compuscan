import * as fs from 'fs';
import isEmpty from 'lodash/isEmpty';
import unzipper from 'unzipper';

export interface IZipResult {
  filename?: string;
  contents?: string;
}

export const unZipToFile = async (
  compressedBuffer: Buffer,
  destinationFolder: string,
): Promise<IZipResult> => {
  const directory = await unzipper.Open.buffer(compressedBuffer);
  return new Promise((resolve, reject) => {
    if (isEmpty(directory.files)) {
      resolve({
        contents: '',
      });
    }
    const file = directory.files[0];
    const fullPath = `${destinationFolder}/${file.path}`;
    file
      .stream()
      .pipe(fs.createWriteStream(fullPath))
      .on('error', reject)
      .on('finish', () => {
        resolve({
          filename: file.path,
        });
      });
  });
};

export const unZipToString = async (compressedBuffer: Buffer): Promise<IZipResult> => {
  const directory = await unzipper.Open.buffer(compressedBuffer);
  return new Promise(async resolve => {
    if (isEmpty(directory.files)) {
      resolve({
        contents: '',
      });
    }
    const file = directory.files[0];
    const content = await file.buffer();
    resolve({
      contents: content.toString(),
      filename: file.path,
    });
  });
};
