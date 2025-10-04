import { TestBed } from '@angular/core/testing';

import { Videoservice } from './videoservice';

describe('Videoservice', () => {
  let service: Videoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Videoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
