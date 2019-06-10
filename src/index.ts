import { createRequest, IQuery, IServerInfo, query, ResultType } from './request';
import { ITransaction, processResponse } from './response';
import { doSoapRequest } from './soap';

export { IServerInfo, ResultType };

export const enquiry = async (
  serverInfo: IServerInfo,
  creditQuery: IQuery,
  destinationFolder?: string,
): Promise<ITransaction> => {
  const baseUrl = serverInfo.production
    ? 'webservices.compuscan.co.za'
    : 'webservices-uat.compuscan.co.za';
  const url = `https://${baseUrl}/NormalSearchService?wsdl`;
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: `https://${baseUrl}/NormalSearchService?wsdl#DoNormalEnquiry`,
  };
  const queryString = query(creditQuery);
  const soapQuery = createRequest(serverInfo, queryString);
  try {
    const response = await doSoapRequest(url, headers, soapQuery);
    const result = processResponse(response, creditQuery.resultType, destinationFolder);
    return result;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};
