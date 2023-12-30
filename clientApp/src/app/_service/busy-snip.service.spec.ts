import { TestBed } from '@angular/core/testing';

import { BusySnipService } from './busy-snip.service';

describe('BusySnipService', () => {
  let service: BusySnipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusySnipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
