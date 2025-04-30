/**
 * Main entry point for the insurance library
 */

import { AutoInsuranceApplicant } from './models/AutoInsuranceApplicant';
import { GenericAutoInsurancePolicy } from './models/GenericAutoInsurancePolicy';

/**
 * Calculates the annual premium for an insurance policy using the GenericAutoInsurancePolicy implementation
 * @param age The age of the applicant
 * @param vehicleYear The year of the vehicle
 * @param accidentsLast5Yrs The number of accidents in the past 5 years
 * @param ticketsLast3Yrs The number of tickets in the past 3 years
 * @param zip The zip code of the applicant
 * @returns The calculated annual premium
 */
export function calculatePremium(
  age: number,
  vehicleYear: number,
  accidentsLast5Yrs: number,
  ticketsLast3Yrs: number,
  zip: string
): number {
  const policy = new GenericAutoInsurancePolicy();
  const applicant: AutoInsuranceApplicant = {
    age,
    vehicleYear,
    accidentsLast5Yrs,
    ticketsLast3Yrs,
    zip,
  };
  return policy.calculatePremium(applicant);
}
