import {AddressServiceBuilderInterface} from './address.service.builder.interface';
import {AddressModel} from '../../models/address-model';

export class AddressServiceBuilderMock implements AddressServiceBuilderInterface {
  buildAddressArray(text: string): AddressModel[] {
    return [];
  }

  formatArray(addresses: string[]): AddressModel[] { return []; }

  getStreetNumber(address: string[]): number { return null; }

  getStreet(address: string[]): string { return null; }

  getCity(address: string[]): string { return null; }

  getState(address: string[]): string { return null; }

  getZipCode(address: string[]): number { return null; }

  buildAddressFromModel(address: AddressModel): string { return null; }
}
