import { TestBed } from '@angular/core/testing';
import { SorterService } from './sorter.service';

describe('SorterService', () => {
  let service: SorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SorterService]
    });
    service = TestBed.inject(SorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort array by property ascending and descending', () => {
    const collection = [
      { id: 1, name: 'Charlie' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' }
    ];

    service.sort(collection, 'name');
    expect(collection[0].name).toBe('Alice');
    expect(collection[1].name).toBe('Bob');
    expect(collection[2].name).toBe('Charlie');

    service.sort(collection, 'name');
    expect(collection[0].name).toBe('Charlie');
    expect(collection[1].name).toBe('Bob');
    expect(collection[2].name).toBe('Alice');
  });

  it('should handle nested properties', () => {
    const collection = [
      { id: 1, details: { name: 'Charlie' } },
      { id: 2, details: { name: 'Alice' } },
      { id: 3, details: { name: 'Bob' } }
    ];

    service.sort(collection, 'details.name');
    expect(collection[0].details.name).toBe('Alice');
    expect(collection[1].details.name).toBe('Bob');
    expect(collection[2].details.name).toBe('Charlie');
  });
});
