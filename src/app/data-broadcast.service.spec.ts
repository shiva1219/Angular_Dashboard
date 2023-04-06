import { TestBed, inject } from '@angular/core/testing';

import { DataBroadcastService } from './data-broadcast.service';

describe('DataBroadcastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataBroadcastService]
    });
  });

  it('should be created', inject([DataBroadcastService], (service: DataBroadcastService) => {
    expect(service).toBeTruthy();
  }));
});
