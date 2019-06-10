import { createRequest, IServerInfo, query } from '../request';
import { queryXML, testQueryDetails } from './query.test';

describe('enquiry-request', () => {
  it('should return valid xml', () => {
    const queryString = query(testQueryDetails);
    const serverInfo: IServerInfo = {
      origin: 'ACME',
      password: 'pass',
      username: '1234',
    };
    const soapQuery = createRequest(serverInfo, queryString);
    expect(soapQuery).toEqualXML(`
     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webServices/">
      <soapenv:Header/>
      <soapenv:Body>
        <web:DoNormalEnquiry>
          <request>
            <pUsrnme>1234</pUsrnme>
            <pPasswrd>pass</pPasswrd>
            <pVersion>1.0</pVersion>
            <pOrigin>ACME</pOrigin>
            <pOrigin_Version>1.0</pOrigin_Version>
            <pInput_Format>XML</pInput_Format>
            <pTransaction>
              <![CDATA[
            <Transactions><Search_Criteria>${queryXML}</Search_Criteria></Transactions>
          ]]>
            </pTransaction>
          </request>
        </web:DoNormalEnquiry>
      </soapenv:Body>
    </soapenv:Envelope>
    `);
  });
});
