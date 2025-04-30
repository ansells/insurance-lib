import { AutoInsuranceApplicant } from './AutoInsuranceApplicant';

/**
 * Abstract class representing an auto insurance policy
 */
export abstract class AutoInsurancePolicy {
  private readonly baseRate: number;

  /**
   * Creates a new AutoInsurancePolicy with the specified base rate
   * @param baseRate The base rate for the insurance policy
   */
  constructor(baseRate: number) {
    this.baseRate = baseRate;
  }

  /**
   * Calculates a surcharge based on the vehicle's age
   * This algorithm must be implemented by the subclass
   * @param vehicleYear The year of the vehicle
   * @returns The surcharge amount
   */
  protected abstract vehicleAgeSurcharge(vehicleYear: number): number;

  /**
   * Calculates a modifier based on the driver's age
   * This algorithm must be implemented by the subclass
   * @param age The age of the driver
   * @returns The age modifier amount
   */
  protected abstract driverAgeModifier(age: number): number;

  /**
   * Calculates fees based on driving violations
   * This algorithm must be implemented by the subclass
   * @param accidentCount Number of accidents in the past 5 years
   * @param ticketCount Number of tickets in the past 3 years
   * @returns The total violation fees
   */
  protected abstract violationFees(accidentCount: number, ticketCount: number): number;

  /**
   * Calculates a location-based multiplier
   * This algorithm must be implemented by the subclass
   * @param zip The zip code where the vehicle is located
   * @returns The location factor multiplier
   */
  protected abstract locationFactor(zip: string): number;

  /**
   * Calculates the premium cost for an auto insurance applicant
   * This algorithm may be overridden by the subclass, but this is the default implementation
   * that takes into account vehicle age, driver age, accidents, tickets, and the applicant's zip code
   * @param applicant The auto insurance applicant
   * @returns The calculated premium cost
   */
  public calculatePremium(applicant: AutoInsuranceApplicant): number {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - applicant.vehicleYear;

    const basePremium =
      this.baseRate +
      this.vehicleAgeSurcharge(vehicleAge) +
      this.driverAgeModifier(applicant.age) +
      this.violationFees(applicant.accidentsLast5Yrs, applicant.ticketsLast3Yrs);

    return basePremium * this.locationFactor(applicant.zip);
  }
}
