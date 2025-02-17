import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardianExpertoGuard } from './guardian-experto.guard';

describe('guardianExpertoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardianExpertoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
