import { TestBed } from '@angular/core/testing';

import { PreventUnsaveGuard } from './prevent-unsave.guard';

describe('PreventUnsaveGuard', () => {
  let guard: PreventUnsaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventUnsaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
