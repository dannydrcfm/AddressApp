export interface AddressModel {
  localIndex: number;
  streetNumber: number;
  street: string;
  city: string;
  zipCode: number;
  state: string;
}

export interface AddressToggle {
  streetNumber: boolean;
  street: boolean;
  city: boolean;
  zipCode: boolean;
  state: boolean;
}
