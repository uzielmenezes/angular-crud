import { CategoryPipe } from './category.pipe';

describe('CategoryPipe', () => {
  let pipe: CategoryPipe;

  beforeEach(() => {
    pipe = new CategoryPipe();
  });

  it('should transform "front-end" to "code"', () => {
    const result = pipe.transform('front-end');
    expect(result).toBe('code');
  });

  it('should transform "back-end" to "computer"', () => {
    const result = pipe.transform('back-end');
    expect(result).toBe('computer');
  });

  it('should transform any other value to "code"', () => {
    const result = pipe.transform('other');
    expect(result).toBe('code');
  });
});
