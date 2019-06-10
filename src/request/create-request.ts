export interface IServerInfo {
  username: string;
  password: string;
  origin: string;
  version?: string;
  originVersion?: string;
  production?: boolean;
}

export const createRequest = (serverInfo: IServerInfo, queryString: string) => {
  const inputFormat = 'XML';
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webServices/">
    <soapenv:Header/>
    <soapenv:Body>
      <web:DoNormalEnquiry>
        <request>
          <pUsrnme>${serverInfo.username}</pUsrnme>
          <pPasswrd>${serverInfo.password}</pPasswrd>
          <pVersion>${serverInfo.version || '1.0'}</pVersion>
          <pOrigin>${serverInfo.origin}</pOrigin>
          <pOrigin_Version>${serverInfo.originVersion || '1.0'}</pOrigin_Version>
          <pInput_Format>${inputFormat}</pInput_Format>
          <pTransaction>
          <![CDATA[
            <Transactions>
              <Search_Criteria>
                ${queryString}
              </Search_Criteria>
            </Transactions>
          ]]>
          </pTransaction>
        </request>
      </web:DoNormalEnquiry>
    </soapenv:Body>
  </soapenv:Envelope>`;
};
