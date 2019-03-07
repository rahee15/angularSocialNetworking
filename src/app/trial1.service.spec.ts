import { TestBed, inject } from '@angular/core/testing';

import { Trial1Service } from './trial1.service';

describe('Trial1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Trial1Service]
    });
  });

  it('should be created', inject([Trial1Service], (service: Trial1Service) => {
    expect(service).toBeTruthy();
  }));
});
