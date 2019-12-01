import {AddressModel} from '../../models/address-model';

export interface AddressServiceBuilderInterface {
  buildAddressArray(text: string): AddressModel[];

  formatArray(addresses: string[]): AddressModel[];

  getStreetNumber(address: string[]): number;

  getStreet(address: string[]): string;

  getCity(address: string[]): string;

  getState(address: string[]): string;

  getZipCode(address: string[]): number;

  buildAddressFromModel(address: AddressModel): string;
}
