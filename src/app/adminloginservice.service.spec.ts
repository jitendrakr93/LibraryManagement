/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminloginserviceService } from './adminloginservice.service';

describe('AdminloginserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminloginserviceService]
    });
  });

  it('should ...', inject([AdminloginserviceService], (service: AdminloginserviceService) => {
    expect(service).toBeTruthy();
  }));
});
