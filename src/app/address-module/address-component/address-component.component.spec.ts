import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address-component.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AddressServiceBuilderInterface} from '../services/builders/address.service.builder.interface';
import {AddressServiceBuilderMock} from '../services/builders/address.service.builder.mock';
import {AddressService} from '../services/address.service';
import {AddressServiceMock} from '../services/address.service.mock';
import {AddressServiceInterface} from '../services/address.service.interface';
import {AddressModel, AddressToggle} from '../models/address-model';
import {AddressServiceBuilder} from '../services/builders/address.service.builder';
import {of} from 'rxjs';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let mockServiceBuilder: AddressServiceBuilderInterface;
  let mockService: AddressServiceInterface;

  const mockResponse = '1 Jesse Hill Jr Street, Atlanta, TN 30309\n' +
    '23 Peachtree Street, Atlanta, TN 30301\n' +
    '32 Glen Iris Drive NE, Brookhaven, FL 30309';

  const mockBuiltResponse = [
    {
      localIndex: 1,
      streetNumber: 23,
      street: 'Peachtree Street',
      city: 'Atlanta',
      state: 'TN',
      zipCode: 30301
    } as AddressModel,
    {
      localIndex: 0,
      streetNumber: 1,
      street: 'Jesse Hill Jr Street',
      city: 'Atlanta',
      state: 'CA',
      zipCode: 30309
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ AddressComponent ],
      providers: [
        {
          provide: AddressService,
          useClass: AddressServiceMock
        },
        {
          provide: AddressServiceBuilder,
          useClass: AddressServiceBuilderMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    mockService = TestBed.get(AddressService);
    mockServiceBuilder = TestBed.get(AddressServiceBuilder);
    spyOn(mockService, 'getAddress').and.returnValue(of(mockResponse));
    spyOn(mockServiceBuilder, 'buildAddressArray').and.returnValue(mockBuiltResponse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize values', () => {
    expect(component).toBeTruthy();
    expect(component.addresses).toEqual(mockBuiltResponse);
    expect(component.activeSorting).toEqual('state');
  });

  it ('should not change addressToShow if list doesnt have more or less elements', () => {

    // sorted by state as default

    const expectedResult = [
      {
        localIndex: 0,
        streetNumber: 1,
        street: 'Jesse Hill Jr Street',
        city: 'Atlanta',
        state: 'CA',
        zipCode: 30309
      } as AddressModel,
      {
        localIndex: 2,
        streetNumber: 32,
        street: 'Glen Iris Drive NE',
        city: 'Brookhaven',
        state: 'FL',
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
    ];

    const update = spyOn(component, 'updateAddresses');
    component.next();
    expect(update).not.toHaveBeenCalled();
    expect(component.addressesToShow).toEqual(expectedResult);

    component.previous();
    expect(update).not.toHaveBeenCalled();
    expect(component.addressesToShow).toEqual(expectedResult);
  });

  it ('should change sorting type', () => {
    // change sorting to street number
    const expectedSorting = [
      {
        localIndex: 0,
        streetNumber: 1,
        street: 'Jesse Hill Jr Street',
        city: 'Atlanta',
        state: 'CA',
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
    let expectedToggles = {
      streetNumber: true,
      street: false,
      city: false,
      state: false,
      zipCode: false
    } as AddressToggle;
    component.sort('streetNumber');
    expect(component.activeSorting).toEqual('streetNumber');
    expect(component.toggles).toEqual(expectedToggles);
    expect(component.sortedAddresses).toEqual(expectedSorting);

    // change sorting to city
    expectedToggles = {
      streetNumber: false,
      street: false,
      city: true,
      state: false,
      zipCode: false
    } as AddressToggle;
    component.sort('city');
    expect(component.activeSorting).toEqual('city');
    expect(component.toggles).toEqual(expectedToggles);
  });

  it ('should invert street sorting on toggle', () => {
    component.toggles = {
      streetNumber: false,
      street: true,
      city: false,
      state: false,
      zipCode: false
    } as AddressToggle;

    component.activeSorting = 'street';

    const expectedResult = [
      {
        localIndex: 2,
        streetNumber: 32,
        street: 'Glen Iris Drive NE',
        city: 'Brookhaven',
        state: 'FL',
        zipCode: 30309
      } as AddressModel,
      {
        localIndex: 0,
        streetNumber: 1,
        street: 'Jesse Hill Jr Street',
        city: 'Atlanta',
        state: 'CA',
        zipCode: 30309
      } as AddressModel,
      {
        localIndex: 1,
        streetNumber: 23,
        street: 'Peachtree Street',
        city: 'Atlanta',
        state: 'TN',
        zipCode: 30301
      } as AddressModel
    ];
    component.sortAlphabetically('street');
    expect(component.sortedAddresses).toEqual(expectedResult);
  });

  it ('should invert street number sorting on toggle', () => {
    component.toggles = {
      streetNumber: false,
      street: false,
      city: false,
      state: false,
      zipCode: false
    } as AddressToggle;

    component.activeSorting = 'streetNumber';

    const expectedResult = [
      {
        localIndex: 2,
        streetNumber: 32,
        street: 'Glen Iris Drive NE',
        city: 'Brookhaven',
        state: 'FL',
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
        localIndex: 0,
        streetNumber: 1,
        street: 'Jesse Hill Jr Street',
        city: 'Atlanta',
        state: 'CA',
        zipCode: 30309
      } as AddressModel
    ];
    component.sortNumerically('streetNumber');
    expect(component.sortedAddresses).toEqual(expectedResult);
  });

  it ('should not call sortAlphabetically if zipCode or streetNumber is selected', () => {
    const sortAlphabetically = spyOn(component, 'sortAlphabetically');
    const sortNumerically = spyOn(component, 'sortNumerically');
    component.sort('zipCode');
    expect(sortAlphabetically).not.toHaveBeenCalled();
    expect(sortNumerically).toHaveBeenCalled();
  });


});
