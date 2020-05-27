import { TestBed } from '@angular/core/testing';

import { FarmaciasServiceService } from './farmacias-service.service';

describe('FarmaciasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmaciasServiceService = TestBed.get(FarmaciasServiceService);
    expect(service).toBeTruthy();
  });
});
