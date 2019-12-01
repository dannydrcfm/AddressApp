import {Injectable} from '@angular/core';
import {AddressModel} from '../../models/address-model';
import {AddressServiceBuilderInterface} from './address.service.builder.interface';


@Injectable({
  providedIn: 'root'
})
export class AddressServiceBuilder implements AddressServiceBuilderInterface {
  constructor() {
  }

  buildAddressArray(text: string): AddressModel[] {
    return this.formatArray(text.split('\n'));
  }

  formatArray(addresses: string[]): AddressModel[] {
    let formatedAddresses: AddressModel[] = [];
    for (let i = 0; i < addresses.length; i++) {
      const splittedAddress = addresses[i].split(',');
      formatedAddresses.push(
        <AddressModel> {
          localIndex: i,
          streetNumber: this.getStreetNumber(splittedAddress),
          street: this.getStreet(splittedAddress),
          city: this.getCity(splittedAddress),
          state: this.getState(splittedAddress),
          zipCode: this.getZipCode(splittedAddress)
        }
      );
    }
    return formatedAddresses;
  }

  getStreetNumber(address: string[]): number {
    const steetAndNumber = address[0];
    return Number(steetAndNumber.split(' ')[0]);
  }

  getStreet(address: string[]): string {
    const streetAndNumber = address[0];
    return streetAndNumber.split(/(\d+)/g)[2].substr(1);
  }

  getCity(address: string[]): string {
    return address[1].substr(1);
  }

  getState(address: string[]): string {
    const stateAndZipCode = address[2];
    return stateAndZipCode.split(' ')[1];
  }

  getZipCode(address: string[]): number {
    const stateAndZipCode = address[2];
    return Number(stateAndZipCode.split(' ')[2]);
  }

  buildAddressFromModel(address: AddressModel): string {
    return address.streetNumber + ' ' + address.street + ', ' + address.city + ', ' + address.state + ' ' + address.zipCode;
  }
}
