import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AddressService} from '../services/address.service';
import {AddressModel, AddressToggle} from '../models/address-model';
import {AddressServiceBuilder} from '../services/builders/address.service.builder';
import {SortingTypeEnum} from '../models/sorting-type.enum';

const MAX_ITEMS = 10;

@Component({
  selector: 'app-address-component',
  templateUrl: './address-component.component.html',
  styleUrls: ['./address-component.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddressComponent implements OnInit {

  initial: number;
  addresses: AddressModel[];
  sortedAddresses: AddressModel[];
  addressesToShow: AddressModel[];
  toggles: AddressToggle;
  activeSorting: string;

  constructor(private addressService: AddressService, private addressServiceBuilder: AddressServiceBuilder) {
    this.initial = 0;
  }

  ngOnInit() {
    this.addressService.getAddress().subscribe(data => {
      this.addresses = this.addressServiceBuilder.buildAddressArray(data);
      this.sortedAddresses = [...this.addresses];
      this.sort(SortingTypeEnum.STATE);
    });
  }

  next() {
    if (this.initial + MAX_ITEMS <= this.addresses.length) {
      this.initial = this.initial + MAX_ITEMS;
      this.updateAddresses();
    }
  }

  previous() {
    if (this.initial - MAX_ITEMS >= 0) {
      this.initial = this.initial - MAX_ITEMS;
      this.updateAddresses();
    }
  }

  updateAddresses() {
    this.addressesToShow = this.sortedAddresses.slice(this.initial, this.initial + MAX_ITEMS);
  }

  saveAddresses() {
    const addressBody = [];
    for (const address of this.addresses) {
      addressBody.push(this.addressServiceBuilder.buildAddressFromModel(address));
    }
    this.addressService.saveAddresses(addressBody);
  }

  sort(sortingType: string) {
    if (!!this.addresses) {
      this.initial = 0;
      this.sortedAddresses = [...this.addresses];
      this.changeSortingType(sortingType);
      if (sortingType === SortingTypeEnum.STREET_NUMBER || sortingType === SortingTypeEnum.ZIP_CODE) {
        this.sortNumerically(sortingType);
      } else {
        this.sortAlphabetically(sortingType);
      }
      this.updateAddresses();
    }
  }

  changeSortingType(tappedColumn) {
    if (this.activeSorting === tappedColumn) {
      this.toggles[tappedColumn] = !this.toggles[tappedColumn];
    } else {
      this.turnOffToggles();
      this.activeSorting = tappedColumn;
      this.toggles[tappedColumn] = true;
    }
  }

  turnOffToggles() {
    this.toggles = {
      streetNumber: false,
      street: false,
      city: false,
      state: false,
      zipCode: false
    } as AddressToggle;
  }

  sortNumerically(type: string) {
    if (this.toggles[type]) {
      this.sortedAddresses.sort((a, b) => a[type] - b[type]);
    } else {
      this.sortedAddresses.sort((a, b) => b[type] - a[type]);
    }
  }

  sortAlphabetically(type: string) {
    this.sortedAddresses.sort((a, b) => {
      if (this.toggles[type]) {
        return (a[type].toLowerCase() > b[type].toLowerCase()) ? 1 : (a[type].toLowerCase() < b[type].toLowerCase()) ? -1 : 0;
      } else {
        return (a[type].toLowerCase() > b[type].toLowerCase()) ? -1 : (a[type].toLowerCase() < b[type].toLowerCase()) ? 1 : 0;
      }
    });
  }
}
