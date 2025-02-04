export interface ClassClient {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  totalParticipants: number;
  totalAdults: number;
  totalChildren: number;
  totalPrice: number;
  totalPriceAdults: number;
  totalPriceChildren: number;
  languageClass: string;
  typeCurrency: string;
  dateClass: Date;
  scheduleClass: string;
  comments: string;
}

export type ClassesDataAdmin = {
  dateClass: string;
  scheduleClass: string;
  totalParticipants: number;
  languageClass: string;
  classes: ClassesData[];
};

export type ClassesData = {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  totalParticipants: number;
  totalAdults: number;
  totalChildren: number;
  totalPrice: number;
  totalPriceAdults: number;
  totalPriceChildren: number;
  languageClass: string;
  typeCurrency: string;
  dateClass: string;
  scheduleClass: string;
  comments: string;
  status: string;
};
