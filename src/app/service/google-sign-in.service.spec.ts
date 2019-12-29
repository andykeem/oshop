import { TestBed } from '@angular/core/testing';

import { GoogleSignInService } from './google-sign-in.service';

describe('GoogleSignInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleSignInService = TestBed.get(GoogleSignInService);
    expect(service).toBeTruthy();
  });
});
