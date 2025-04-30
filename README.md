# Insurance Library

A TypeScript library for calculating auto insurance premiums based on various factors including driver age, vehicle age, driving history, and location.

## Installation

```bash
npm install insurance-lib
```

## Usage

```typescript
import { calculatePremium } from 'insurance-lib';

// Calculate premium for a 30-year-old driver with a 2020 vehicle
const premium = calculatePremium(
  30, // age
  2020, // vehicle year
  0, // accidents in last 5 years
  0, // tickets in last 3 years
  '98115' // zip code
);

console.log(`Annual premium: $${premium}`);
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
