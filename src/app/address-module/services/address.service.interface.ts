import {Observable} from 'rxjs';

export interface AddressServiceInterface {
  getAddress(): Observable<string>;
  saveAddresses(addresses: string[]);
}
