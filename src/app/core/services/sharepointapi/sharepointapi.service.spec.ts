import { TestBed } from '@angular/core/testing';

import { SharepointapiService } from './sharepointapi.service';

describe('SharepointapiService', () => {
  let service: SharepointapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharepointapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
