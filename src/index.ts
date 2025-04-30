/**
 * Main entry point for the insurance library
 */

import { InsuranceValidationError } from './exceptions/InsuranceValidationError';
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
 * @throws {InsuranceValidationError} If any of the input parameters are invalid
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

  try {
    return policy.calculatePremium(applicant);
  } catch (error) {
    if (error instanceof InsuranceValidationError) {
      throw error;
    }
    throw new InsuranceValidationError('An unknown error occurred while calculating the premium.');
  }
}

// Re-export the error types for consumers of the library
export { InsuranceValidationError } from './exceptions/InsuranceValidationError';
