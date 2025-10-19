import { TestBed } from '@angular/core/testing';

import { Instructorservice } from './instructorservice';

describe('Instructorservice', () => {
  let service: Instructorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Instructorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
