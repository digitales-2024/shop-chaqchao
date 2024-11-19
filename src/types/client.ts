export type ClientGoogleData = {
  name: string;
  email: string;
  token: string;
};

export type ClientData = {
  id: string;
  name: string;
  lastName?: string;
  phone: string;
  email: string;
  image?: string;
};
export type ClientPayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  isGoogleAuth: boolean;
  lastLogin: string;
  isActive: boolean;
};

export type ClientDataUpdate = {
  id: string;
  name: string;
  phone: string;
  birthDate: Date | null | undefined;
};
