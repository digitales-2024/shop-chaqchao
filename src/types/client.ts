export type ClientGoogleData = {
  name: string;
  email: string;
  token: string;
};

export type ClientData = {
  id: string;
  name: string;
  email: string;
};
export type ClientPayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  isGoogleAuth: boolean;
  lastLogin: string;
  isActive: boolean;
};

export type ClientDataUpdate = {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
};