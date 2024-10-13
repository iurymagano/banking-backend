export interface RegisterAccountIca {
  name: string;
  document: string;
  accountType: 'PERSONAL' | 'BUSINESS';
}

export type DataCreateAccount = {
  id: string;
  branch: string;
  number: string;
  tenantId: string;
  accountId: string;
};

export interface IcaRequestApi {
  path: string;
  request: RequestObject;
  headers: object;
}

export type RequestObject = {
  url: string;
  headers: object;
  data: object;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};
