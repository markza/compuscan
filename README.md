# Compuscan

[![CircleCI](https://circleci.com/gh/markza/compuscan.svg?style=svg)](https://circleci.com/gh/markza/compuscan)

## Installation

Install the dependencies

```bash
npm install compuscan
```

## Usage

### Basic Usage

```typescript
  import { enquiry, IServerInfo, ResultType } from 'compuscan';

  const serverInfo: IServerInfo = {
    username: 'YOURUSERNAME',
    password: 'PASSWORD',
    origin: 'COMPANY NAME',
  };

  const response = await enquiry(serverInfo, {
    idNumber: '12345',
    foreName: 'foreNameExample',
    surname: 'surnameExample',
    address1: 'address1Example',
    address2: 'address2Example',
    postCode: '1234',
    resultType: ResultType.JSON,
  });

  console.log(response);
```

## LICENSE
MIT
