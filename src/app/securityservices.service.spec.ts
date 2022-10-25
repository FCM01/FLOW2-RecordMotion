import { TestBed } from '@angular/core/testing';

import { SecurityservicesService } from './securityservices.service';

describe('SecurityservicesService', () => {
  let service: SecurityservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
