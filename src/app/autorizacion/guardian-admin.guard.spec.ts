import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardianAdminGuard } from './guardian-admin.guard';

describe('guardianAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardianAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
