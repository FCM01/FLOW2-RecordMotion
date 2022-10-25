import { TestBed } from '@angular/core/testing';

import { ComservicesService } from './comservices.service';

describe('ComservicesService', () => {
  let service: ComservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
