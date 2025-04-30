import {
  InvalidZipError,
  InvalidAgeError,
  InvalidVehicleYearError,
  TooManyTicketsError,
  TooManyAccidentsError,
} from '../exceptions/InsuranceValidationError';

/**
 * Utility class for validating insurance-related data
 */
export class InsuranceValidator {
  private static readonly ZIP_CODE_REGEX = /^\d{5}$/;

  /**
   * Validates a US zip code
   * @param zip The zip code to validate
   * @throws {InvalidZipError} If zip code is invalid
   */
  public static validateZip(zip: string): void {
    if (!this.ZIP_CODE_REGEX.test(zip)) {
      throw new InvalidZipError(zip);
    }
  }

  /**
   * Validates the applicant's age
   * @param age The age to validate
   * @param minAge Minimum allowed age
   * @param maxAge Maximum allowed age
   * @throws {InvalidAgeError} If age is invalid
   */
  public static validateAge(age: number, minAge: number, maxAge: number): void {
    if (age < minAge || age > maxAge) {
      throw new InvalidAgeError(age, minAge, maxAge);
    }
  }

  /**
   * Validates the vehicle year
   * @param year The year to validate
   * @param minYear Minimum allowed year
   * @param maxYear Maximum allowed year
   * @throws {InvalidVehicleYearError} If year is invalid
   */
  public static validateVehicleYear(year: number, minYear: number, maxYear: number): void {
    if (year < minYear || year > maxYear) {
      throw new InvalidVehicleYearError(year, minYear, maxYear);
    }
  }

  /**
   * Validates the number of accidents
   * @param count The number of accidents to validate
   * @param maxAccidents Maximum allowed number of accidents
   * @throws {TooManyAccidentsError} If count exceeds maximum
   */
  public static validateAccidents(count: number, maxAccidents: number): void {
    if (count < 0 || count > maxAccidents) {
      throw new TooManyAccidentsError(count, maxAccidents);
    }
  }

  /**
   * Validates the number of tickets
   * @param count The number of tickets to validate
   * @param maxTickets Maximum allowed number of tickets
   * @throws {TooManyTicketsError} If count exceeds maximum
   */
  public static validateTickets(count: number, maxTickets: number): void {
    if (count < 0 || count > maxTickets) {
      throw new TooManyTicketsError(count, maxTickets);
    }
  }
}
