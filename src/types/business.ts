export interface Business {
  businessHours: BusinessHour[];
  businessInfo: BusinessInfo;
}

export interface BusinessHour {
  id: string;
  dayOfWeek: DayOfWeek;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
}

export interface BusinessInfo {
  id: string;
  businessName: string;
  contactNumber: string;
  email: string;
  address: string;
}

enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}
