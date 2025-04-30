/**
 * Base class for all insurance validation errors
 */
export class InsuranceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InsuranceValidationError';
  }
}

/**
 * Error thrown when the applicant's age is invalid
 */
export class InvalidAgeError extends InsuranceValidationError {
  constructor(age: number, minAge: number, maxAge: number) {
    super(`Invalid age: ${age}. Age must be between ${minAge} and ${maxAge}.`);
    this.name = 'InvalidAgeError';
  }
}

/**
 * Error thrown when the vehicle year is invalid
 */
export class InvalidVehicleYearError extends InsuranceValidationError {
  constructor(year: number, minYear: number, maxYear: number) {
    super(`Invalid vehicle year: ${year}. Year must be between ${minYear} and ${maxYear}.`);
    this.name = 'InvalidVehicleYearError';
  }
}

/**
 * Error thrown when the zip code is invalid
 */
export class InvalidZipError extends InsuranceValidationError {
  constructor(zip: string) {
    super(`Invalid zip code: ${zip}. Zip code must be a 5-digit number.`);
    this.name = 'InvalidZipError';
  }
}

/**
 * Error thrown when there are too many tickets
 */
export class TooManyTicketsError extends InsuranceValidationError {
  constructor(ticketCount: number, maxTickets: number) {
    super(
      `Too many tickets: ${ticketCount}. Maximum allowed is ${maxTickets} tickets in the last 3 years.`
    );
    this.name = 'TooManyTicketsError';
  }
}

/**
 * Error thrown when there are too many accidents
 */
export class TooManyAccidentsError extends InsuranceValidationError {
  constructor(accidentCount: number, maxAccidents: number) {
    super(
      `Too many accidents: ${accidentCount}. Maximum allowed is ${maxAccidents} accidents in the last 5 years.`
    );
    this.name = 'TooManyAccidentsError';
  }
}

/**
 * Error thrown for general invalid input
 */
export class InvalidInputError extends InsuranceValidationError {
  constructor(message: string) {
    super(`Invalid input: ${message}`);
    this.name = 'InvalidInputError';
  }
}
