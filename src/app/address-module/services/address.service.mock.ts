import {AddressServiceInterface} from './address.service.interface';
import {Observable, of} from 'rxjs';

export class AddressServiceMock implements AddressServiceInterface {

  getAddress(): Observable<string> {
    return null;
  }

  saveAddresses() {}
}
