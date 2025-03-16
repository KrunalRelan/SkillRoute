// enquiry.ts
import { Facility } from "../models/Facility"; // Adjust import path as needed

export interface Enquiry {
  id?: number | null;
  companyName: string;
  enquirerName: string;
  addressLine: string;
  email: string;
  areaOfTraining: string;
  numberOfHours: number;
  numberOfDays: number;
  pricePerSession: number;
  pricePerDay: number;
  trainingLevel: string;
  numberOfPeopleToTrain: number;
  numberOfBatches: number;
  time: string;
  day: string;
  month: string;
  companyId?: number | null;
  facilities: Facility;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  categoryName: string;
  categoryId: number;
}
