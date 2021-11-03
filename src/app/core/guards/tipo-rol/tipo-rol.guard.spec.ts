import { TestBed } from '@angular/core/testing';

import { TipoRolGuard } from './tipo-rol.guard';

describe('TipoRolGuard', () => {
  let guard: TipoRolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TipoRolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
