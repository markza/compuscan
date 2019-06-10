import axios from 'axios';

export interface IResponse {
  response: string;
  statusCode?: number;
}

export const doSoapRequest = async (
  url: string,
  headers: any,
  xml: string,
  timeout = 10000,
): Promise<IResponse> => {
  try {
    const response = await axios({
      data: xml,
      headers,
      method: 'post',
      timeout,
      url,
    });
    return {
      response: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    if (error.response) {
      throw {
        response: error.response.data,
      };
    } else {
      throw error;
    }
  }
};
