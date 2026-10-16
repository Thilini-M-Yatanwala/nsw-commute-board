import { validateReport } from '../src/validation/report.validation';
import { describe, it, expect } from 'vitest';

const stationIds = ['parramatta', 'central'];

const validReport = {
  stationId: 'parramatta',
  category: 'lift',
  description: 'Lift on platform 2 not working',
};

describe('validateReport', () => {
  it('returns no errors for a valid report', () => {
    expect(validateReport(validReport, stationIds)).toEqual({});
  });

  it('rejects a description shorter than 10 characters', () => {
    const errors = validateReport({ ...validReport, description: 'Broken' }, stationIds);
    expect(errors.description).toBe('Description must be at least 10 characters');
  });

  it('rejects a description longer than 500 characters', () => {
    const errors = validateReport({ ...validReport, description: 'a'.repeat(501) }, stationIds);
    expect(errors.description).toBe('Description must be at most 500 characters');
  });

  it('treats a description of only spaces as empty', () => {
    const errors = validateReport({ ...validReport, description: '            ' }, stationIds);
    expect(errors.description).toBe('Description must be at least 10 characters');
  });

  it('rejects an unknown category', () => {
    const errors = validateReport({ ...validReport, category: 'aliens' }, stationIds);
    expect(errors.category).toBe('Choose a valid category');
  });

  it('rejects an unknown station', () => {
    const errors = validateReport({ ...validReport, stationId: 'hogwarts' }, stationIds);
    expect(errors.stationId).toBe('Station not found');
  });

  it('returns every problem at once', () => {
    const errors = validateReport(
      { stationId: 'hogwarts', category: 'aliens', description: 'Broken' },
      stationIds,
    );
    expect(Object.keys(errors)).toHaveLength(3);
  });

  it('handles a missing request body', () => {
    expect(validateReport(undefined, stationIds)).toEqual({
      stationId: 'Station not found',
      category: 'Choose a valid category',
      description: 'Description must be at least 10 characters',
    });
  });
});