import { TestBed, inject } from '@angular/core/testing';

import { PocketService } from './pocket.service';

describe('PocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PocketService]
    });
  });

  it('should ...', inject([PocketService], (service: PocketService) => {
    expect(service).toBeTruthy();
  }));
});
