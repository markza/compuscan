import get from 'lodash/get';
import { ResultType } from '../request';
import { IResponse } from '../soap';
import { convertToJson } from '../xml2js';
import { unZipToFile, unZipToString } from '../zip';

export interface ITransaction {
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
  result?: string;
  fileName?: string;
}

export const processResponse = async (
  response: IResponse,
  resultType: ResultType | undefined = ResultType.XML,
  destinationFolder?: string,
): Promise<ITransaction> => {
  const result = await convertToJson(response.response);
  const transaction = get(result, [
    'S:Envelope',
    'S:Body',
    '0',
    'ns2:DoNormalEnquiryResponse',
    '0',
    'TransReplyClass',
    '0',
  ]);
  if (get(transaction, ['transactionCompleted', '0']) === 'false') {
    return processError(transaction);
  }
  return processSuccessTransaction(transaction, resultType, destinationFolder);
};

const processError = (transaction: any): ITransaction => {
  return {
    errorCode: get(transaction, ['errorCode', '0']),
    errorMessage: get(transaction, ['errorString', '0']),
    success: false,
  };
};

const processSuccessTransaction = async (
  transaction: any,
  resultType: ResultType,
  destinationFolder?: string,
): Promise<ITransaction> => {
  const base64Response = transaction.retData[0];
  const buffer = Buffer.from(base64Response, 'base64');
  if (destinationFolder) {
    const zipResult = await unZipToFile(buffer, destinationFolder);
    return {
      fileName: zipResult.filename,
      result: zipResult.contents,
      success: true,
    };
  } else {
    const zipResult = await unZipToString(buffer);
    let contents = zipResult.contents;
    if (resultType === ResultType.JSON) {
      contents = JSON.parse(contents as string);
    }
    return {
      fileName: zipResult.filename,
      result: contents,
      success: true,
    };
  }
};
