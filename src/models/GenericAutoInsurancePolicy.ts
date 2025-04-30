import { AutoInsurancePolicy } from './AutoInsurancePolicy';
import { InsuranceValidator } from '../utils/InsuranceValidator';
import { AutoInsuranceApplicant } from './AutoInsuranceApplicant';

/**
 * A generic auto insurance policy that implements the AutoInsurancePolicy interface
 * This implementaiton defines the default algorithms for calculating the premium
 * and also has a hardcoded base insurance rate and location factors.
 * A subclass of this could retreive these values from a database or other source
 * and override the algorithms for calculating the premium or any of the factors
 * influencing the premium.
 */
export class GenericAutoInsurancePolicy extends AutoInsurancePolicy {
  /**
   * The base insurance rate for the policy
   * Based on this requirement:
   * • Base rate: $500
   */
  private static readonly BASE_RATE = 500;
  private static readonly MIN_AGE = 16;
  private static readonly MAX_AGE = 120;
  private static readonly MIN_VEHICLE_YEAR = 1900;
  private static readonly MAX_TICKETS = 5;
  private static readonly MAX_ACCIDENTS = 3;
  /**
   * The location factors for the policy
   * Based on this requirement:
   * • Location factor: apply a multiplier from this hard-coded map:
   * {
   * “98109”: 1.05,
   * “98101”: 1.02,
   * “98115”: 1.00
   * }
   * (feel free to include 3–5 ZIP codes in your map)
   */
  private static readonly LOCATION_FACTORS: Record<string, number> = {
    '98109': 1.05,
    '98101': 1.02,
    '98115': 1.0,
    '94123': 1.1,
    '96161': 0.99,
  };

  constructor() {
    super(GenericAutoInsurancePolicy.BASE_RATE);
  }

  /**
   * Validates all insurance applicant data according to this policy's rules
   * @param age The applicant's age
   * @param vehicleYear The vehicle's year
   * @param accidentsLast5Yrs Number of accidents in last 5 years
   * @param ticketsLast3Yrs Number of tickets in last 3 years
   * @param zip The zip code
   * @throws {InsuranceValidationError} If any validation fails
   */
  protected validateApplicant(
    age: number,
    vehicleYear: number,
    accidentsLast5Yrs: number,
    ticketsLast3Yrs: number,
    zip: string
  ): void {
    // Validate age
    InsuranceValidator.validateAge(
      age,
      GenericAutoInsurancePolicy.MIN_AGE,
      GenericAutoInsurancePolicy.MAX_AGE
    );

    // Validate vehicle year
    const currentYear = new Date().getFullYear();
    InsuranceValidator.validateVehicleYear(
      vehicleYear,
      GenericAutoInsurancePolicy.MIN_VEHICLE_YEAR,
      currentYear + 1
    );

    // Validate accidents
    InsuranceValidator.validateAccidents(
      accidentsLast5Yrs,
      GenericAutoInsurancePolicy.MAX_ACCIDENTS
    );

    // Validate tickets
    InsuranceValidator.validateTickets(ticketsLast3Yrs, GenericAutoInsurancePolicy.MAX_TICKETS);

    // Validate zip code
    InsuranceValidator.validateZip(zip);
  }

  /**
   * Calculates the surcharge for vehicles older than 5 years
   * @param vehicleAge The age of the vehicle
   * @returns The surcharge amount
   */
  protected vehicleAgeSurcharge(vehicleAge: number): number {
    const yearsOverFive = Math.max(0, vehicleAge - 5);
    return yearsOverFive * 20;
  }

  /**
   * Calculates the driver age modifier
   * @param age The age of the driver
   * @returns The modifier amount
   */
  protected driverAgeModifier(age: number): number {
    if (age < 25) {
      return 50;
    } else if (age > 50) {
      return -10;
    }
    return 0;
  }

  /**
   * Calculates the violation fees
   * @param accidentCount The number of accidents
   * @param ticketCount The number of tickets
   * @returns The total violation fees
   */
  protected violationFees(accidentCount: number, ticketCount: number): number {
    return accidentCount * 100 + ticketCount * 25;
  }

  /**
   * Calculates the location factor
   * @param zip The zip code
   * @returns The location factor
   */
  protected locationFactor(zip: string): number {
    return GenericAutoInsurancePolicy.LOCATION_FACTORS[zip] || 1.0;
  }

  /**
   * Override the base class method to include validation
   * @param applicant The auto insurance applicant
   * @returns The calculated premium cost
   * @throws {InsuranceValidationError} If the applicant data is invalid
   */
  public calculatePremium(applicant: AutoInsuranceApplicant): number {
    // Validate all inputs before calculation
    this.validateApplicant(
      applicant.age,
      applicant.vehicleYear,
      applicant.accidentsLast5Yrs,
      applicant.ticketsLast3Yrs,
      applicant.zip
    );

    return super.calculatePremium(applicant);
  }
}
