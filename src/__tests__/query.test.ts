import 'jest-xml-matcher';
import { query } from '../request';

export const queryXML = `<CS_Data>Y</CS_Data>
  <CPA_Plus_NLR_Data>Y</CPA_Plus_NLR_Data>
  <Deeds_Data>N</Deeds_Data>
  <Directors_Data>N</Directors_Data>
  <Identity_number>1234</Identity_number>
  <Surname>test2</Surname>
  <Forename>test</Forename>
  <Forename2></Forename2>
  <Forename3></Forename3>
  <Gender>M</Gender>
  <Passport_flag>N</Passport_flag>
  <DateOfBirth></DateOfBirth>
  <Address1>address1</Address1>
  <Address2>address2</Address2>
  <Address3></Address3>
  <Address4></Address4>
  <PostalCode>1234</PostalCode>
  <HomeTelCode></HomeTelCode>
  <HomeTelNo></HomeTelNo>
  <WorkTelCode></WorkTelCode>
  <WorkTelNo></WorkTelNo>
  <CellTelNo></CellTelNo>
  <ResultType>JSON</ResultType>
  <RunCodix>N</RunCodix>
  <CodixParams></CodixParams>
  <Adrs_Mandatory>Y</Adrs_Mandatory>
  <Enq_Purpose>12</Enq_Purpose>
  <Run_CompuScore>Y</Run_CompuScore>
  <ClientConsent>Y</ClientConsent>`;

export const testQueryDetails = {
  address1: 'address1',
  address2: 'address2',
  foreName: 'test',
  idNumber: '1234',
  postCode: '1234',
  surname: 'test2',
};

describe('query', () => {
  it('should return valid xml', () => {
    const testQuery = query(testQueryDetails);
    expect(testQuery).toEqualXML(queryXML);
  });
});
