import { Address } from './address';

export class Customer {
  private id: string;

  private name: string;

  private address: Address;

  private active = false;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.validate();
  }

  // Isso é errado, pois assim o customer será criado de maneira inconsistente
  // constructor(id: string) {
  //   this.id = id;
  // }

  defineAddress(address: Address) {
    if (!address) {
      throw new Error('Customer address is required');
    }
    this.address = address;
  }

  validate() {
    if (!this.name) {
      throw new Error('Customer name is required');
    }
    if (!this.id) {
      throw new Error('Customer id is required');
    }
  }

  changeName(name: string) {
    this.name = name;
    this.validate();
  }

  activate() {
    if (!this.address) {
      throw new Error('Customer address is required to active customer');
    }
    this.active = true;
  }

  inactivate() {
    this.active = false;
  }
}
