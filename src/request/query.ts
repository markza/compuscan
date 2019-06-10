export enum Gender {
  Male = 'M',
  Female = 'F',
}

export enum ResultType {
  XML = 'XML',
  JSON = 'JSON',
  HTML = 'HTML',
  XHML = 'XHTML',
  XMHT = 'XMHT',
  XPDF = 'XPDF',
  PDF2 = 'PDF2',
  XPDF2 = 'XPDF2',
  JPDF2 = 'JPDF2',
  PDF3 = 'PDF3',
  XPDF3 = 'XPDF3',
  JPDF3 = 'JPDF3',
}

export enum EnquiryPurpose {
  FraudInvestigation = '1',
  FraudPrevention = '2',
  Employment = '3',
  BookAssessment = '4',
  CreditLimit = '5',
  InsuranceApplication = '6',
  EducationEmployment = '7',
  UnclaimedFunds = '8',
  Tracing = '9',
  ScoreDevelopment = '10',
  AffordabilityAssessment = '11',
  CreditAssessment = '12',
  DebtReview = '13',
  MarketingServices = '14',
  DebtCollection = '15',
  AccountManagement = '16',
  CreditOmbudEnquiry = '17',
  ConsumerEnquiry = '18',
  Other = '19',
}

export interface IQuery {
  idNumber: string;
  surname: string;
  foreName: string;
  foreName2?: string;
  foreName3?: string;
  gender?: Gender;
  passport?: boolean;
  dob?: string;
  address1: string;
  address2: string;
  address3?: string;
  address4?: string;
  postCode: string;
  telHomeCode?: string;
  telHomeNumber?: string;
  telWorkCode?: string;
  telWorkNumber?: string;
  cellNumber?: string;
  resultType?: ResultType;
  csData?: boolean;
  cpaPlusNlrData?: boolean;
  deedsData?: boolean;
  directorsData?: boolean;
  addressMandatory?: boolean;
  enquiryPurpose?: EnquiryPurpose;
  runCompuScore?: boolean;
  clientConsent?: boolean;
}

export const query = (input: IQuery) => {
  const csData = input.csData === undefined ? 'Y' : input.csData ? 'Y' : 'N';
  const cpaPlusNlrData =
    input.cpaPlusNlrData === undefined ? 'Y' : input.cpaPlusNlrData ? 'Y' : 'N';
  const deedsData = input.deedsData === undefined ? 'N' : input.deedsData ? 'Y' : 'N';
  const directorsData = input.directorsData === undefined ? 'N' : input.directorsData ? 'Y' : 'N';
  const addressMandatory =
    input.addressMandatory === undefined ? 'Y' : input.addressMandatory ? 'Y' : 'N';
  const runCompuScore = input.runCompuScore === undefined ? 'Y' : input.runCompuScore ? 'Y' : 'N';
  const clientConsent = input.clientConsent === undefined ? 'Y' : input.clientConsent ? 'Y' : 'N';
  return `<CS_Data>${csData}</CS_Data>
  <CPA_Plus_NLR_Data>${cpaPlusNlrData}</CPA_Plus_NLR_Data>
  <Deeds_Data>${deedsData}</Deeds_Data>
  <Directors_Data>${directorsData}</Directors_Data>
  <Identity_number>${input.idNumber}</Identity_number>
  <Surname>${input.surname || ''}</Surname>
  <Forename>${input.foreName || ''}</Forename>
  <Forename2>${input.foreName2 || ''}</Forename2>
  <Forename3>${input.foreName3 || ''}</Forename3>
  <Gender>${input.gender || Gender.Male}</Gender>
  <Passport_flag>${input.passport ? 'Y' : 'N'}</Passport_flag>
  <DateOfBirth>${input.dob || ''}</DateOfBirth>
  <Address1>${input.address1 || ''}</Address1>
  <Address2>${input.address2 || ''}</Address2>
  <Address3>${input.address3 || ''}</Address3>
  <Address4>${input.address4 || ''}</Address4>
  <PostalCode>${input.postCode || ''}</PostalCode>
  <HomeTelCode>${input.telHomeCode || ''}</HomeTelCode>
  <HomeTelNo>${input.telHomeNumber || ''}</HomeTelNo>
  <WorkTelCode>${input.telWorkCode || ''}</WorkTelCode>
  <WorkTelNo>${input.telWorkNumber || ''}</WorkTelNo>
  <CellTelNo>${input.cellNumber || ''}</CellTelNo>
  <ResultType>${input.resultType || ResultType.JSON}</ResultType>
  <RunCodix>N</RunCodix>
  <CodixParams></CodixParams>
  <Adrs_Mandatory>${addressMandatory}</Adrs_Mandatory>
  <Enq_Purpose>${input.enquiryPurpose || EnquiryPurpose.CreditAssessment}</Enq_Purpose>
  <Run_CompuScore>${runCompuScore}</Run_CompuScore>
  <ClientConsent>${clientConsent}</ClientConsent>`;
};
