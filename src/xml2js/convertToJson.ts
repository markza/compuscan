import { parseString } from 'xml2js';

export const convertToJson: any = (xml: string) => {
  return new Promise((resolve, reject) => {
    parseString(xml, (error: Error, result: any) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
