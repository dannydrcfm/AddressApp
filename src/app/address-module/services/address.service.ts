import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddressServiceInterface} from './address.service.interface';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

const ADDRESS_URL = 'https://0f1c6e64.s3.amazonaws.com/addresses.txt';
const POST_API_URL = 'https://www.exampleapi.com/example/addresses';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements AddressServiceInterface {

  constructor(private httpClient: HttpClient) { }

  getAddress(): Observable<string> {
    return this.httpClient.get(ADDRESS_URL, { responseType: 'text'}).pipe(
      retry(2),
      catchError((err, caught) =>  caught)
    );
  }

  saveAddresses(addresses: string[]) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    const body = JSON.stringify(addresses);
    /*return this.httpClient.post(POST_API_URL, body, httpOptions).pipe(
      retry(2),
      catchError((err, caught) => caught)
    );*/
    console.log(body);
  }
}
