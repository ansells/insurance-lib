import { AutoInsurancePolicy } from './AutoInsurancePolicy';

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
   * Calculates the surcharge for vehicles older than 5 years
   * Based on this requirement:
   * • Vehicle age surcharge: +$20 for each year the car’s age > 5
   * @param vehicleAge The age of the vehicle
   * @returns The surcharge amount
   */
  protected vehicleAgeSurcharge(vehicleAge: number): number {
    const yearsOverFive = Math.max(0, vehicleAge - 5);
    return yearsOverFive * 20;
  }

  /**
   * Calculates the driver age modifier
   * Based on this requirement:
   * • Driver age modifier: +$50 if age < 25; –$10 if age > 50
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
   * Based on this requirement:
   * • Violation fees: $100 for each accident, $25 for each ticket
   * @param accidentCount The number of accidents
   * @param ticketCount The number of tickets
   * @returns The total violation fees
   */
  protected violationFees(accidentCount: number, ticketCount: number): number {
    return accidentCount * 100 + ticketCount * 25;
  }

  /**
   * Calculates the location factor. This is a helper method that returns the location factor for the given zip code
   * from the LOCATION_FACTORS map. If the zip code is not found in the map, it returns 1.0 as the default location factor.
   * @param zip The zip code
   * @returns The location factor
   */
  protected locationFactor(zip: string): number {
    return GenericAutoInsurancePolicy.LOCATION_FACTORS[zip] || 1.0;
  }
}
