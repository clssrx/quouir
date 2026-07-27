import { describe, it, expect } from 'vitest';
import { formatItalianDate } from '@/utils/formatting';

describe('formatItalianDate', () => {
	it('should format date to Italian format', () => {
		const date = '2024-12-25T10:00:00Z';
		const result = formatItalianDate(date);

		expect(result).toBe('25 dicembre 2024');
	});

	it('should handle different dates correctly', () => {
		const date = '2024-01-01T00:00:00Z';
		const result = formatItalianDate(date);

		expect(result).toContain('gennaio');
		expect(result).toContain('2024');
	});

	it('should return null for undefined date', () => {
		const result = formatItalianDate(undefined);
		expect(result).toBeNull();
	});

	it('should return null for null date', () => {
		const result = formatItalianDate(null);
		expect(result).toBeNull();
	});

	it('should handle empty string as null', () => {
		const result = formatItalianDate('');
		expect(result).toBeNull();
	});

	it('should parse ISO date strings correctly', () => {
		const date = '2024-06-15T14:30:00Z';
		const result = formatItalianDate(date);

		expect(result).toContain('15');
		expect(result).toContain('giugno');
		expect(result).toContain('2024');
	});
});
