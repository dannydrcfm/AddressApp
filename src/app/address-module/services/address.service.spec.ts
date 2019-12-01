import { TestBed } from '@angular/core/testing';

import { AddressService } from './address.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AddressService', () => {
  let service: AddressService;
  let mockHttp: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(AddressService);
    mockHttp = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should make a get call to retrieve addresses', () => {
    const url = 'https://0f1c6e64.s3.amazonaws.com/addresses.txt';
    const mockRespose = '1 Jesse Hill Jr Street, Atlanta, TN 30309\n' +
      '23 Peachtree Street, Atlanta, TN 30301\n' +
      '32 Glen Iris Drive NE, Brookhaven, FL 30309';

    service.getAddress().subscribe(response => {
      expect(response).toEqual(mockRespose);
    });

    const req = mockHttp.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockRespose);
  });
});
