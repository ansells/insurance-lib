/**
 * Represents an applicant for auto insurance
 */
export interface AutoInsuranceApplicant {
  /**
   * Age of the applicant
   */
  age: number;

  /**
   * Zip code of the applicant's address where the vehicle will reside
   */
  zip: string;

  /**
   * Model year of the vehicle
   */
  vehicleYear: number;

  /**
   * Number of accidents in the past 5 years
   */
  accidentsLast5Yrs: number;

  /**
   * Number of tickets in the past 3 years
   */
  ticketsLast3Yrs: number;
}
