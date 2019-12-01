import {async, TestBed} from '@angular/core/testing';
import {AddressServiceBuilder} from './address.service.builder';
import {Test} from 'tslint';
import {AddressModel} from '../../models/address-model';

describe('AddressServiceBuilder', () => {

  let service: AddressServiceBuilder;

  const testingAddress = [
    '1 Jesse Hill Jr Street',
    ' Atlanta',
    ' TN 30309'
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({});
  }));

  beforeEach(() => {
    service = TestBed.get(AddressServiceBuilder);
  });

  it ('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it ('should get the street number correctly', () => {
    expect(service.getStreetNumber(testingAddress)).toEqual(1);
  });

  it ('should get street name correctly', () => {
    expect(service.getStreet(testingAddress)).toEqual('Jesse Hill Jr Street');
  });

  it ('should get city name correctly', () => {
    expect(service.getCity(testingAddress)).toEqual('Atlanta');
  });

  it ('should get state correctly', () => {
    expect(service.getState(testingAddress)).toEqual('TN');
  });

  it ('should get zip code correctly', () => {
    expect(service.getZipCode(testingAddress)).toEqual(30309);
  });

  it ('should return built array with AddressModel', () => {
    const addressesResponse = '1 Jesse Hill Jr Street, Atlanta, TN 30309\n' +
      '23 Peachtree Street, Atlanta, TN 30301\n' +
      '32 Glen Iris Drive NE, Brookhaven, FL 30309';

    const expectedResponse = [
      {
        localIndex: 0,
        streetNumber: 1,
        street: 'Jesse Hill Jr Street',
        city: 'Atlanta',
        state: 'TN',
        zipCode: 30309
      } as AddressModel,
      {
        localIndex: 1,
        streetNumber: 23,
        street: 'Peachtree Street',
        city: 'Atlanta',
        state: 'TN',
        zipCode: 30301
      } as AddressModel,
      {
        localIndex: 2,
        streetNumber: 32,
        street: 'Glen Iris Drive NE',
        city: 'Brookhaven',
        state: 'FL',
        zipCode: 30309
      } as AddressModel
    ];
    expect(service.buildAddressArray(addressesResponse)).toEqual(expectedResponse);
  });

  it ('build string based on the array', () => {
    const address = {
        streetNumber: 1,
        street: 'Jesse Hill Jr Street',
        city: 'Atlanta',
        state: 'TN',
        zipCode: 30309
      } as AddressModel;
    const expectedResult = '1 Jesse Hill Jr Street, Atlanta, TN 30309';
    expect(service.buildAddressFromModel(address)).toEqual(expectedResult);
  });
});
