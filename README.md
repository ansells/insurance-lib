# Insurance Library

A TypeScript library for calculating auto insurance premiums based on various factors including driver age, vehicle age, driving history, and location.

## Installation

```bash
npm install insurance-lib
```

## Usage

```typescript
import { calculatePremium, InsuranceValidationError } from 'insurance-lib';

try {
  // Calculate premium for a 30-year-old driver with a 2020 vehicle
  const premium = calculatePremium(
    30, // age
    2020, // vehicle year
    0, // accidents in last 5 years
    0, // tickets in last 3 years
    '98115' // zip code
  );

  console.log(`Annual premium: $${premium}`);
} catch (error) {
  if (error instanceof InsuranceValidationError) {
    console.error('Invalid input:', error.message);
    // Handle specific validation errors
    // - InvalidAgeError: Age must be between 16 and 100
    // - InvalidVehicleYearError: Vehicle year must be between 1900 and current year
    // - InvalidZipError: Zip code must be a 5-digit number
    // - TooManyTicketsError: Maximum 5 tickets in last 3 years
    // - TooManyAccidentsError: Maximum 3 accidents in last 5 years
  } else {
    console.error('An unexpected error occurred:', error);
  }
}
```

## Features

- Base premium calculation
- Vehicle age surcharges
- Driver age modifiers
- Violation fees for accidents and tickets
- Location-based multipliers

## API

### `calculatePremium(age: number, vehicleYear: number, accidentsLast5Yrs: number, ticketsLast3Yrs: number, zip: string): number`

Calculates the annual premium for an auto insurance policy.

#### Parameters

- `age`: The age of the applicant
- `vehicleYear`: The model year of the vehicle
- `accidentsLast5Yrs`: Number of accidents in the past 5 years
- `ticketsLast3Yrs`: Number of tickets in the past 3 years
- `zip`: Zip code where the vehicle will be located

#### Returns

The calculated annual premium amount.

#### Errors

- `InsuranceValidationError`: Thrown when the input parameters are invalid
  - `InvalidAgeError`: Age must be between 16 and 100
  - `InvalidVehicleYearError`: Vehicle year must be between 1900 and current year
  - `InvalidZipError`: Zip code must be a 5-digit number
  - `TooManyTicketsError`: Maximum 5 tickets in last 3 years
  - `TooManyAccidentsError`: Maximum 3 accidents in last 5 years

### Design Decisions

- Defined an interface `AutoInsuranceApplicant` for the applicant to hold the applicant's data
- Implemented base class `AutoInsurancePolicy` for the insurance policy to allow for future extensibility
- Subclassed the base class with a generic implementation `GenericAutoInsurancePolicy` to implement the specific logic for the insurance policy based on the requirements
- Used a utility class `InsuranceValidator` to validate the input parameters
- Added a test suite `index.test.ts` to validate the functionality of the library and ensure that it is working as expected including edge cases and exception handling

#### Future Improvements

- Implement different insurance policies with different rules and algorithms for calculating the premium
- Add a database to store the location factors and other related insurance policy data so policies can be modified and extended without changing the code
- Modify the main interface to allow for specifying an insurance policy when calculating the premium
- New APIs for calculating premiums for different types of insurance policies and comparing them
- Extend the applicant interface to allow for more complex applicant profiles
- Persist the applicant data in a database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
