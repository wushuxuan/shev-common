import { TestBed } from '@angular/core/testing';

import { ShevCommonService } from './shev-common.service';

describe('ShevCommonService', () => {
  let service: ShevCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShevCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
