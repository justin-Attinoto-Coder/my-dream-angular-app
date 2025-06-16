import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a string', () => {
    expect(pipe.transform('hello')).toBe('Hello');
    expect(pipe.transform('world')).toBe('World');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return null for null input', () => {
    expect(pipe.transform(null)).toBe(null);
  });
});
