import { calculatePremium, InsuranceValidationError } from './index';

describe('calculatePremium', () => {
  describe('Drivers by age', () => {
    it('should return the base premium for a 30 year old', () => {
      const result = calculatePremium(30, 2020, 0, 0, '98115');
      expect(result).toBe(500);
    });

    it('should return the base premium + $50 for a 24 year old', () => {
      const result = calculatePremium(24, 2020, 0, 0, '98115');
      expect(result).toBe(550);
    });

    it('should return the base premium - $10 for a 51 year old', () => {
      const result = calculatePremium(51, 2020, 0, 0, '98115');
      expect(result).toBe(490);
    });
  });

  describe('Drivers by vehicle age', () => {
    const currentYear = new Date().getFullYear();
    it('should return the base premium for a brand new vehicle', () => {
      const result = calculatePremium(30, currentYear, 0, 0, '98115');
      expect(result).toBe(500);
    });

    it('should return the base premium for a 5 year vehicle', () => {
      const result = calculatePremium(30, currentYear - 5, 0, 0, '98115');
      expect(result).toBe(500);
    });

    it('should return the base premium + $20 for a 6 year old vehicle', () => {
      const result = calculatePremium(30, currentYear - 6, 0, 0, '98115');
      expect(result).toBe(520);
    });

    it('should return the base premium + $200 for a 15 year old vehicle', () => {
      const result = calculatePremium(30, currentYear - 15, 0, 0, '98115');
      expect(result).toBe(700);
    });
  });

  describe('Drivers by location', () => {
    it('should return the base premium for a zip code of 98115', () => {
      const result = calculatePremium(30, 2020, 0, 0, '98115');
      expect(result).toBe(500);
    });

    it('should return the base premium * 1.05 for a zip code of 98109', () => {
      const result = calculatePremium(30, 2020, 0, 0, '98109');
      expect(result).toBe(525);
    });

    it('should return the base premium * 1.02 for a zip code of 98101', () => {
      const result = calculatePremium(30, 2020, 0, 0, '98101');
      expect(result).toBe(510);
    });

    it('should return the base premium * 1.10 for a zip code of 94123', () => {
      const result = calculatePremium(30, 2020, 0, 0, '94123');
      expect(result).toBe(550);
    });

    it('should return the base premium * 0.99 for a zip code of 96161', () => {
      const result = calculatePremium(30, 2020, 0, 0, '96161');
      expect(result).toBe(495);
    });

    it('should return the base premium for unknown a zip code of 11245', () => {
      const result = calculatePremium(30, 2020, 0, 0, '98115');
      expect(result).toBe(500);
    });
  });

  describe('Drivers by violations', () => {
    it('should return the base premium for a driver with no violations', () => {
      const result = calculatePremium(30, 2020, 0, 0, '98115');
      expect(result).toBe(500);
    });

    it('should return the base premium + $100 for a driver with 1 accident', () => {
      const result = calculatePremium(30, 2020, 1, 0, '98115');
      expect(result).toBe(600);
    });

    it('should return the base premium + $25 for a driver with 1 ticket', () => {
      const result = calculatePremium(30, 2020, 0, 1, '98115');
      expect(result).toBe(525);
    });

    it('should return the base premium + $125 for a driver with 1 accident and 1 ticket', () => {
      const result = calculatePremium(30, 2020, 1, 1, '98115');
      expect(result).toBe(625);
    });

    it('should return the base premium + $275 for a driver with 2 accidents and 3 tickets', () => {
      const result = calculatePremium(30, 2020, 2, 3, '98115');
      expect(result).toBe(775);
    });
  });

  describe('Invalid input', () => {
    it('should throw an error for an invalid age', () => {
      expect(() => calculatePremium(15, 2020, 0, 0, '98115')).toThrow(InsuranceValidationError);
    });

    it('should throw an error for an invalid vehicle year', () => {
      expect(() => calculatePremium(30, 1899, 0, 0, '98115')).toThrow(InsuranceValidationError);
    });

    it('should throw an error for too many accidents', () => {
      expect(() => calculatePremium(30, 2020, 4, 0, '98115')).toThrow(InsuranceValidationError);
    });

    it('should throw an error for too many tickets', () => {
      expect(() => calculatePremium(30, 2020, 0, 6, '98115')).toThrow(InsuranceValidationError);
    });

    it('should throw an error for an invalid zip code', () => {
      expect(() => calculatePremium(30, 2020, 0, 0, 'SW1A 1AA')).toThrow(InsuranceValidationError);
    });
  });
});
