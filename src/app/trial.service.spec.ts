import { TestBed } from '@angular/core/testing';

import { TrialService } from './trial.service';

describe('TrialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrialService = TestBed.get(TrialService);
    expect(service).toBeTruthy();
  });
});
